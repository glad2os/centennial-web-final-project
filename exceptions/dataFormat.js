class dataFormat extends Error {
    constructor () {
        super("incorrect data format");
        this.name = this.constructor.name;
        this.status = 400;
    }
}

module.exports = {
    dataFormat
}