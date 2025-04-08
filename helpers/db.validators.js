//VALIDACIONES EN RELACIÓN A LA DB

import User from '../src/user/user.model.js';
import {isValidObjectId, Schema} from 'mongoose';

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username});
    if(alreadyUsername){
        console.Error(`Username ${username} already exist`);
        throw new Error(`Username ${username} already exist`);
    }
}

export const objectIdValid = async (objectId)=>{
    if(!isValidObjectId(objectId)){
        throw new Error('Keeper is not objectId')
    }
};