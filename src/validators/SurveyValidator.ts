import * as yup from "yup";

import { Validator } from "./Validator";

interface ICreateSurveyFields {
    description: string;
    title: string;
}

class SurveyValidator extends Validator {
    async checkCreate(fields: ICreateSurveyFields) {
        let shape = {
            description: yup.string().required(),
            title: yup.string().required()
        };

        await this.validateFields(shape, fields);
    }
}

export { SurveyValidator };
