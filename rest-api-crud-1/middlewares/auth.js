import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader);

    if (!authHeader) {
        return next(CustomErrorHandler.notAuthorized())
    }

    const token = authHeader.split(' ')[1];

    try {
        const { _id, role } = await JwtService.verify(token);

        const user = {
            _id,
            role
        }
        req.user = user
        next()

    } catch (error) {
        return next(CustomErrorHandler.notAuthorized())
    }

}

export default auth;