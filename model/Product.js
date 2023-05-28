const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: Number,
    checked: Boolean,
    item: String

    // firstname: {
    //     type: String,
    //     required: true
    // },
    // lastname: {
    //     type: String,
    //     required: true
    // }
});

module.exports = mongoose.model('Product', productSchema)