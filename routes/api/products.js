const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../../controllers/productsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(productsController.getAllProducts)
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), 
    .post(productsController.createNewProduct)
    // verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), 
    // .put(employeesController.updatEmployee)
    // verifyRoles(ROLES_LIST.Admin), 
    // .delete(employeesController.deleteEmployee);

    router.route('/:id')
        .get(productsController.getProduct)
        .patch(productsController.updatProduct)
        .delete(verifyRoles(ROLES_LIST.Admin), productsController.deleteProduct);

module.exports = router;