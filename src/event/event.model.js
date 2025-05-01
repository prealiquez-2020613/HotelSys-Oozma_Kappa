import { Schema, model } from 'mongoose' 

const eventSchema = new Schema(
    {  
        hotel:{
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: true
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
        resources: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Resource'
            }
        ],
        services: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Services'
            }
        ],
        price: {
            type: Number,
            required: [true, 'The price is mandatory']
        },
        category: {
            type: String,
            enum: ['WEDDING','BIRTHDAY','BUSINESS'],
            required: [true, 'The category is mandatory'],
            uppercase: true
        },
        status: { 
            type: String, 
            enum: ['SCHEDULED', 'CANCELLED', 'COMPLETED'], 
            uppercase: true,
            default: 'SCHEDULED'
        }
    }
) 

export default model('Event', eventSchema) 