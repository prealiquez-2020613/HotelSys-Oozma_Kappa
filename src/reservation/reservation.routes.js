import { Router } from 'express'
import { createReservation, getUserReservations, cancelReservation } from './reservation.controller.js'
import { validateJwt} from '../../middlewares/validate.jwt.js'
import { generateReceiptValidator } from '../../helpers/validators.js'

const api = Router()

api.post('/createReservation', [validateJwt], [generateReceiptValidator], createReservation)
api.get('/getUserReservations', [validateJwt], getUserReservations)
api.put('/cancelReservation', [validateJwt], cancelReservation)

export default api
