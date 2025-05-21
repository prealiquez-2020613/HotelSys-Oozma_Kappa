import { Schema, model } from "mongoose";

const hotelSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [100, `Can't be overcome 100 characters`],
        },
        address: {
            type: String,
            required: [true, "Address is required"]
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["ONE STAR", "TWO STARS", "THREE STARS", "FOUR STARS", "FIVE STARS"],
            uppercase: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        imageUrl: {
            type: String,
            required: [true, "Category is required"]
        }
    }
)

export default model("Hotel", hotelSchema);
