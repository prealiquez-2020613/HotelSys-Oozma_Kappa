import { Router } from 'express'
import {
    saveHotel,
    updateHotel,
    deleteHotel,
    getAllHotels,
    getHotel
} from './hotel.controller.js'

import { validateJwt, adminValidation } from '../../middlewares/validate.jwt.js'

const api = Router();

// RUTAS PRIVADAS 
api.post('/createHotel', [validateJwt], [adminValidation], saveHotel)
api.put('/updateHotel/:id', [validateJwt], [adminValidation], updateHotel)
api.put('/deleteHotel/:id', [validateJwt], [adminValidation], deleteHotel)
api.get('/getAllHotels', [validateJwt], [adminValidation], getAllHotels)
api.get('/getHotel/:id', [validateJwt], [adminValidation], getHotel)

export default api