const Product = require('../model/Product')
const url = require('url');

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    if (!products) return res.status(204).json({ 'message': 'No products found' });
    res.status(200).json(products);
}

const createNewProduct = async (req, res) => {
    // !req?.body?.firstname || !req?.body?.firstname
    if (!req?.body?.item) {
        return res.status(400).json({ 'message': 'product are required.' });
    }
    
    try {
        const result = await Product.create({
            // firstname: req.body.firstname,
            // lastname: req.body.lastname
            id: req.body.id,
            checked: req.body.checked,
            item: req.body.item

        });

        res.status(201).json(result._id.getTimestamp());
    } catch (err) {
        console.error(err);
    }
}

const updatProduct = async (req, res) => {
    // !req?.body?.id
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const product = await Product.findOne({ id: req.params.id }).exec();
    //console.log(employee);
    if (!product) {
        return res.status(204).json({ "message": ` No product matches ID ${req.body.id}.` });
    }

    // if (req.body?.firstname) employee.firstname = req.body.firstname;
    // if (req.body?.lastname) employee.lastname = req.body.lastname;
    if (req.params?.id) product.checked = req.body.checked;
    const result = await product.save();
    res.status(200).json(result);
    
    
}

const deleteProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Product ID required.' });

    const product = await Product.findOne({ id: req.params.id }).exec();

    if (!product) {
        return res.status(204).json({ "message": ` No product matches ID ${req.params.id}.` });
    }
    const result = await product.deleteOne({ id: req.params.id });
    res.status(200).json(result);
}

    const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Product ID required.' });

    const product = await Product.findOne({ _id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ "message": ` No product matches ID ${req.params.id}.` });
    }
    res.json(product);
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updatProduct,
    deleteProduct,
    getProduct
}