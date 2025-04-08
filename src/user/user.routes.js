//Rutas 

import {Router} from 'express';
import {getAll, get, deleteUser, updateUser, updatePassword} from './user.controller.js';
import {validateJwt} from '../../middlewares/validate.jwt.js';
import {UpdateValidator, newPasswordValidation} from '../../helpers/validators.js';

const api = Router();

//rutas privadas

api.get('/',[validateJwt], getAll);
api.get('/:id', [validateJwt], get);
api.put('/deleteUser/:id', [validateJwt], deleteUser);
api.put('/updateUser/:id', [ [validateJwt], UpdateValidator], updateUser);
api.put('/updatePasswordUser/:id', [validateJwt], [newPasswordValidation], updatePassword);

export default api;