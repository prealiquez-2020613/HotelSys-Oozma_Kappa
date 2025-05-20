import { Schema, model } from 'mongoose'

const reservationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User reference is required']
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true, 'Hotel reference is required']
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: [true, 'Room reference is required']
        },
        checkIn: {
            type: Date,
            required: [true, 'Check-in date is required']
        },
        checkOut: {
            type: Date,
            required: [true, 'Check-out date is required']
        },
        services: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Service'
            }
        ],
        totalPrice: {
            type: Number,
            required: [true, 'Total price is required'],
            min: [0, 'Total price cannot be negative']
        },
        status: {
            type: String,
            enum: ['CONFIRMED', 'CANCELLED', 'FINISHED'],
            default: 'CONFIRMED',
            uppercase: true
        }
    }
)

export default model('Reservation', reservationSchema)
