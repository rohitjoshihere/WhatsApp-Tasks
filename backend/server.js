require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const startEscalationEngine = require('./services/escalationEngine');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const webhookRoutes = require('./routes/webhook');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(morgan('dev'));

// Database
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/webhook', webhookRoutes);

// Health Check
app.get('/', (req, res) => res.send('WhatsApp Task API Running'));

// Start Escalation Engine
startEscalationEngine();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
