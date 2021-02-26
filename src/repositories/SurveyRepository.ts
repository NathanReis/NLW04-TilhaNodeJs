import { EntityRepository, Repository } from "typeorm";

import { SurveyModel } from "../models/SurveyModel";

@EntityRepository(SurveyModel)
class SurveyRepository extends Repository<SurveyModel> { }

export { SurveyRepository };
