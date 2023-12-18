/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
const TechnologySchema = require("../models/technology");
const connectDB = require("../db/connect");
const {
  api,
  base_url,
  closeConexion,
  conexionString,
  expressServer,
} = require("./test-config");
const { initialTechnologies } = require("./helpers");

beforeAll(async () => {
  await expressServer.launch();
  await connectDB(conexionString);
  await TechnologySchema.deleteMany({});

  // eslint-disable-next-line no-restricted-syntax
  for (const language of initialTechnologies) {
    const newLanguage = new TechnologySchema({ name: language.name });
    // eslint-disable-next-line no-await-in-loop
    await newLanguage.save();
  }
});

describe("API endpoint AccessLevel", () => {
  test("get all Tecnologies", async () => {
    await api
      .post(`${base_url}/technology`)
      .send({ filter: {}, })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Technology should be contain PHP", async () => {
    const { body: allTecnologies } = await api
      .post(`${base_url}/technology`)
      .send({ filter: {} });

    const { payload } = allTecnologies;

    const newArr = payload.content.map((status) => status.name);
    expect(newArr).toContain("PHP");
  });

  test("create Technology", async () => {
    await api
      .post(`${base_url}/technology/create`)
      .send({ technology: "JavaScript" })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("Tecnologies should be contain new Technology created before", async () => {
    const { body: allTecnologies } = await api
      .post(`${base_url}/technology`)
      .send({ filter : {}})
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { payload } = allTecnologies;

    const newArr = payload.content.map((status) => status.name);
    expect(newArr).toContain("JavaScript");
  });

  test("Tecnologies should be update with status 200", async () => {
    const { body: newTechnology } = await api
      .post(`${base_url}/technology/create`)
      .send({ technology: "C++" })
      .expect(201);

    const { payload } = newTechnology;
    const id = payload.content._id.toString();

    await api
      .put(`${base_url}/technology/${id}`)
      .send({ technology: "C#" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });


  test("Tecnologies should be delete with status 204", async () => {
    const { body: newTecnology } = await api
    .post(`${base_url}/technology/create`)
    .send({ technology: "GO" })
    .expect(201)
    .expect("Content-Type", /application\/json/);

    const { payload } = newTecnology;
    const id = payload.content._id.toString();

    await api
      .delete(`${base_url}/technology/${id}`)
      .expect(204)
  });
});

afterAll(async () => {
  await closeConexion;
  await expressServer.close({ server: expressServer.httpServer });
});
