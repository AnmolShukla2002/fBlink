const { agenda } = require('../config/agenda'); // Ensure correct path

const scheduleEmail = async (req, res) => {
    try {
        console.log('Agenda instance:', agenda);
        const { to, subject, text, scheduledAt } = req.body;

        // Check if agenda is defined
        if (!agenda) {
            throw new Error('Agenda instance is not initialized');
        }

        // Schedule the job
        const job = await agenda.schedule(new Date(scheduledAt), 'send email', {
            to,
            subject,
            text,
        });

        res.status(200).json({
            message: 'Email scheduled successfully',
            job: {
                name: job.attrs.name,
                nextRunAt: job.attrs.nextRunAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { scheduleEmail };
