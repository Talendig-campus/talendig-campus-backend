/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
const LanguageSchema = require("../models/lenguaje");
const connectDB = require("../db/connect");
const {
  api,
  base_url,
  closeConexion,
  conexionString,
  expressServer,
} = require("./test-config");
const { initialLanguages } = require("./helpers");

beforeAll(async () => {
  await expressServer.launch();
  await connectDB(conexionString);
  await LanguageSchema.deleteMany({});

  // eslint-disable-next-line no-restricted-syntax
  for (const language of initialLanguages) {
    const newLanguage = new LanguageSchema({ name: language.name });
    // eslint-disable-next-line no-await-in-loop
    await newLanguage.save();
  }
});

describe("API endpoint language", () => {
  test("get all languajes", async () => {
    await api
      .post(`${base_url}/language`)
      .send({ filter: {}, pagination: { quantity: 20, page: 1 } })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("language should be contain Spanish", async () => {
    const { body: allStatus } = await api
      .post(`${base_url}/language`)
      .send({ filter: {} });

    const { payload } = allStatus;

    const newArr = payload.content.map((status) => status.name);
    expect(newArr).toContain("Spanish");
  });

  test("create status", async () => {
    await api
      .post(`${base_url}/language/create`)
      .send({ language: "Arabe" })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("languajes should be contain new Languaje created before", async () => {
    const { body: allLanguajes } = await api
      .post(`${base_url}/language`)
      .send({})
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { payload } = allLanguajes;

    const newArr = payload.content.map((status) => status.name);
    expect(newArr).toContain("Arabe");
  });

  test("languajes should be update with status 200", async () => {
    const { body: newLanguage } = await api
      .post(`${base_url}/language/create`)
      .send({ language: "Spanish" })
      .expect(201);

    const { payload } = newLanguage;
    const id = payload.content._id.toString();

    await api
      .put(`${base_url}/language/${id}`)
      .send({ language: "English" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });


  test("languajes should be delete with status 204", async () => {
    const { body: newLanguage } = await api
      .post(`${base_url}/language/create`)
      .send({ language: "Spanish" })
      .expect(201);

    const { payload } = newLanguage;
    const id = payload.content._id.toString();

    await api
      .delete(`${base_url}/language/${id}`)
      .expect(204)
  });
});

afterAll(async () => {
  await closeConexion;
  await expressServer.close({ server: expressServer.httpServer });
});
