/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
const AccessLevelSchema = require("../models/accessLevel");
const connectDB = require("../db/connect");
const {
  api,
  base_url,
  closeConexion,
  conexionString,
  expressServer,
} = require("./test-config");
const { initialAccessLevels } = require("./helpers");

beforeAll(async () => {
  await expressServer.launch();
  await connectDB(conexionString);
  await AccessLevelSchema.deleteMany({});

  // eslint-disable-next-line no-restricted-syntax
  for (const language of initialAccessLevels) {
    const newLanguage = new AccessLevelSchema({ name: language.name });
    // eslint-disable-next-line no-await-in-loop
    await newLanguage.save();
  }
});

describe("API endpoint AccessLevel", () => {
  test("get all languajes", async () => {
    await api
      .post(`${base_url}/accessLevel`)
      .send({ filter: {}, })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("AccessLevel should be contain Admin", async () => {
    const { body: allAcceeLevel } = await api
      .post(`${base_url}/accessLevel`)
      .send({ filter: {} });

    const { payload } = allAcceeLevel;

    const newArr = payload.content.map((status) => status.name);
    expect(newArr).toContain("Admin");
  });

  test("create AccessLevel", async () => {
    await api
      .post(`${base_url}/accessLevel/create`)
      .send({ accessLevel: "Instructor" })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("languajes should be contain new AccessLevel created before", async () => {
    const { body: allAccessLevel } = await api
      .post(`${base_url}/accessLevel`)
      .send({})
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { payload } = allAccessLevel;

    const newArr = payload.content.map((status) => status.name);
    expect(newArr).toContain("Instructor");
  });

  test("languajes should be delete with status 204", async () => {
    const { body: newAccessLevel } = await api
      .post(`${base_url}/accessLevel/create`)
      .send({ accessLevel: "Recurtier" })
      .expect(201);

    const { payload } = newAccessLevel;
    const id = payload.content._id.toString();

    await api
      .delete(`${base_url}/accessLevel/${id}`)
      .expect(204)
  });
});

afterAll(async () => {
  await closeConexion;
  await expressServer.close({ server: expressServer.httpServer });
});
