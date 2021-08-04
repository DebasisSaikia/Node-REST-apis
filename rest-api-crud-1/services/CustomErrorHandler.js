class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super()
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message) {
        return new CustomErrorHandler(409, message)
    }


    static notExist(message = "Invalid email or Password") {
        return new CustomErrorHandler(401, message)
    }
}

export default CustomErrorHandler;