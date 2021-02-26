import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { SurveyModel } from "./SurveyModel";
import { UserModel } from "./UserModel";

@Entity("tbSurveysXUsers")
class SurveyXUserModel {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    idSurvey: string;

    @ManyToOne(() => SurveyModel)
    @JoinColumn({ name: "idSurvey" })
    surveyModel: SurveyModel;

    @Column()
    idUser: string;

    @ManyToOne(() => UserModel)
    @JoinColumn({ name: "idUser" })
    userModel: UserModel;

    @Column()
    value: number;

    @CreateDateColumn()
    createdAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { SurveyXUserModel };
