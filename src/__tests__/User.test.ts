import request from "supertest";
import { getConnection } from "typeorm";

import { app } from "../app";
import createConnection from "../database";

describe("User", () => {
    beforeAll(async () => {
        let connection = await createConnection();

        await connection.runMigrations();
    });

    afterAll(async () => {
        let connection = getConnection();

        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new user", async () => {
        let response = await request(app)
            .post("/users")
            .send({
                email: "test1@email.com",
                name: "Test 1"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should not be able to create a user with existing email", async () => {
        let response = await request(app)
            .post("/users")
            .send({
                email: "test1@email.com",
                name: "Test 1"
            });

        expect(response.status).toBe(400);
    });
});
