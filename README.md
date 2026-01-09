# AI WhatsApp Task Management System

A production-ready WhatsApp Cloud API based task management system with an automated escalation engine and a modern admin dashboard.

## 🚀 Features
- **WhatsApp Bot**: Create tasks, check assignments, and update status directly from WhatsApp.
- **Automated Escalation**: Cron-based engine that notifies assignees and admins when tasks are overdue.
- **Admin Dashboard**: Modern React-based interface with dark mode, productivity charts, and task management.
- **Role-Based Access**: Secure JWT authentication for admins and members.

## 🛠 Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, node-cron
- **Frontend**: React (Vite), Tailwind CSS, Chart.js, Lucide Icons
- **Messaging**: WhatsApp Cloud API

## 📁 Project Structure
- `/backend`: Express API, WhatsApp Webhook, Escalation Engine.
- `/admin-dashboard`: React frontend.

## ⚙️ Setup Instructions

### 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` based on `.env.example`:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Random string for JWT tokens.
   - `WHATSAPP_TOKEN`: Permanent access token from Meta Developer Portal.
   - `WHATSAPP_PHONE_NUMBER_ID`: Your WhatsApp Phone Number ID.
   - `VERIFY_TOKEN`: A secret string for webhook verification.
4. `npm start`

### 2. Admin Dashboard Setup
1. `cd admin-dashboard`
2. `npm install`
3. Create `.env`:
   - `VITE_API_URL=http://localhost:5001`
4. `npm run dev`

### 3. WhatsApp Webhook Configuration
- Set Webhook URL to: `<your-server-url>/webhook/whatsapp`
- Set Verify Token to match your `.env`.
- Subscribe to `messages` under Webhook objects.

## 🤖 WhatsApp Commands
- `help`: Show all commands.
- `new task <title> / <due-date> / <priority> / <phone>`: Create new task.
- `my tasks`: List all pending tasks assigned to you.
- `update <last-6-digits-of-id> / <status>`: Update task status.

## ⚠️ Escalation Rules
- Every hour, the system checks for tasks where `due_date < now` and `status != completed`.
- Marks them as `overdue`.
- Sends WhatsApp alerts to the assignee and the admin.
