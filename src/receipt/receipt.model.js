import { Schema, model } from 'mongoose'

const receiptSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User reference is required']
        },
        reservation: {
            type: Schema.Types.ObjectId,
            ref: 'Reservation',
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },
        nit: {
            type: String,
            required: [true, 'NIT is required'],
            min: [8, 'NIT must have at least 8 characters'],
            max: [9, 'NIT must not exceed 9 characters']
        },
        totalAmount: {
            type: Number,
            required: [true, 'Total amount is required'],
            min: [0, 'Total amount cannot be negative']
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        receiptStatus: {
            type: String,
            enum: ['PAID', 'ANNULLED'],
            required: [true, 'Receipt status is required'],
            uppercase: true,
            default: 'PAID'
        }
    }
)

export default model('Receipt', receiptSchema)