//Validar campos en las rutas
import {body} from 'express-validator'; //Captura todo el body de la solicitud
import {validateErrors, validateErrorWithoutImg} from './validate.error.js'
import {existUsername, objectIdValid} from './db.validators.js'

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty').notEmpty().isEmail(),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().isLength({min : 8}),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrors
]

export const loginValidator = [
    body('username', 'Username cannot be empty').notEmpty(),
    body('password', 'Password cannot be empty').notEmpty().isLength({min : 8}),
    validateErrors
]

export const UpdateValidator = [
    body('name', 'Name cannot be empty').optional().notEmpty(),
    body('surname', 'Surname cannot be empty').optional().notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').isEmail().optional().notEmpty(),
    body('username', 'Username cannot be empty').optional().notEmpty().toLowerCase().custom(existUsername),
    body('phone', 'Phone cannot be empty or is not a valid phone').optional().notEmpty().isMobilePhone(),
    validateErrorWithoutImg
]

export const saveAnimalValidator = [
    body('name', 'Name cannot be empty').notEmpty().isLength({max : 35}),
    body('description', 'description cannot be empty').notEmpty(),
    body('age', 'Age cannot be empty').notEmpty().isLength({max : 10}),
    body('type', 'Type cannot be empty').notEmpty().toUpperCase(),
    body('keeper', 'Keeper cannot be empty').notEmpty().custom(objectIdValid),
    validateErrorWithoutImg
]

export const newPasswordValidation = [
    body('actualPassword', 'Actual password is required').notEmpty(),
    body('newPassword', 'New password cannot be empty').notEmpty().isStrongPassword().isLength({min : 8}),
    validateErrorWithoutImg
]

export const appointmentValidator = [
    body('animalId', 'Animal cannot be empty').notEmpty().custom(objectIdValid),
    body('date', 'Date cannot be empty').notEmpty(),
    body('appointmentStatus', 'Status cannot be empty').notEmpty(),
    validateErrorWithoutImg
]