import Joi from 'joi';
import { User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';

const loginController = {

    async login(req, res, next) {

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        const { error } = loginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // check database user if email exist or not:
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return next(CustomErrorHandler.notExist());
            }

            /**
             * compare the password with bcrypt
             */

            const passwordMatch = await bcrypt.compare(req.body.password, user.password)
            if (!passwordMatch) {
                return next(CustomErrorHandler.notExist())
            }

            // if password matched then generate token and login
            const access_token = JwtService.sign({ _id: user._id, role: user.role })
            res.json({ access_token: access_token })

        } catch (err) {
            return next(err)
        }


    }
}
export default loginController;