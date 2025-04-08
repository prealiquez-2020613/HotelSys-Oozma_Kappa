//RUTAS APPOINTMENT

import {Router} from 'express';
import {testAppointment, addAppointment} from './appointment.controller.js';
import {appointmentValidator} from '../../helpers/validators.js';
import {validateJwt, clientValidation} from '../../middlewares/validate.jwt.js';

const api = Router();

api.get('/', [validateJwt], testAppointment);
api.post('/addAppointment', [validateJwt], [appointmentValidator], [clientValidation], addAppointment)

export default api;