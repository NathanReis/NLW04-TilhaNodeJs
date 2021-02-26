import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysXUsers1614260833605 implements MigrationInterface {
    private tableName = "tbSurveysXUsers";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "idSurvey",
                        type: "uuid"
                    },
                    {
                        name: "idUser",
                        type: "uuid"
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_tbUsers",
                        referencedTableName: "tbUsers",
                        referencedColumnNames: [
                            "id"
                        ],
                        columnNames: [
                            "idUser"
                        ],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "fk_tbSurveys",
                        referencedTableName: "tbSurveys",
                        referencedColumnNames: [
                            "id"
                        ],
                        columnNames: [
                            "idSurvey"
                        ],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }
}
