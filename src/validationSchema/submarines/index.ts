import * as yup from 'yup';

export const submarineValidationSchema = yup.object().shape({
  depth: yup.number().integer().required(),
  buoyancy: yup.number().integer().required(),
  movement: yup.number().integer().required(),
  atmosphere_pressure: yup.number().integer().required(),
  blending: yup.number().integer().required(),
  winch: yup.number().integer().required(),
  ballast: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
