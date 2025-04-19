import { Router } from "express";
import { createRoom, deleteRoom, getRoom, getAllRooms, updateRoom } from "./room.controller.js";  

const api = Router();

api.get('/getAllRooms', getAllRooms);
api.get('/findRoom/:_id', getRoom);
api.post('/createRoom', createRoom);
api.delete('/deleteRoom/:_id', deleteRoom);
api.put('/updateRoom/:_id', updateRoom);

export default api;
