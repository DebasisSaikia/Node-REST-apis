import Joi from 'joi';
import { User } from '../../models/index'
import CustomErrorHandler from '../../services/CustomErrorHandler';

const registerController = {

    async register(req, res, next) {

        // validation for users
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(12).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            confirm_password: Joi.ref('password')
        })

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }
        // check database user
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(CustomErrorHandler.alreadyExist('This email is already taken !!'));
            }
        } catch (err) {
            return next(err)
        }

        res.json({ msg: 'Hello from express' })
    }
}
export default registerController;