import Resource from './resource.model.js';
import '../hotel/hotel.model.js';

// Crear recurso
export const saveResource = async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        return res.send({ success: true, message: 'Resource created successfully', resource });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error creating resource', error });
    }
}

// Actualizar recurso
export const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Resource.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).send({ message: 'Resource not found' });
        return res.send({ success: true, message: 'Resource updated', updated });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error updating resource', error });
    }
}

// Eliminar recurso 
export const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).send({ success: false, message: 'Resource not found' });
        }
        resource.status = false;
        await resource.save();
        return res.send({ success: true, message: 'Resource deleted successfully', resource });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error deleting resource', error });
    }
}

// Obtener todos 
export const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find({ status: true }).populate('hotel', 'name');
        if (!resources.length) return res.status(404).send({ message: 'No resources found' });
        return res.send({ success: true, message: 'Resources found', resources });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error retrieving resources', error });
    }
}

// Obtener un recurso por ID
export const getResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id).populate('hotel', 'name');
        if (!resource) return res.status(404).send({ message: 'Resource not found' });
        return res.send({ success: true, message: 'Resource found', resource });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'Error retrieving resource', error });
    }
}
