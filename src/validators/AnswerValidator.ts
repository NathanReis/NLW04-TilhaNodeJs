import * as yup from "yup";

import { AppError } from "../errors/AppError";
import { SurveyXUserModel } from "../models/SurveyXUserModel";
import { Validator } from "./Validator";

interface IAnswerFields {
    value: string;
}

class AnswerValidator extends Validator {
    async check(fields: IAnswerFields, surveyXUserModel: SurveyXUserModel) {
        let shape = {
            value: yup.number().min(1).max(10).required()
        };

        await this.validateFields(shape, fields);

        if (!surveyXUserModel) {
            throw new AppError("Survey X User does not exists");
        }
    }
}

export { AnswerValidator };
