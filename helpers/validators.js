import {body} from 'express-validator'
import {validateErrorWithoutImg} from './validate.error.js'
import {existEmail, findUser, existUsername} from './db.validators.js'

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('email', 'Email cannot be empty').notEmpty().isEmail().custom(existEmail),
    body('username', 'Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().isLength({min : 8}),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrorWithoutImg
]

export const loginValidator = [
    body('username', 'Username cannot be empty').notEmpty(),
    body('password', 'Password cannot be empty').notEmpty().isLength({min : 8}),
    validateErrorWithoutImg
]

export const UpdateValidator = [
    body('name', 'Name cannot be empty').optional().notEmpty(),
    body('surname', 'Surname cannot be empty').optional().notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email').isEmail().optional().notEmpty().custom(existEmail),
    body('username', 'Username cannot be empty').optional().notEmpty().toLowerCase().custom(findUser),
    body('phone', 'Phone cannot be empty or is not a valid phone').optional().notEmpty().isMobilePhone(),
    validateErrorWithoutImg
]

export const newPasswordValidation = [
    body('actualPassword', 'Actual password is required').notEmpty(),
    body('newPassword', 'New password cannot be empty').notEmpty().isStrongPassword().isLength({min : 8}),
    validateErrorWithoutImg
]

export const deleteAccountValidation = [
    body('password', 'Password is required').notEmpty(),
    validateErrorWithoutImg
]

export const updateRoleValidation = [
    body('newRole', 'Role is required').notEmpty(),
    validateErrorWithoutImg
]

export const generateReceiptValidator = [
    body('nit', 'NIT is required and must be between 8 and 9 characters').notEmpty().isLength({ min: 8, max: 9 }),
    body('reservationId').optional(),
    body('eventId').optional().isMongoId(),
    validateErrorWithoutImg
]


// --------------------------------------------------------Room Validators----------------------------------------------------------------------
export const createRoomValidator = [
    body('type')
        .notEmpty().withMessage('Type cannot be empty')
        .isString().withMessage('Type must be a string')
        .isLength({ max: 30 }).withMessage('Type cannot exceed 30 characters'),

    body('capacity')
        .notEmpty().withMessage('Capacity cannot be empty')
        .isInt({ min: 1 }).withMessage('Capacity must be an integer of at least 1'),

    body('price')
        .notEmpty().withMessage('Price cannot be empty')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    body('availability')
        .notEmpty().withMessage('Availability cannot be empty')
        .isBoolean().withMessage('Availability must be true or false'),

    body('hotel')
        .notEmpty().withMessage('Hotel reference cannot be empty')
        .isString().withMessage('Hotel must be a string'),

    validateErrorWithoutImg
]

export const updateRoomValidator = [
    body('type')
        .optional()
        .notEmpty().withMessage('Type cannot be empty if provided')
        .isString().withMessage('Type must be a string')
        .isLength({ max: 30 }).withMessage('Type cannot exceed 30 characters'),

    body('capacity')
        .optional()
        .notEmpty().withMessage('Capacity cannot be empty if provided')
        .isInt({ min: 1 }).withMessage('Capacity must be an integer of at least 1'),

    body('price')
        .optional()
        .notEmpty().withMessage('Price cannot be empty if provided')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    body('availability')
        .optional()
        .notEmpty().withMessage('Availability cannot be empty if provided')
        .isBoolean().withMessage('Availability must be true or false'),

    body('hotel')
        .optional()
        .notEmpty().withMessage('Hotel reference cannot be empty if provided')
        .isString().withMessage('Hotel must be a string'),

    validateErrorWithoutImg
];