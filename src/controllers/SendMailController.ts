import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";

import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyXUserRepository } from "../repositories/SurveyXUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";
import { SendMailValidator } from "../validators/SendMailValidator";

class SendMailController {
    async execute(request: Request, response: Response) {
        let {
            email,
            idSurvey
        } = request.body;

        let surveyRepository = getCustomRepository(SurveyRepository);
        let userRepository = getCustomRepository(UserRepository);

        let surveyModel = await surveyRepository.findOne({
            id: idSurvey
        });

        let userModel = await userRepository.findOne({
            email
        });

        (new SendMailValidator()).check(surveyModel, userModel);

        let surveyXUserRepository = getCustomRepository(SurveyXUserRepository);

        let surveyXUserModel = await surveyXUserRepository.findOne({
            where: {
                idSurvey,
                idUser: userModel.id
            },
            relations: [
                "surveyModel",
                "userModel"
            ]
        });

        if (!surveyXUserModel) {
            surveyXUserModel = surveyXUserRepository.create({
                idSurvey: idSurvey,
                idUser: userModel.id
            });

            await surveyXUserRepository.save(surveyXUserModel);
        }

        const NPS_PATH = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        let variables = {
            description: surveyModel.description,
            id: surveyXUserModel.id,
            link: process.env.URL_MAIL,
            name: userModel.name,
            title: surveyModel.title
        };

        await SendMailService.execute(email, surveyModel.title, variables, NPS_PATH);

        return response.status(201).json(surveyXUserModel);
    }
}

export { SendMailController };
