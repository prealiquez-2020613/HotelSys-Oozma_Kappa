import { Router } from 'express';
import {saveService, updateService, deleteService, getAllServices, getService, getServicesByHotel} from './service.controller.js'

import { validateJwt, adminValidation } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/createService', saveService)
api.put('/updateService/:id', updateService)
api.delete('/deleteService/:id',deleteService)
api.get('/getAllServices', getAllServices)
api.get('/getService/:id', getService)
api.get('/getServicesByHotel/:hotelId', getServicesByHotel)

export default api