const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, },
    subject: { type: String },
    message: { type: String, required: true, },
    status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread', },
    date: { type: Date, default: Date.now, },
    replyMsg: { type: String, default: '', },
});

module.exports = mongoose.model('Message', messageSchema);