import multer from 'multer'
import { Product } from '../../models';
import path from 'path'
import CustomErrorHandler from '../../services/CustomErrorHandler';
import Joi from 'joi';
import fs from 'fs';
import productSchema from '../../validations/productValidations';

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
        handleMultiData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            const filePath = req.file.path;

            const { error } = productSchema.validate(req.body);

            if (error) {
                // delete uploaded file
                fs.unlink(`${appRoot}/${filePath}`, (err) => {

                    if (err) {
                        return next(CustomErrorHandler.serverError(err.message));
                    }

                });
                return next(error);
            }

            const { name, size, price } = req.body;
            let document;

            try {
                document = await Product.create({
                    name,
                    price,
                    size,
                    image: filePath,
                })
            } catch (error) {
                return next(error)
            }

            res.status(201).json(document)
        })
    },

    async update(req, res, next) {
        // multipart form data
        handleMultiData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }

            let filePath;

            if (req.file) {
                filePath = req.file.path;
            }



            const { error } = productSchema.validate(req.body);

            if (error) {
                // delete uploaded file
                if (req.file) {
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {

                        if (err) {
                            return next(CustomErrorHandler.serverError(err.message));
                        }

                    });
                }

                return next(error);
            }

            const { name, size, price } = req.body;
            let document;

            try {
                document = await Product.findOneAndUpdate({ _id: req.params.id }, {
                    name,
                    price,
                    size,
                    ...(req.file && { image: filePath })
                }, { new: true })
            } catch (error) {
                return next(error)
            }

            res.status(201).json(document)
        })
    },


    async destroy(req, res, next) {
        const document = await Product.findOneAndRemove({ _id: req.params.id });
        if (!document) {
            return next(new Error('Product not available'))
        }

        // delete all documents.delete the image first
        const imagePath = document.image
        fs.unlink(`${appRoot}/${imagePath}`, (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError());
            }
        })
        res.json(document)
    },

    async getAll(req, res, next) {
        let documents;
        try {
            documents = await Product.find();
            res.status(200).json(documents)
        } catch (error) {
            return next(CustomErrorHandler.serverError())
        }
    }


}

export default productController;