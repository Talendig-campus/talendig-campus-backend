/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
const AspectoMejora = require('../models/aspectoMejora');
const connectDB = require('../db/connect');
const {
  api,
  base_url,
  closeConexion,
  conexionString,
  expressServer,
} = require('./test-config');

const { aspectoMejoraBody } = require('./helpers');

beforeAll(async () => {
  await expressServer.launch();
  await connectDB(conexionString);
  await AspectoMejora.deleteMany({});
});

describe('API endpoint aspecto-mejora', () => {
  test('crear nuevo aspecto-mejora', async () => {
    await api
      .post(`${base_url}/evaluacion/aspecto-mejora`)
      .send(aspectoMejoraBody)
      .expect('Content-Type', /application\/json/)
      .expect(201);
  });
  test('el nuevo aspecto debe retornarse en formato json', async () => {
    const { body: aspectoMejora } = await api
      .post(`${base_url}/evaluacion/aspecto-mejora`)
      .send({ ...aspectoMejoraBody });

    const { payload } = aspectoMejora;
    // const newArr = content.map((rgm) => rgm.lealtad);
    // console.log(regimen);
    expect(payload.content.calificacion_plan_mejora).toBe(true);
    expect(payload.content.areas_mejora).toContain('Awesome');
  });

  test('deberia dar error al no encontrar el usuario o instuctor', async () => {
    const { body } = await api
      .post(`${base_url}/evaluacion/aspecto-mejora`)
      .send({ ...aspectoMejoraBody, userId: '' })
      .expect(400);

    console.log(body);
  });

  test('deberia dar error al no poner la informacion requerida', async () => {
    await api.post(`${base_url}/evaluacion/aspecto-mejora`).send({}).expect(400);
  });

  test('deberia dar error al poner informacion erronea', async () => {
    await api
      .post(`${base_url}/evaluacion/aspecto-mejora`)
      .send({ ...aspectoMejoraBody, firmaEvaluador: 'hola' })
      .expect(400);
  });
});

afterAll(async () => {
  await closeConexion;
  await expressServer.close({ server: expressServer.httpServer });
});
