import { Router } from 'express'
import {
    saveHotel,
    updateHotel,
    deleteHotel,
    getAllHotels,
    getHotel
} from './hotel.controller.js'

import { validateJwt, adminValidation } from '../../middlewares/validate.jwt.js'
import { hotelValidator, updatehotelValidator } from '../../helpers/validators.js'

const api = Router();

// RUTAS PRIVADAS 
api.post('/createHotel', [validateJwt, adminValidation, hotelValidator], saveHotel)
api.put('/updateHotel/:id', [validateJwt], [adminValidation], [updatehotelValidator], updateHotel)
api.put('/deleteHotel/:id', [validateJwt], [adminValidation],  deleteHotel)
api.get('/getAllHotels', [validateJwt], getAllHotels)
api.get('/getHotel/:id', [validateJwt], getHotel)

export default api