import Joi from 'joi';
import { User, RefreshToken } from '../../models/index'
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import { REFRESH_SECRET } from '../../config'


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

        // bcrypt password
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const { name, email } = req.body;

        const user = new User({

            name,
            email,
            password: hashPassword

        });


        let access_token;
        let refresh_token;

        try {
            const result = await user.save();
            // console.log(result);
            // token
            access_token = JwtService.sign({ _id: result._id, role: result.role })
            refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET)

            // save refresh token in database to keep user login
            await RefreshToken.create({ token: refresh_token })

        } catch (err) {
            return next(err);
        }

        res.json({ access_token, refresh_token })
    }
}
export default registerController;