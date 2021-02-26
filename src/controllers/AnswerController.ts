import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { SurveyXUserRepository } from "../repositories/SurveyXUserRepository";
import { AnswerValidator } from "../validators/AnswerValidator";

class AnswerController {
    async execute(request: Request, response: Response) {
        let {
            value
        } = request.params;
        let {
            u
        } = request.query;

        let surveyXUserRepository = getCustomRepository(SurveyXUserRepository);

        let surveyXUserModel = await surveyXUserRepository.findOne({
            id: String(u)
        });

        await (new AnswerValidator()).check({ value }, surveyXUserModel);

        surveyXUserModel.value = Number(value);

        await surveyXUserRepository.save(surveyXUserModel);

        return response.json(surveyXUserModel);
    }
}

export { AnswerController };
