import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyValidator } from "../validators/SurveyValidator";

class SurveyController {
    async create(request: Request, response: Response) {
        await (new SurveyValidator()).checkCreate(request.body);

        let surveyRepository = getCustomRepository(SurveyRepository);

        let surveyModel = surveyRepository.create(request.body);

        await surveyRepository.save(surveyModel);

        return response.status(201).json(surveyModel);
    }

    async show(request: Request, response: Response) {
        let surveyRepository = getCustomRepository(SurveyRepository);

        return response.json(await surveyRepository.find());
    }
}

export { SurveyController };
