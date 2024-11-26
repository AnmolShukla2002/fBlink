const Agenda = require('agenda');

const agenda = new Agenda();

const initializeAgenda = async () => {
    try {
        const mongoConnectionString = process.env.MONGO_URI;
        if (!mongoConnectionString) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        agenda.mongo(await require('mongoose').connection.db, 'jobs'); // Use MongoDB connection from Mongoose

        // Define a sample job for sending emails
        agenda.define('send email', async (job) => {
            const { to, subject, text } = job.attrs.data;

            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject,
                text,
            });

            console.log(`Email sent to ${to}`);
        });

        await agenda.start(); // Start Agenda
        console.log('Agenda started successfully');
    } catch (error) {
        console.error('Error initializing Agenda:', error);
    }
};

module.exports = { agenda, initializeAgenda };
