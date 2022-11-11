class emptyException extends Error {
    constructor (message= null) {
        super(message);
        this.name = this.constructor.name;
        this.status = 400;
    }
}

module.exports = {
    emptyException
}