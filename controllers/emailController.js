const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {

    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
            <li>Name: ${req.body.name}</li>
            <li>Company: ${req.body.company}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    const transporter = nodemailer.createTransport({
        // host: 'smtp.mail.yahoo.com',
        // port: 587, //465
        service:'gmail',
        secure: false,
        auth: {
           user: 'liviumirell@gmail.com',
           pass: 'ivsyrkwuqeoyappy'
        },
        debug: false
    })

    console.log(req.body.phone);
    
    const mailOptions = {
        from: 'liviumirell@gmail.com',
        to: 'mirelliviu@icloud.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: output
      };
      
    const result = await transporter.sendMail(mailOptions);
    console.log(result);
    res.json(result);
}

module.exports = { sendEmail };