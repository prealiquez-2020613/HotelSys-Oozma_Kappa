//Logica de gestion

import Animal from '../animal/animal.model.js';
import User from "../user/user.model.js"

export const test = (req, res)=>{
    return res.send({message : 'Todo funca'})
}
 
//Función para registrar un animal
export const addAnimal = async(req, res) => {
    const data = req.body

    try {
        const user = await User.findOne(
            { 
                _id : data.keeper,
                role : 'ADMIN'
            }
        );
 
        if (!user) return res.status(403).send(
            { 
                succes : false,
                message: 'keeper not found'
            }
        );
        const animal = new Animal(data);
 
        await animal.save()

        return res.send(
            {
                succes : true,
                message: `${animal.name} saved successfully`
        });
    } catch (err) {
        console.error(err)
        return res.status(500).send({succes : false, message: 'General error when adding animal'})
    }
}