import { EntityRepository, Repository } from "typeorm";

import { SurveyXUserModel } from "../models/SurveyXUserModel";

@EntityRepository(SurveyXUserModel)
class SurveyXUserRepository extends Repository<SurveyXUserModel> { }

export { SurveyXUserRepository };
