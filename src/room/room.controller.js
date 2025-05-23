'use strict';

import Room from './room.model.js';
import mongoose from 'mongoose';

export const createRoom = async (req, res) => {
    try {
        const data = req.body;
        const room = new Room(data);
        await room.save();
        return res.send({
            message: "Room successfully created",
            success: true
        });
    } catch (error) {
        console.error('General error', error);
        return res.status(500).send({
            message: 'General error',
            success: false,
            error
        });
    }
};

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        if (rooms.length === 0) {
            return res.status(400).send({
                message: "Rooms not found",
                success: false
            });
        }
        return res.send({
            message: "Rooms found",
            success: true,
            rooms
        });
    } catch (error) {
        console.error('General error', error);
        return res.status(500).send({
            message: 'General error',
            success: false,
            error
        });
    }
};

export const getRoom = async (req, res) => {
    try {
        const id = req.params._id;
        console.log('ID recibido:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                message: "Invalid ID format",
                success: false
            });
        }

        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).send({
                message: "Room not found",
                success: false
            });
        }

        return res.send({
            message: "Room successfully found",
            success: true,
            room
        });
    } catch (error) {
        console.error('General error', error);
        return res.status(500).send({
            message: 'Internal server error',
            success: false,
            error
        });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const id = req.params._id;
        const data = req.body;

        const updatedRoom = await Room.findByIdAndUpdate(id, data, { new: true });
        if(data.hotel) return res.status(403).send({message : 'You cannot update the hotel here'})

        if (!updatedRoom) {
            return res.status(404).send({
                message: "Room not found",
                success: false
            });
        }

        return res.send({
            message: "Room updated successfully",
            success: true,
            updatedRoom
        });
    } catch (error) {
        console.error('Error updating room:', error);
        return res.status(500).send({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const id = req.params._id;

        const deletedRoom = await Room.findByIdAndDelete({ _id: id });

        if (!deletedRoom) {
            return res.status(404).send({
                message: "Room not found, not deleted",
                success: false
            });
        }

        return res.send({
            message: "Room successfully deleted",
            success: true
        });
    } catch (error) {
        console.error('General error', error);
        return res.status(500).send({
            message: 'General error',
            success: false,
            error
        });
    }
};

export const getRoomByHotel = async (req, res) => {
    try {

        //solicitar el id del hotel. data.idHotel
        let { idHotel } = req.query;
        if (!idHotel) return res.status(400).send({ message: 'ID hotel no ingresado.' })

        const hotel = await Hotel.findById(idHotel)
        if (!hotel) return res.status(404).send({ message: 'Hotel no encontrado.' })
        console.log(hotel);
        const rooms = await Room.find({ hotel: idHotel })
        console.log(rooms);

        return res.send(rooms)
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error',
            success: false,
            error
        });
    }
};