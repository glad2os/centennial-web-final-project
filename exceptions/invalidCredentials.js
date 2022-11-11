class invalidCredentials extends Error {
    constructor () {
        super("Invalid credentials");
        this.name = this.constructor.name;
        this.status = 403;
    }
}

module.exports = {
    invalidCredentials
}