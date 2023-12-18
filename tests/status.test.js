/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
const StatusSchema = require("../models/status");
const connectDB = require("../db/connect");
const {
  api,
  conexionString,
  expressServer,
  base_url,
  closeConexion,
} = require("./test-config");
const { initialStatus } = require("./helpers");

beforeAll(async () => {
  await expressServer.launch();
  await connectDB(conexionString);
  await StatusSchema.deleteMany({});

  // eslint-disable-next-line no-restricted-syntax
  for (const status of initialStatus) {
    const newStatus = new StatusSchema({ name: status.name });
    // eslint-disable-next-line no-await-in-loop
    await newStatus.save();
  }
});

describe("API endpoint status", () => {
  test("get all status", async () => {
    await api
      .post(`${base_url}/status`)
      .send({ filter: {}, pagination: { quantity: 20, page: 1 } })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("status should be contain hello", async () => {
    const { body: allStatus } = await api
      .post(`${base_url}/status`)
      .send({ filter: {}, pagination: { quantity: 20, page: 1 } });

    const { payload } = allStatus;

    const newArr = payload.content.map((status) => status.name);
    expect(newArr).toContain("hello");
  });

  test("status should be send 200", async () => {
    await api
      .post(`${base_url}/status`)
      .send({ filter: {} })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("create status ok", async () => {
    await api
      .post(`${base_url}/status/create`)
      .send({ status: "new" })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { body: allStatus } = await api
      .post(`${base_url}/status`)
      .send({ filter: {}, pagination: { quantity: 20, page: 1 } });

    const { payload } = allStatus;

    const newArr = payload.content.map((status) => status.name);

    expect(payload.content).toHaveLength(initialStatus.length + 1);
    expect(newArr).toContain("new");
  });

  test("create status without name should be respond with 400", async () => {
    await api
      .post(`${base_url}/status/create`)
      .expect(400)
      .send({})
      .expect("Content-Type", /application\/json/);

    const { body: allStatus } = await api
      .post(`${base_url}/status`)
      .send({ filter: {}, pagination: { quantity: 20, page: 1 } });

    const { payload } = allStatus;

    const newArr = payload.content.map((status) => status.name);

    expect(payload.content).toHaveLength(initialStatus.length + 1);
    expect(newArr).toContain("new");
  });

  test("delete Status should be responde with 204", async () => {
    const { body: newStatus } = await api
      .post(`${base_url}/status/create`)
      .send({ status: "New2" })
      .expect(201);

    const { payload } = newStatus;
    const id = payload.content._id.toString();
    await api.delete(`${base_url}/status/${id}`).expect(204);
  });

  test("update status", async () => {
    const { body: newStatus } = await api
      .post(`${base_url}/status/create`)
      .expect(201)
      .send({ status: "New2" });

    const { payload } = newStatus;
    const id = payload.content._id.toString();
    await api
      .put(`${base_url}/status/${id}`)
      .send({ status: "new3" })
      .expect(200);
  });
});

afterAll(async () => {
  await closeConexion;
  await expressServer.close({ server: expressServer.httpServer });
});
