const fsPromises = require('fs').promises;
const path = require('path');
const easyinvoice = require('easyinvoice');


const createInvoice = async (req, res) => {
    let data = {
        "sender": {
            "company": "Mares Liviu PFA",
            "address": "Alexandru Cutieru 25A",
            "zip": "1234 AB",
            "city": "Bucuresti",
            "country": "Romania"
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        // Your recipient
        "client": {
            "company": "Persoana Fizica",
            "address": "Plaza Romania",
            "zip": "4567 CD",
            "city": "Bucuresti",
            "country": "Romania"
            // "custom1": "custom value 1",
            // "custom2": "custom value 2",
            // "custom3": "custom value 3"
        },
        "information": {
            // Invoice number
            "number": "2022.0001",
            // Invoice data
            "date": "26-12-2022",
            // Invoice due date
            "due-date": "31-01-2023"
        },
        "products": [
            {
                "quantity": 3,
                "description": "Caffe Latte",
                "tax-rate": 19,
                "price": 19
            },
            {
                "quantity": 4,
                "description": "Muffin",
                "tax-rate": 19,
                "price": 14.9
            },
            {
                "quantity": 2,
                "description": "Ice Latte",
                "tax-rate": 19,
                "price": 17.9
            }
        ]
    };

    const result = await easyinvoice.createInvoice(data);
    await fsPromises.writeFile(path.join(__dirname, '../invoice', 'invoice.pdf'), result.pdf, 'base64');
    console.log(result.pdf);
    res.send(result);
}

module.exports = { createInvoice };
