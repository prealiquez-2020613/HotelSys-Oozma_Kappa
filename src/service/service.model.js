import { Schema, model } from "mongoose"

const serviceSchema = new Schema(
    {
        hotel: {
            type: Schema.Types.ObjectId,
            ref: "Hotel",
            required: [true, "Hotel is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            maxLength: [100, "Description cannot exceed 100 characters"]
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"]
        }
    },
    {
        timestamps: true
    }
)

export default model("Services", serviceSchema)