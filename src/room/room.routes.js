import { Router } from "express";
import { createRoom, deleteRoom, getRoom, getAllRooms, updateRoom, getRoomByHotel } from "./room.controller.js";  
import { hotelAdminValidation, validateJwt } from "../../middlewares/validate.jwt.js";
import { createRoomValidator, updateRoomValidator } from "../../helpers/validators.js";

const api = Router();

api.get('/getAllRooms', [validateJwt], getAllRooms);
api.get('/findRoom/:_id', [validateJwt], getRoom);
api.get('/getRoomsByHotel', getRoomByHotel)
api.post('/createRoom', [validateJwt, hotelAdminValidation, createRoomValidator], createRoom);
api.delete('/deleteRoom/:_id', [validateJwt, hotelAdminValidation], deleteRoom);
api.put('/updateRoom/:_id', [validateJwt, hotelAdminValidation, updateRoomValidator], updateRoom);

export default api;
