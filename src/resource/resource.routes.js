import { Router } from 'express';
import {
    saveResource,
    updateResource,
    deleteResource,
    getAllResources,
    getResource
} from './resource.controller.js';

import { resourceValidator, updateResourceValidator } from '../../helpers/validators.js'
import { validateJwt, adminValidation, hotelAdminValidation } from '../../middlewares/validate.jwt.js';

const api = Router();

// Rutas privadas (solo admins)
api.post('/createResource', [validateJwt, hotelAdminValidation, resourceValidator], saveResource);
api.put('/updateResource/:id', [validateJwt, hotelAdminValidation, updateResourceValidator], updateResource);
api.put('/deleteResource/:id', [validateJwt, hotelAdminValidation], deleteResource);
api.get('/getAllResources', [validateJwt], getAllResources);
api.get('/getResource/:id', [validateJwt], getResource);

export default api;
