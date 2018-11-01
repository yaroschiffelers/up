/**
 * Up - Email
 * @fileoverview write a quick email.
 * Add your credentials (username and password) to the .env
 * file in the root of this project.
 * Add your email configuration variables to the config.js
 * file in this directory.
 *
 * @author Yaro Schiffelers
 * @license MIT
 */
'use strict'

const ora = require('ora')
const nodemailer = require('nodemailer')
const { SERVICE, HOST, FROM } = require('./config.js')

/**
 * Nodemailer configuration.
 */
const transporterConfig = {
    service: SERVICE,
    host: HOST,
    auth: {
        user: __env.GMAIL_USER,
        pass: __env.GMAIL_APP_CODE
    }
}

const quickEmail = (to, subject, body) => {
    const spinner = ora('Sending email').start()

    // Compose the email.
    const content = {
        from: FROM,
        to: to,
        subject: subject,
        body: body
    }

    // Setup email client.
    const transporter = nodemailer.createTransport(transporterConfig)

    // Send the mail.
    transporter.sendMail(content, (err, res) => {
        if (err) {
            spinner.fail(`Error occurred: ${err.message}`)
            return process.exit(0)
        }
        spinner.succeed(`Email sent`)
    })
}

module.exports = quickEmail
