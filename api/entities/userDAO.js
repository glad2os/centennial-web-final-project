let mongoose = require("mongoose");

class ProductDAO {
    static of(id, name, description, price) {
        return new ProductDAO(mongoose.Types.ObjectId(id), name, description, price);
    }

    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

module.exports = ProductDAO