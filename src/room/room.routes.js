import { Router } from "express";
import { createRoom, deleteRoom, getRoom, getAllRooms, updateRoom } from "./room.controller.js";  
import { hotelAdminValidation, validateJwt } from "../../middlewares/validate.jwt.js";
import { createRoomValidator, updateRoomValidator } from "../../helpers/validators.js";

const api = Router();

api.get('/getAllRooms', [validateJwt, hotelAdminValidation],getAllRooms);
api.get('/findRoom/:_id', [validateJwt, hotelAdminValidation], getRoom);
api.post('/createRoom', [validateJwt, hotelAdminValidation, createRoomValidator], createRoom);
api.delete('/deleteRoom/:_id', [validateJwt, hotelAdminValidation], deleteRoom);
api.put('/updateRoom/:_id', [validateJwt, hotelAdminValidation, updateRoomValidator], updateRoom);

export default api;
