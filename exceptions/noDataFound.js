class noDataFound extends Error {
    constructor () {
        super("No data found")
        this.name = this.constructor.name
        this.status = 400
    }
}

module.exports = {
    noDataFound
}