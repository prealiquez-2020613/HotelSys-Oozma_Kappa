import { Router } from 'express';
import {saveService,updateService,deleteService,getAllServices,getService,getServicesByHotel} from './service.controller.js'

import { validateJwt, adminValidation } from '../../middlewares/validate.jwt.js'
import { saveServiceValidator, updateServiceValidator, deleteServiceValidator, getServiceValidator, getServicesByHotelValidator} from '../../helpers/validators.js'

const api = Router()

// Rutas con validaciones y middlewares de autenticación
api.post('/createService', [validateJwt, adminValidation, saveServiceValidator], saveService)
api.put('/updateService/:id', [validateJwt, adminValidation, updateServiceValidator], updateService)
api.delete('/deleteService/:id', [validateJwt, adminValidation, deleteServiceValidator], deleteService)
api.get('/getAllServices', getAllServices)
api.get('/getService/:id', getServiceValidator, getService)
api.get('/getServicesByHotel/:hotelId', getServicesByHotelValidator, getServicesByHotel)

export default api