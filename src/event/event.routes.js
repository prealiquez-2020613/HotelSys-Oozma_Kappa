import { Router } from 'express'
import { createEvent,getAllEvents,getEventById,updateEvent,deleteEvent } from './event.controller.js'
import { validateJwt, adminValidation, hotelAdminValidation } from '../../middlewares/validate.jwt.js'
import { addEventValidation, updateEventValidation } from '../../helpers/validators.js'

const api = Router()

api.post('/createEvent', [ validateJwt, adminValidation, addEventValidation], createEvent)
api.get('/getAllEvents', [validateJwt, hotelAdminValidation], getAllEvents)
api.get('/getEvent/:id', [validateJwt, hotelAdminValidation], getEventById)
api.put('/updateEvent/:id', [validateJwt,adminValidation, updateEventValidation], updateEvent)
api.delete('/deleteEvent/:id', [validateJwt, adminValidation], deleteEvent)

export default api
