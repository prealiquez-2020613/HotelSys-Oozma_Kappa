import { Router } from 'express'
import { createEvent,getAllEvents,getEventById,updateEvent,deleteEvent } from './event.controller.js'
import { validateJwt, adminValidation } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/createEvent', [validateJwt], [adminValidation], createEvent)
api.get('/getAllEvents', [validateJwt], getAllEvents)
api.get('/getEvent/:id', [validateJwt], getEventById)
api.put('/updateEvent/:id', [validateJwt], [adminValidation], updateEvent)
api.delete('/deleteEvent/:id', deleteEvent)

export default api
