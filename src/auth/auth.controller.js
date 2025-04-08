//LÓGICA DE AUTENTICACIÓN
import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

//test
export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

//Register
export const register = async(req, res)=>{
    try{
        //Capturar los datos
        let data = req.body
        //Aquí van validaciones
        let user = new User(data)
        //Encriptar password
        user.password = await encrypt(user.password);
        //Asignar Rol por defecto
        //user.role = 'CLIENT';
        user.userStatus = true;
        //Guardar
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered successfully, can be logged with username: ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with registering user', err});
    }
}



//Login
export const login = async(req, res)=>{
    try {
        //Capturar datos del body
        let {username, password} = req.body;
        //Validar que el usuario exista
        let user = await User.findOne({username}); //finOne({username}) = {(usarname : username)}
        //Verificar que la contrasenia coincida.*/
        if(user && await checkPassword(user.password, password)){
            let loggedUser = { // NO PUEDE IR DATA SENSIBLE
                uid : user._id,
                name : user.name,
                username : user.username,
                role : user.role
            }

            //Generar token
            let token = await generateJwt(loggedUser);
            //Responder al usuario
            return res.send(
                {message : `Welcome, ${user.name}`,
                    loggedUser,
                    token
                }
            );
        };
        return res.status(404).send({message : 'Wrong email ir password'});
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'General error with login function', error});
    }
}