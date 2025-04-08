import { Schema, model } from 'mongoose';

const appointmentSchema = Schema(
    {
        client : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : [true, 'Client is required']
        },
        animal : {
            type : Schema.Types.ObjectId,
            ref : 'Animal',
            required : [true, 'Animal is required']
        },
        date : {
            type : Date,
            required : [true, 'Date is required']
        },
        appointmentStatus : {
            enum : ['PENDING', 'CANCELED']
        }
    }
);

export default model('Appointment', appointmentSchema);