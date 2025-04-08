//GESTIONAR LAS IMAGENES (FUNCION RE-UTILIZABLE)
import multer from "multer"; //diskStorage
import {dirname, extname, join} from 'path';
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url)); //UBICACION ACTUAL DEL PROYECTO
const MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
const MAX_SIZE = 10000000//10 megabytes.

export const multerConfig = (destinationPath) =>{
    return multer(
        {
            storage : multer.diskStorage(
                {
                    destination : (req, file, cb)=> {//Donde guardar
                        const fullPath = join(CURRENT_DIR, destinationPath);
                        req.filePath = fullPath;
                        cb(null, fullPath)
                    },
                    filename : (req, file, cb)=>{
                        const fileExtension = extname(file.originalname);
                        const fileName = file.originalname.split(fileExtension)[0];
                        cb(null, `${fileName}-${Date.now()}${fileExtension}`);
                    }
                }
            ), //DONDE SE VA A ALMACENAR
            filefilter : (req, file, cb) =>{ //VALIDAR TIPO DE ARCHIVO ACEPTABLE
                if(MIMETYPES.includes(file.mimetyped)) cb(null, true)
                    else cb(new Error(`only ${MIMETYPES.join('')} are allowed`));
            },
            limits : { //TAMANIO MAXIMO DE ARCHIVO
                fileSize : MAX_SIZE
            }
        }
    );
};
export const uploadProfilePicture = multerConfig('../uploads/img/users')