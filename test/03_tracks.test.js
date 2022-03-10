const request = require("supertest");
const app = require("../app");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel, storageModel, tracksModel } = require("../models");
const {
  testAuthRegisterAdmin,
  testDataTrack,
  testStorageRegister
} = require("./helper/helperData");
let STORAGE_ID = "";
let JWT_TOKEN = "";

beforeAll(async () => {
  await usersModel.deleteMany({});
  await storageModel.deleteMany({});
  const user = await usersModel.create(testAuthRegisterAdmin);
  const storage = await storageModel.create(testStorageRegister);
  STORAGE_ID = storage._id.toString();
  JWT_TOKEN = await tokenSign(user);
});

test("deberia registra un item", async () => {
  const dataTracksNew = { 
    ...testDataTrack, 
    mediaId: STORAGE_ID };

  const res = await request(app)
    .post("/api/tracks")
    .set("Authorization", `Bearer ${JWT_TOKEN}`)
    .send(dataTracksNew);
  const { body } = res;
  expect(res.statusCode).toEqual(201);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.name");
  expect(body).toHaveProperty("data.artist");
  expect(body).toHaveProperty("data.cover");
});

test("should create a return all", async () => {
  const res = await request(app)
    .get("/api/tracks")
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  const { data } = body;
  //   idFile = data.docs[0]._id;
  expect(body).toHaveProperty("data");
});

test("debe retornar todo el detalle del item", async () => {
  const { _id } = await tracksModel.findOne({});
  id = _id.toString();
  const res = await request(app)
    .get(`/api/tracks/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
});

test("debe eliminar el item", async () => {
  const { _id } = await tracksModel.findOne({});
  id = _id.toString();
  const res = await request(app)
    .delete(`/api/tracks/${id}`)
    .set("Authorization", `Bearer ${JWT_TOKEN}`);
  const { body } = res;
  expect(res.statusCode).toEqual(200);
  expect(body).toHaveProperty("data");
  expect(body).toHaveProperty("data.deleted", 1);
});
