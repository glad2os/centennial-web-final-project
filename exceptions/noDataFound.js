class noDataFound extends Error {
    constructor (text = null) {
        super(text !== null ? text : "No data found");

        this.name = this.constructor.name
        this.status = 400
    }
}

module.exports = {
    noDataFound
}