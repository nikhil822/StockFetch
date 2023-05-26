const nodemailer = require("nodemailer");
const Mailgen = require('mailgen')
const dotenv = require('dotenv')
dotenv.config()

const realMail = async (req, res) => {

    const {email, price, date} = req.body

    let config = {
        service: 'gmail',
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.USER_PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)
    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Nikhil',
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: 'Nikhil',
            intro: 'Welcome to Stock News! Here are your stock price of the day!',
            table: {
                data: [
                    {
                        date: date,
                        price: price
                    }
                ]
            },
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: process.env.USER_MAIL,
        to: email,
        subject: 'Your Stock Price',
        html: mail
    }

    try {
        await transporter.sendMail(message)
        return res.status(201).json({message: 'Email sent'})
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: 'Error sending email'})
    }

    res.status(201).json({message: 'Email sent'})
}

module.exports = {
    realMail
}