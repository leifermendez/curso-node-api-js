const request = require("supertest");
const app = require("../app");
const { tokenSign } = require("../utils/handleJwt");
const { testAuthRegister } = require("./helper/helperData")
const { usersModel } = require("../models");
const { storageModel } = require("../models");
let JWT_TOKEN = "";
const filePath = `${__dirname}/dump/track.mp3`;

beforeAll(async () => {
  await usersModel.deleteMany({});
  await storageModel.deleteMany({});
  const user = usersModel.create(testAuthRegister);
  JWT_TOKEN = await tokenSign(user);
});

test("should uplaod file", async () => {
  const res = await request(app)
    .post("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .attach("myfile", filePath);
  const { body } = res;
  expect(res.statusCode).toEqual(201);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.url");
});

test("should create a return all", async () => {
  const res = await request(app)
    .get("/api/storage")
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  const { data } = body;
  expect(body).toHaveProperty("data");
});

test("debe retornar todo el detalle del item", async () => {
  const { _id } = await storageModel.findOne();
  id = _id.toString();

  const res = await request(app)
    .get(`/api/storage/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
});

test("debe eliminar el item", async () => {
  const { _id } = await storageModel.findOne();
  id = _id.toString();

  const res = await request(app)
    .delete(`/api/storage/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.deleted", 1);
});