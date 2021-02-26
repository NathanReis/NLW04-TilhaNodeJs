import request from "supertest";
import { getConnection } from "typeorm";

import { app } from "../app";
import createConnection from "../database";

describe("Survey", () => {
    beforeAll(async () => {
        let connection = await createConnection();

        await connection.runMigrations();
    });

    afterAll(async () => {
        let connection = getConnection();

        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new survey", async () => {
        let response = await request(app)
            .post("/surveys")
            .send({
                description: "Description test",
                title: "Title test"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => {
        await request(app)
            .post("/surveys")
            .send({
                description: "Description test",
                title: "Title test"
            });

        let response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    });
});
