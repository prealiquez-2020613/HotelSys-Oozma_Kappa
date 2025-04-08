import {Schema, model} from 'mongoose';

const animalSchema = Schema(
    {
        name : {
            type : String,
            maxLength : [35, 'Cannot be overcome 35 characters'],
            required : [true, 'name is required']
        },
        description : {
            type : String,
            required : [true, 'Description is required']
        },
        age : {
            type : String,
            maxLength : [10, 'Cannot be overcome 10 characters'],
            required : [true, 'Age is required']
        },
        type : {
            type : String,
            uppercase : true,
            required : [true, 'Type is required']
        },
        keeper : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : [true, 'Keeper is required']
        },
        status : {
            type : Boolean,
            default : true,
            required : [true, 'Status is required']
        }
    },
    {
        versionKey : false, //Deshabilitar el _v(Version del documento)
        timeStamps : true //Agrega propiedades de fecha (fecha de creacion y ultima actualizacion)
    }
);

export default model('Animal', animalSchema);