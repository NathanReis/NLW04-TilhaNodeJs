import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";

import { SurveyXUserModel } from "../models/SurveyXUserModel";
import { SurveyXUserRepository } from "../repositories/SurveyXUserRepository";

class NpsController {
    async execute(request: Request, response: Response) {
        let {
            idSurvey
        } = request.params;

        let surveyXUserRepository = getCustomRepository(SurveyXUserRepository);

        let surveyXUserModels = await surveyXUserRepository.find({
            idSurvey,
            value: Not(IsNull())
        });

        let totalDetractors = 0;
        let totalPromoters = 0;

        surveyXUserModels.forEach(({ value }: SurveyXUserModel) => {
            if (value >= 0 && value <= 6) {
                totalDetractors++;
            } else if (value >= 9 && value <= 10) {
                totalPromoters++;
            }
        });

        let totalAnswers = surveyXUserModels.length;

        let nps = ((totalPromoters - totalDetractors) / totalAnswers) * 100;

        return response.json({
            detractors: totalDetractors,
            passives: totalAnswers - totalDetractors - totalPromoters,
            promoters: totalPromoters,
            totalAnswers: totalAnswers,
            nps: Number(nps.toFixed(2))
        });
    }
}

export { NpsController };
