/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
const RegimenSchema = require('../models/regimenEtico');
const connectDB = require('../db/connect');
const {
  api,
  base_url,
  closeConexion,
  conexionString,
  expressServer,
} = require('./test-config');

const { instructorBody } = require('./helpers');

beforeAll(async () => {
  await expressServer.launch();
  await connectDB(conexionString);
  await RegimenSchema.deleteMany({});
});

describe('API endpoint regimen-etico', () => {
  test('crear nuevo regimen-etico', async () => {
    await api
      .post(`${base_url}/evaluacion/regimen-etico`)
      .send(instructorBody)
      .expect('Content-Type', /application\/json/)
      .expect(201);
  });
  test('el nuevo regimen debe retornarse en formato json y tener la puntuacion total', async () => {
    const { body: regimen } = await api
      .post(`${base_url}/evaluacion/regimen-etico`)
      .send({ ...instructorBody, lealtad: 3 });

    const { payload } = regimen;
    // const newArr = content.map((rgm) => rgm.lealtad);
    // console.log(regimen);
    expect(payload.content.lealtad).toBe(3);
    expect(payload.content.suma_puntuacion).toBe(7);
  });

  test('deberia dar error al no encontrar el usuario o instuctor', async () => {
    const { body } = await api
      .post(`${base_url}/evaluacion/regimen-etico`)
      .send({ ...instructorBody, userId: '' })
      .expect(400);

    console.log(body);
  });

  test('deberia dar error al no poner la informacion requerida', async () => {
    await api.post(`${base_url}/evaluacion/regimen-etico`).send({}).expect(400);
  });

  test('deberia dar error al poner informacion erronea', async () => {
    await api
      .post(`${base_url}/evaluacion/regimen-etico`)
      .send({ ...instructorBody, lealtad: 4 })
      .expect(400);
  });
});

afterAll(async () => {
  await closeConexion;
  await expressServer.close({ server: expressServer.httpServer });
});
