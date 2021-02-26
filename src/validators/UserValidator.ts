import { getCustomRepository } from "typeorm";
import * as yup from "yup";

import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/UserRepository";
import { Validator } from "./Validator";

interface ICreateUserFields {
    email: string;
    name: string;
}

class UserValidator extends Validator {
    async checkCreate(fields: ICreateUserFields) {
        let shape = {
            email: yup.string().email().required(),
            name: yup.string().required()
        };

        await this.validateFields(shape, fields);

        let userRepository = getCustomRepository(UserRepository);

        let userModel = await userRepository.findOne({
            email: fields.email
        });

        if (userModel) {
            throw new AppError("User already exists");
        }
    }
}

export { UserValidator };
