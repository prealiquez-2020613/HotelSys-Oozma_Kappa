import { Schema, model } from 'mongoose' 

const eventSchema = new Schema(
    {  
        hotel: {
            type: String,
            required: [true, 'The name of the hotel is mandatory'],
            maxLength: [25, 'The hotel name cannot exceed 25 characters.'],
        },
        title: {
            type: String,
            required: [true, 'The event title is required'],
            maxLength: [25, 'The title cannot exceed 25 characters.'],
        },
        description: {
            type: String,
            required: [true, 'The description is mandatory.'],
            maxLength: [100, 'The description cannot exceed 100 characters.'],
        },
        date: {
            type: Date,
            required: [true, 'The date of the event is mandatory'],
        },
        status: { 
            type: String, 
            enum: ['scheduled', 'cancelled', 'completed'], 
            default: 'scheduled'
        }
    }
) 

export default model('Event', eventSchema) 
