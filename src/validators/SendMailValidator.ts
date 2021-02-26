import { AppError } from "../errors/AppError";
import { SurveyModel } from "../models/SurveyModel";
import { UserModel } from "../models/UserModel";

class SendMailValidator {
    check(surveyModel: SurveyModel, userModel: UserModel) {
        if (!surveyModel) {
            throw new AppError("Survey does not exists");
        }

        if (!userModel) {
            throw new AppError("User does not exists");
        }
    }
}

export { SendMailValidator };
