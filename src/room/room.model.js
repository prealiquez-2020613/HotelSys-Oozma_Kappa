import { Schema, model } from "mongoose";

const roomSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is a required field'],
            maxLength: [30, 'Name cannot exceed 30 characters']
        },
        type: {
            type: String,
            required: [true, 'Room type is a required field'],
            maxLength: [30, 'Room type cannot exceed 30 characters']
        },
        capacity: {
            type: Number,
            required: [true, 'Capacity is a required field'],
            min: [1, 'Capacity must be at least 1 person']
        },
        price: {
            type: Number,
            required: [true, 'Price is a required field'],
            min: [0, 'Price must be a positive number']
        },
        availability: {
            type: Boolean,
            required: [true, 'Availability is a required field']
        },
        hotel: {
            type: Schema.Types.ObjectId,
            required: [true, 'Hotel reference is required']
        }
    }
);

roomSchema.methods.toJSON = function() {
    const { __v, ...room } = this.toObject();
    return room;
};

export default model('Room', roomSchema);
