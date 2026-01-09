const Task = require('../models/Task');
const User = require('../models/User');
const { sendWhatsAppMessage } = require('../utils/whatsapp');

exports.verifyWebhook = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
};

exports.handleWebhook = async (req, res) => {
    try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const message = value?.messages?.[0];

        if (!message) return res.sendStatus(200);

        const from = message.from; // WhatsApp ID (phone number)
        const text = message.text?.body?.trim();

        if (!text) return res.sendStatus(200);

        // Find or Create User by phone
        let user = await User.findOne({ phone: from });
        if (!user) {
            // Auto-register member for demo purposes, or require admin to add them
            user = new User({
                name: value.contacts?.[0]?.profile?.name || 'Unknown User',
                phone: from,
                role: 'member',
                password: 'dummy-password' // Note: In production, they should register via web
            });
            await user.save();
        }

        await processCommand(user, text, from);

        res.sendStatus(200);
    } catch (err) {
        console.error('Webhook Error:', err);
        res.sendStatus(200); // Always send 200 to WhatsApp to avoid retries
    }
};

async function processCommand(user, text, from) {
    const lowerText = text.toLowerCase();

    if (lowerText.startsWith('new task')) {
        await handleNewTask(user, text, from);
    } else if (lowerText === 'my tasks') {
        await handleMyTasks(user, from);
    } else if (lowerText.startsWith('update')) {
        await handleUpdateTask(user, text, from);
    } else if (lowerText === 'help') {
        await handleHelp(from);
    } else {
        await sendWhatsAppMessage(from, "I didn't understand that. Type 'help' for available commands.");
    }
}

async function handleNewTask(user, text, from) {
    // Format: new task <title> / <due YYYY-MM-DD> / <priority> / <assignee-phone>
    const parts = text.split('/').map(p => p.trim());
    const titlePart = parts[0].replace(/new task/i, '').trim();
    const dueDate = parts[1];
    const priority = parts[2]?.toLowerCase();
    const assigneePhone = parts[3];

    if (!titlePart || !dueDate || !priority || !assigneePhone) {
        return sendWhatsAppMessage(from, "Invalid format. Use: new task <title> / <due YYYY-MM-DD> / <priority> / <assignee-phone>");
    }

    const assignee = await User.findOne({ phone: assigneePhone });
    if (!assignee) {
        return sendWhatsAppMessage(from, `Assignee with phone ${assigneePhone} not found.`);
    }

    const task = new Task({
        title: titlePart,
        due_date: new Date(dueDate),
        priority: ['low', 'medium', 'high'].includes(priority) ? priority : 'medium',
        assigned_to: assignee._id,
        created_by: user._id
    });

    await task.save();
    await sendWhatsAppMessage(from, `✅ Task created! ID: ${task._id.toString().slice(-6)}`);
    await sendWhatsAppMessage(assigneePhone, `🔔 New task assigned: ${titlePart}\nDue: ${dueDate}`);
}

async function handleMyTasks(user, from) {
    const tasks = await Task.find({ assigned_to: user._id, status: { $ne: 'completed' } });
    if (tasks.length === 0) {
        return sendWhatsAppMessage(from, "You have no pending tasks.");
    }

    let response = "📋 Your Tasks:\n";
    tasks.forEach((t, i) => {
        response += `${i + 1}. [${t._id.toString().slice(-6)}] ${t.title} (Due: ${t.due_date.toISOString().split('T')[0]})\n`;
    });
    await sendWhatsAppMessage(from, response);
}

async function handleUpdateTask(user, text, from) {
    // Format: update <task-id-suffix> / <status>
    const parts = text.split('/').map(p => p.trim());
    const idSuffix = parts[0].replace(/update/i, '').trim();
    const status = parts[1]?.toLowerCase();

    const allowedStatus = ['open', 'in-progress', 'completed'];
    if (!idSuffix || !allowedStatus.includes(status)) {
        return sendWhatsAppMessage(from, "Invalid format. Use: update <task-id-last-6> / <status>\nStatus: open, in-progress, completed");
    }

    // Find task by suffix (in real app, use full ID or short ID system)
    const tasks = await Task.find({ assigned_to: user._id });
    const task = tasks.find(t => t._id.toString().endsWith(idSuffix));

    if (!task) {
        return sendWhatsAppMessage(from, "Task not found or not assigned to you.");
    }

    task.status = status;
    await task.save();
    await sendWhatsAppMessage(from, `✅ Task ${idSuffix} updated to ${status}.`);
}

async function handleHelp(from) {
    const helpText = `🤖 *Task Bot Commands*

1️⃣ *Create Task:*
new task <title> / <due YYYY-MM-DD> / <priority> / <assignee-phone>

2️⃣ *View My Tasks:*
my tasks

3️⃣ *Update Status:*
update <task-id-last-6> / <status>
(status: open, in-progress, completed)

4️⃣ *Help:*
help`;
    await sendWhatsAppMessage(from, helpText);
}
