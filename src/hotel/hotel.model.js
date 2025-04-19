import { Schema, model } from "mongoose";

const hotelSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [25, `Can't be overcome 25 characters`],
        },
        address: {
            type: String,
            required: [true, "Address is required"]
        },
        category: {
            type: String,
            required: [true, "Category is required"]
        },
        amenities: {
            type: String, 
            default: []
        }
    }
)

export default model("Hotels", hotelSchema);
