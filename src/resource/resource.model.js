import { Schema, model } from 'mongoose';

const resourceSchema = Schema(
    {
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true, 'Hotel ID is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        cost: {
            type: Number,
            required: [true, 'Cost is required'],
            min: [0, 'Cost must be a positive number']
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

export default model('Resource', resourceSchema);
