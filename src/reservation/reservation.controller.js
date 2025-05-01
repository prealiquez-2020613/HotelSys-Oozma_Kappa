import Reservation from './reservation.model.js'
import Room from '../room/room.model.js'
import Service from '../service/service.model.js'

export const createReservation = async (req, res) => {
    try {
        const userId = req.user.uid
        const { hotel, room, checkIn, checkOut, services } = req.body

        if (new Date(checkIn) >= new Date(checkOut)) {
            return res.status(400).send({
                success: false,
                message: 'Check-out must be after check-in'
            })
        }

        let servicesArray = Array.isArray(services)
            ? services
            : typeof services === 'string'
                ? services.split(',').map(s => s.trim())
                : []

        const overlapping = await Reservation.findOne({
            room,
            status: 'CONFIRMED',
            $or: [
                {
                    checkIn: { $lt: checkOut },
                    checkOut: { $gt: checkIn }
                }
            ]
        })

        if (overlapping) {
            return res.status(400).send({
                success: false,
                message: 'Room is already reserved in the selected dates'
            })
        }

        const roomData = await Room.findById(room)
        if (!roomData) {
            return res.status(404).send({ success: false, message: 'Room not found' })
        }

        let servicesData = []
        let servicesTotal = 0

        if (servicesArray.length > 0) {
            servicesData = await Service.find({ _id: { $in: servicesArray } })
            servicesTotal = servicesData.reduce((acc, s) => acc + s.price, 0)
        }

        const totalPrice = roomData.price + servicesTotal

        const reservation = new Reservation({
            user: userId,
            hotel,
            room,
            checkIn,
            checkOut,
            services: servicesArray,
            totalPrice
        })

        await reservation.save()
        return res.send({
            success: true,
            message: 'Reservation created successfully',
            reservation
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error creating reservation', err })
    }
}

export const getUserReservations = async (req, res) => {
    try {
        const userId = req.user.uid
        const reservations = await Reservation.find({ user: userId }).populate('room').populate('hotel')

        return res.send({
            success: true,
            message: 'Reservations retrieved successfully',
            reservations
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error retrieving reservations', err })
    }
}

export const cancelReservation = async (req, res) => {
    try {
        const { reservationId } = req.body
        const reservation = await Reservation.findById(reservationId)

        if (!reservation) {
            return res.status(404).send({ success: false, message: 'Reservation not found' })
        }

        reservation.status = 'CANCELLED'
        await reservation.save()

        return res.send({
            success: true,
            message: 'Reservation cancelled successfully',
            reservation
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error cancelling reservation', err })
    }
}