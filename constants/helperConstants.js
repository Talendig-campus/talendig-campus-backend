const SUCCESSREPONSETYPE = {
  normalResponse: 'normalResponse',
  extendedResponse: 'extendedResponse',
};

const SHORTTEXTREPONSE = {
  notFound: '{placeholder} no encontrado.',
  found: '{placeholder} encontrado.',
  deleted: '{placeholder} ha sido eliminado.',
  updated: '{placeholder} ha sido editado.',
  serverError: 'Error en el servidor.',
  noBodyRequest: 'Esta solicitud necesita un cuerpo.',
  created: '{placeholder} creado.',
  errorId: 'El id de la ruta no coincide con el id en el cuerpo.',
  userNotFound: '{placeholder} no se encuentra.',
  userDeleted: '{placeholder} esta inactivo.',
  notId: 'Id no proporcionado',
  badRequest:
    '{placeholder} no es un valor válido, revise alguna de las puntuaciones de la evaluación',
};

const STATUS = {
  active: 'Active',
  inactive: 'Inactive',
  process: 'In Process',
  completed: 'Completed',
  retired: 'Retired'
}

const ACCESSLEVELS = {
  admin: "Admin",
  instructor: "Instructor",
  talent: "Talent",
}

module.exports = {
  SUCCESSREPONSETYPE,
  SHORTTEXTREPONSE,
  STATUS,
  ACCESSLEVELS,
};
