import * as yup from "yup";

import { AppError } from "../errors/AppError";

class Validator {
    private optionsYup = {
        abortEarly: false
    };

    protected async validateFields(shape = {}, fields: object) {
        try {
            await yup
                .object()
                .shape(shape)
                .validate(fields, this.optionsYup);
        } catch (error) {
            throw new AppError(error.errors);
        }
    }
}

export { Validator };
