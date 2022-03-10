const request = require("supertest");
const app = require("../app");
const { usersModel } = require("../models");
const { testAuthLogin, testAuthRegister } = require("./helper/helperData");

beforeAll(async () => {
  await usersModel.deleteMany({});
});

test("esto deberia de retornar 404", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send(testAuthLogin);

  expect(response.statusCode).toEqual(404);
});

test("esto deberia de retornar 201", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send(testAuthRegister);

  expect(response.statusCode).toEqual(201);
  expect(response.body).toHaveProperty("data");
  expect(response.body).toHaveProperty("data.token");
  expect(response.body).toHaveProperty("data.user");
});


test("esto deberia de retornar password no valido 401", async () => {
  const newTestAuthLogin = {...testAuthLogin, password:"22222222"}
  const response = await request(app)
    .post("/api/auth/login")
    .send(newTestAuthLogin);

  expect(response.statusCode).toEqual(401);
});

test("esto deberia de retornar 200 login exitoso", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send(testAuthRegister);

  expect(response.statusCode).toEqual(200);
});