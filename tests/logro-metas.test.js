/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
const LogroMetasSchema = require('../models/logroMetas');
const connectDB = require('../db/connect');
const {
  api,
  base_url,
  closeConexion,
  conexionString,
  expressServer,
} = require('./test-config');

const { logroMetasBody } = require('./helpers');

beforeAll(async () => {
  await expressServer.launch();
  await connectDB(conexionString);
  await LogroMetasSchema.deleteMany({});
});

describe('API endpoint Logro-metas', () => {
  test('crear nuevo logro-metas', async () => {
    await api
      .post(`${base_url}/evaluacion/logro-metas`)
      .send(logroMetasBody)
      .expect('Content-Type', /application\/json/)
      .expect(201);
  });
  test('el nuevo logroMetas debe retornarse en formato json', async () => {
    const { body: regimen } = await api
      .post(`${base_url}/evaluacion/logro-metas`)
      .send({ ...logroMetasBody });

    const { payload } = regimen;
    // const newArr = content.map((rgm) => rgm.lealtad);
    // console.log(regimen);
    expect(payload.content.ponderacion).toContain(30);
    expect(payload.content.ponderacionTotal).toBe(27);
  });

  test('deberia dar error al no encontrar el usuario o instuctor', async () => {
    const { body } = await api
      .post(`${base_url}/evaluacion/logro-metas`)
      .send({ ...logroMetasBody, userId: '' })
      .expect(400);

    console.log(body);
  });

  test('deberia dar error al no poner la informacion requerida', async () => {
    await api.post(`${base_url}/evaluacion/logro-metas`).send({}).expect(400);
  });

  test('deberia dar error al poner informacion erronea', async () => {
    await api
      .post(`${base_url}/evaluacion/logro-metas`)
      .send({ ...logroMetasBody, ponderacion: ['hola'] })
      .expect(400);
  });
  test('deberia dar error al calcular la ponderacion o calificacion de forma erronea', async () => {
    await api
      .post(`${base_url}/evaluacion/logro-metas`)
      .send({ ...logroMetasBody, ponderacion: [30, 36] })
      .expect(400);
  });
});

afterAll(async () => {
  await closeConexion;
  await expressServer.close({ server: expressServer.httpServer });
});
