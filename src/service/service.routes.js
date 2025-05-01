import { Router } from 'express';
import {saveService,updateService,deleteService,getAllServices,getService,getServicesByHotel} from './service.controller.js'

import { validateJwt, adminValidation, hotelAdminValidation } from '../../middlewares/validate.jwt.js'
import { saveServiceValidator, updateServiceValidator, deleteServiceValidator, getServiceValidator, getServicesByHotelValidator} from '../../helpers/validators.js'

const api = Router()

// Rutas con validaciones y middlewares de autenticación
api.post('/createService', [validateJwt, hotelAdminValidation, saveServiceValidator], saveService)
api.put('/updateService/:id', [validateJwt, hotelAdminValidation, updateServiceValidator], updateService)
api.delete('/deleteService/:id', [validateJwt, hotelAdminValidation, deleteServiceValidator], deleteService)
api.get('/getAllServices', [validateJwt], getAllServices)
api.get('/getService/:id', [validateJwt], getServiceValidator, getService)
api.get('/getServicesByHotel/:hotelId', [validateJwt], getServicesByHotelValidator, getServicesByHotel)

export default api