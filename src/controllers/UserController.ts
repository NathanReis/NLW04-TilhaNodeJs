import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import { UserRepository } from "../repositories/UserRepository";
import { UserValidator } from "../validators/UserValidator";

class UserController {
    async create(request: Request, response: Response) {
        await (new UserValidator()).checkCreate(request.body);

        let userRepository = getCustomRepository(UserRepository);

        let userModel = userRepository.create(request.body);

        await userRepository.save(userModel);

        return response.status(201).json(userModel);
    }
}

export { UserController };
