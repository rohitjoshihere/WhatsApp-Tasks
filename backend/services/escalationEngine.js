const cron = require('node-cron');
const Task = require('../models/Task');
const { sendWhatsAppMessage } = require('../utils/whatsapp');

const startEscalationEngine = () => {
    // Runs every hour: '0 * * * *'
    // For testing/demo, we can run every minute: '* * * * *'
    cron.schedule('0 * * * *', async () => {
        console.log('Running Escalation Engine...');
        try {
            const now = new Date();
            const overdueTasks = await Task.find({
                due_date: { $lt: now },
                status: { $ne: 'completed' },
                status: { $ne: 'overdue' } // only process tasks not yet marked overdue
            }).populate('assigned_to created_by');

            for (const task of overdueTasks) {
                task.status = 'overdue';
                task.escalation_level += 1;
                await task.save();

                const message = `⚠️ Escalation Alert
Task: ${task.title}
Assignee: ${task.assigned_to.name}
Due: ${task.due_date.toISOString().split('T')[0]}
Status: overdue
This task is overdue. Please take action.`;

                // Notify Assignee
                await sendWhatsAppMessage(task.assigned_to.phone, message);

                // Notify Creator (Admin)
                if (task.created_by.phone !== task.assigned_to.phone) {
                    await sendWhatsAppMessage(task.created_by.phone, message);
                }

                // Notify Admin Group (optional, using ENV variable)
                if (process.env.ADMIN_GROUP_NUMBER) {
                    await sendWhatsAppMessage(process.env.ADMIN_GROUP_NUMBER, message);
                }
            }
        } catch (err) {
            console.error('Escalation Engine Error:', err);
        }
    });
};

module.exports = startEscalationEngine;
