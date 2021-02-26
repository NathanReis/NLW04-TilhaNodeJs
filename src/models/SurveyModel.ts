import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tbSurveys")
class SurveyModel {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    description: string;

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { SurveyModel };
