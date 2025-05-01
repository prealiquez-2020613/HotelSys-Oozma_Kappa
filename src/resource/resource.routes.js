import { Router } from 'express';
import {
    saveResource,
    updateResource,
    deleteResource,
    getAllResources,
    getResource
} from './resource.controller.js';

import { resourceValidator, updateResourceValidator } from '../../helpers/validators.js'
import { validateJwt, adminValidation } from '../../middlewares/validate.jwt.js';

const api = Router();

// Rutas privadas (solo admins)
api.post('/createResource', [validateJwt, adminValidation, resourceValidator], saveResource);
api.put('/updateResource/:id', [validateJwt, adminValidation, updateResourceValidator], updateResource);
api.put('/deleteResource/:id', [validateJwt, adminValidation], deleteResource);
api.get('/getAllResources', [validateJwt, adminValidation], getAllResources);
api.get('/getResource/:id', [validateJwt, adminValidation], getResource);

export default api;
