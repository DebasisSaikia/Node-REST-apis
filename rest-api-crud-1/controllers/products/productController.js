import multer from 'multer'
import { Product } from '../../models';
import path from 'path'
import CustomErrorHandler from '../../services/CustomErrorHandler';

// multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})

const handleMultiData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image');


const productController = {
    async store(req, res, next) {
        // multipart form data
        handleMultiData(req, res, (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            console.log(req.file)
            // const filePath=req.file.path;
        })
    }
}

export default productController;