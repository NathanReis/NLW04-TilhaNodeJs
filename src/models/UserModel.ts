import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tbUsers")
class UserModel {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { UserModel };
