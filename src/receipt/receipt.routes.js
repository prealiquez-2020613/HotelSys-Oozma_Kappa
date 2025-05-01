import { Router } from 'express'
import { generateReceipt, getReceiptsByUser, updateReceiptStatus } from './receipt.controller.js'
import { validateJwt, adminValidation} from '../../middlewares/validate.jwt.js'
import { generateReceiptValidator } from '../../helpers/validators.js'

const api = Router()

api.post('/generateReceipt', [validateJwt, generateReceiptValidator], generateReceipt)
api.get('/getReceiptsByUser', [validateJwt], getReceiptsByUser)
api.put('/updateReceiptStatus', [validateJwt, adminValidation], updateReceiptStatus)

export default api
