import User from '../src/user/user.model.js'
import Hotel from '../src/hotel/hotel.model.js'
import Service from '../src/service/service.model.js'
import {isValidObjectId, Schema} from 'mongoose'


export const findUser = async (id)=>{
    try {
        const userExist = await User.findById(id)
        if (!userExist) return false
        return userExist
    } catch (error) {
        console.error(error)
        return false
    }
}

export const hotelExists = async (id) => {
    try {
        const hotel = await Hotel.findById(id)
        if (!hotel) {
            throw new Error('Hotel does not exist')
        }
        return true
    } catch (error) {
        throw new Error('Invalid hotel ID or hotel does not exist')
    }
}


export const serviceExists = async (id) => {
    try {
        const service = await Service.findById(id)
        if (!service) {
            throw new Error('Service does not exist')
        }
        return true
    } catch (error) {
        throw new Error('Invalid service ID or service does not exist')
    }
}

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username});
    if(alreadyUsername){
        console.error(`Username ${username} already exist`);
        throw new error(`Username ${username} already exist`);
    }
};

export const existEmail = async(email)=>{
    const alreadyExist = await User.findOne({email})
    if(alreadyExist){
        console.error(`Email ${email} already exist`)
        throw new error(`Email ${email} already exist`)
    }
}

export const validateHotelId = async (hotelId) => {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) throw new Error('Hotel does not exist');
    return true;
};

export const validatePrice = (price) => {
    if (price < 0) throw new Error('Price cannot be negative');
    return true;
};