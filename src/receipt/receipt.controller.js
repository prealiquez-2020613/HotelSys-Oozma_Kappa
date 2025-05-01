import Receipt from './receipt.model.js'
import Reservation from '../reservation/reservation.model.js'
import Event from '../event/event.model.js'

// GENERAR FACTURA
export const generateReceipt = async (req, res) => {
    try {
        const userId = req.user.uid
        const { nit, reservationId, eventId } = req.body

        let totalAmount = 0
        let reservation = null
        let event = null

        if (!reservationId && !eventId) {
            return res.status(400).send({ success: false, message: 'At least one of reservationId or eventId is required' })
        }

        if (reservationId) {
            reservation = await Reservation.findById(reservationId)
            if (!reservation) {
                return res.status(404).send({ success: false, message: 'Reservation not found' })
            }
            if (reservation.status === 'CANCELLED') {
                return res.status(400).send({ success: false, message: 'Cannot generate receipt for a cancelled reservation' })
            }
            const existing = await Receipt.findOne({ reservation: reservationId })
            if (existing) {
                return res.status(400).send({ success: false, message: 'Receipt already exists for this reservation' })
            }
            totalAmount += reservation.totalPrice
        }

        if (eventId) {
            event = await Event.findById(eventId)
            if (!event) {
                return res.status(404).send({ success: false, message: 'Event not found' })
            }
            const existing = await Receipt.findOne({ event: eventId })
            if (existing) {
                return res.status(400).send({ success: false, message: 'Receipt already exists for this event' })
            }
            if (!event.total || event.total <= 0) {
                return res.status(400).send({ success: false, message: 'Event does not have a valid total' })
            }
            totalAmount += event.total
        }

        const receipt = new Receipt({
            user: userId,
            reservation: reservationId || null,
            event: eventId || null,
            nit,
            totalAmount,
            receiptStatus: 'PAID'
        })

        await receipt.save()

        return res.send({
            success: true,
            message: 'Receipt generated successfully',
            receipt
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error generating receipt', err })
    }
}

// LISTAR FACTURAS POR USUARIO
export const getReceiptsByUser = async (req, res) => {
    try {
        const userId = req.user.uid
        const receipts = await Receipt.find({ user: userId }).populate('reservation')

        if (!receipts.length) {
            return res.status(404).send({ success: false, message: 'No receipts found for this user' })
        }

        return res.send({
            success: true,
            message: 'Receipts retrieved successfully',
            receipts
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error retrieving receipts', err })
    }
}

// ANULAR FACTURA
export const updateReceiptStatus = async (req, res) => {
    try {
        const { receiptId } = req.body

        const receipt = await Receipt.findById(receiptId)
        if (!receipt) {
            return res.status(404).send({ success: false, message: 'Receipt not found' })
        }

        receipt.receiptStatus = 'ANNULLED'
        await receipt.save()

        return res.send({
            success: true,
            message: 'Receipt status updated to ANNULLED',
            receipt
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'Error updating receipt status', err })
    }
}
