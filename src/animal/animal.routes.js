//Rutas Animal

import {Router} from 'express';
import {test, addAnimal} from '../animal/animal.controller.js'
import {saveAnimalValidator} from '../../helpers/validators.js'
import {validateJwt} from '../../middlewares/validate.jwt.js';

const api = Router();

api.get('/test', [validateJwt], test);

//RUTAS PRIVADAS
api.post('/',[saveAnimalValidator], [validateJwt], addAnimal)

export default api;