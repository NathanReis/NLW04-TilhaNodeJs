import { Router } from "express";

import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";

let router = Router();

let answerController = new AnswerController();
let npsController = new NpsController();
let sendMailController = new SendMailController();
let surveyController = new SurveyController();
let userController = new UserController();

router.get("/answers/:value", answerController.execute);

router.get("/nps/:idSurvey", npsController.execute);

router.post("/send-mail", sendMailController.execute);

router.get("/surveys", surveyController.show);
router.post("/surveys", surveyController.create);

router.post("/users", userController.create);

export { router };
