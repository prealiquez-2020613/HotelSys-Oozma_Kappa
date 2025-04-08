import Appointment from "./appointment.model.js";
import User from "../user/user.model.js";
import Animal from '../animal/animal.model.js';

export const testAppointment = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const addAppointment = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { animalId, date, appointmentStatus } = req.body;


        const animal = await Animal.findById(animalId);
        if (!animal) {
            return res.status(404).send({ success : false, message: 'Animal not found', animal });
        }

        const appointmentDay = await Appointment.findOne({ client: userId, date });
        if (appointmentDay) {
            return res.status(400).send({ success : false, message: 'Appointment in this day already exist' });
        }

        const verifyAppointment = await Appointment.findOne({ client: userId, animal: animalId });
        if (verifyAppointment) {
            return res.status(400).send({ success : false, message: 'Appointment with this pet already exist' });
        }

        

        const saveAppointment = new Appointment({
            client: userId,
            animal: animalId,
            date,
            appointmentStatus
        });

        await saveAppointment.save();

        return res.send({ success : true, message: 'Appointment scheduled successfully', saveAppointment });
    } catch (error) {
        return res.status(500).send({ success : false, message: 'General Error', error });
    }
};