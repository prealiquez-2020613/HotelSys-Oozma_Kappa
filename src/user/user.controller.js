//Lógica de negocio
import User from './user.model.js';
import { checkPassword, encrypt } from "../../utils/encrypt.js";

export const getAll = async(req, res) =>{
    try {
        //Configuraciones de paginacion
        const {limit = 20, skip = 0} = req.query;
        const users = await User.find()
            .skip(skip)
            .limit(limit)
        if(users.legth === 0) return res.status(404).send({message : 'Users not found', success: false});
        return res.send({success: true, message : 'Users found', users, total : users.length});
        //return res.send({message : 'todo furula :D'});
    } catch (error) {
        console.error(error);
        return res.status(500).send({success: false, message : 'General error', error});
    }
}

//OBTENER UN USARIO POR SU ID
export const get = async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        );
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )
    } catch (error) {
        return res.status(500).send({success: false, message: 'General Error', error});
    }
}

//DELETE USER
export const deleteUser = async(req, res)=>{
    try {
        const {id} = req.params;

        const user = await User.findByIdAndUpdate(
            id,
            {userStatus : false},
            {new : true}
        );

        if(!user){
            return res.status(404).send(
                {
                    success: false,
                    message : 'User not found',
                }
            );
        }

        return res.send(
            {
                success: true,
                message : 'User deleted successfully',
                user
            }
        );
    } catch (error) {
        return res.status(500).send({success: false, message: 'General Error', error});
    }
};

//UPDATE USER
export const updateUser = async(req, res) =>{
    try {
        const {id} = req.params;
        const newdata = req.body;

        if(newdata.password){
            return res.send({message : 'You cannot update the password'});
        }

        const data = await User.findByIdAndUpdate(id, newdata, {new : true});

        if(!data) return res.status(404).send({succes : false, message : 'User not found'})
        return res.send({succes: true, message: 'User updated successfully', data});

    } catch (error) {
        console.error(error);
        return res.status(500).send({success: false, message: 'General Error', error});
    }
};


// UPDATE PASSWORD
export const updatePassword = async(req, res)=>{
    try {
        const {id} = req.params;
        const {actualPassword, newPassword} = req.body;

        const user = await User.findById(id);
        if(!user) return res.status(404).send({message : 'User not found'});

        if(user && await checkPassword(user.password, actualPassword)){

            user.password = await encrypt(newPassword);
            await user.save();

            return res.send({succes : true, message : 'Password Updated Succesfully', user})
        }
        
        return res.status(404).send({message : 'Wrong password'});

    } catch (error) {
        console.error(error);
        return res.status(500).send({success: false, message: 'General Error', error});
    }

};