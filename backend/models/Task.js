const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    due_date: { type: Date },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'completed', 'overdue'],
        default: 'open'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    escalation_level: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

taskSchema.pre('save', function () {
    this.updated_at = Date.now();
});

module.exports = mongoose.model('Task', taskSchema);
