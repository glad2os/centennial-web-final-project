class JsonWebTokenError extends Error {
    constructor () {
        super("Authorization Error");
        this.name = this.constructor.name;
        this.status = 403;
    }
}

module.exports = {
    JsonWebTokenError
}