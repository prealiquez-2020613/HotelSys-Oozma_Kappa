import { Router } from 'express'
import {
    saveHotel,
    updateHotel,
    deleteHotel,
    getAllHotels,
    getHotel
} from './hotel.controller.js'

import { validateJwt, adminValidation, hotelAdminValidation } from '../../middlewares/validate.jwt.js'
import { hotelValidator, updatehotelValidator } from '../../helpers/validators.js'

const api = Router();

// RUTAS PRIVADAS 
api.post('/createHotel', [validateJwt, adminValidation, hotelValidator], saveHotel)
api.put('/updateHotel/:id', [validateJwt, hotelAdminValidation, updatehotelValidator], updateHotel)
api.delete('/deleteHotel/:id', [validateJwt, adminValidation],  deleteHotel)
api.get('/getAllHotels', getAllHotels)
api.get('/getHotel/:id', [validateJwt], getHotel)

export default api