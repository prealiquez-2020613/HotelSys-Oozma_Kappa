import Hotel from './hotel.model.js'

// CREAR HOTEL
export const saveHotel = async (req, res) => {
    try {
        const hotel = new Hotel(req.body)
        await hotel.save()
        return res.send({ success: true, message: 'Hotel created successfully', hotel })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Error saving hotel', error })
    }
}

// ACTUALIZAR HOTEL
export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const hotel = await Hotel.findByIdAndUpdate(id, data, { new: true })
        if (!hotel) return res.status(404).send({ success: false, message: 'Hotel not found' })
        return res.send({ success: true, message: 'Hotel updated successfully', hotel })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Error updating hotel', error })
    }
}

// ELIMINAR HOTEL (CAMBIAR STATUS)
export const deleteHotel = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Invalid ID' });
        const deleteHotel = await Hotel.findByIdAndDelete(id);
        if (!deleteHotel) return res.status(404).send({ message: 'Hotel not found' });
        return res.send({ message: 'Hotel deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General Error', err });
    }
}

// OBTENER TODOS LOS HOTELES
export const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        if (hotels.length === 0) return res.status(404).send({ success: false, message: 'No hotels found' })
        return res.send({ success: true, message: 'Hotels found', hotels })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Error retrieving hotels', error })
    }
}

// OBTENER HOTEL POR ID
export const getHotel = async (req, res) => {
    try {
        const { id } = req.params
        const hotel = await Hotel.findById(id)
        if (!hotel) return res.status(404).send({ success: false, message: 'Hotel not found' })
        return res.send({ success: true, message: 'Hotel found', hotel })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'Error retrieving hotel', error })
    }
}