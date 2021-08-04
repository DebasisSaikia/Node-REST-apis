import Joi from "joi";
import { REFRESH_SECRET } from "../../config";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";


const refreshController = {
    async refresh(req, res, next) {

        // validating the token
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        })

        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }


        // check refresh token in database
        let refreshToken;
        try {
            refreshToken = await RefreshToken.findOne({ token: req.body.refresh_token })

            if (!refreshToken) {
                return next(CustomErrorHandler.notAuthorized('Invalid refresh token'));
            }

            // verify the token 
            let userId;
            try {
                const { _id } = await JwtService.verify(refreshToken.token, REFRESH_SECRET);
                userId = _id;

            } catch (err) {
                return next(CustomErrorHandler.notAuthorized('Invalid refresh token'));
            }

            // verify if the user is in the database or not
            const user = User.findOne({ _id: userId });
            if (!user) {
                return next(CustomErrorHandler.notAuthorized("User not found"))
            }

            // now create both access token and refresh token
            const access_token = JwtService.sign({ _id: user._id, role: user.role })
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET)

            // save refresh token in database to keep user login
            await RefreshToken.create({ token: refresh_token })

            res.json({ access_token, refresh_token })

        } catch (err) {
            return next(new Error('Something went Wrong' + err.message));
        }
    }
}

export default refreshController;