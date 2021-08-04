import Joi from 'joi';
import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import { REFRESH_SECRET } from '../../config';

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
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET)

            // save refresh token in database to keep user login
            await RefreshToken.create({ token: refresh_token })

            res.json({ access_token, refresh_token })

        } catch (err) {
            return next(err)
        }


    },

    async logout(req, res, next) {

        // validating the token
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        })

        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            await RefreshToken.deleteOne({ token: req.body.refresh_token });
        } catch (err) {
            return next(new Error('Something went Wrong' + err.message))
        }

        res.json({ status: 1 })
    }
}
export default loginController;