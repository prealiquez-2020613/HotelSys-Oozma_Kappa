//Middleware de validacon de tokens.

import jwt from 'jsonwebtoken';

//Validar que venga un token y no haya expirado
export const validateJwt = async(req, res, next) =>{
    try {
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY;
        //Obtener el token de los headers
        let {authorization} = req.headers;
        //verificar si viene el token
        if(!authorization) return res.status(401).send({message : 'Unauthorized'});
        //Desencriptar token
        let user = jwt.verify(authorization, secretKey); 
        //Inyectar la informacion del usuario a la solicitud
        req.user = user;
        //Todo salio bien, pase a la siguiente funcion
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send({message : 'Invalid Token'});
    }
}

export const clientValidation = (req, res, next) =>{
    try {
        if(req.user.role !== 'CLIENT'){
            return res.status(403).send({message : 'ACCESS DENIED - Just CLIENTS'});
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send({message : 'General Error'});
    }
};