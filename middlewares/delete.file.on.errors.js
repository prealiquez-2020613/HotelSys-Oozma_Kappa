//ELIMINAR ARCHIVOS SI ALGO SALE MAL
import { error } from 'console';
import {unlink} from 'fs/promises';
import { join } from 'path';

export const deleteFileOnError = async(error, req, res, next)=>{
    if(req.file && req.filePath){
        const filePath = join(req.filePath, req.file.filename)
        try {
            await unlink(filePath)
        } catch (unlinkError) {
            console.log('Error deleting file:', unlinkError)
        }
    }
    if(error.status === 400 || error.errors){ //Igualacion estricta | 1 === '1'
        return res.status(400).send({message : 'Error gettin images', error});
    }
    return res.status(500).send({message : error.message});
};