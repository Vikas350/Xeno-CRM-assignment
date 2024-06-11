const mongoose = require('mongoose');

const communicationLogSchema = new mongoose.Schema({
    customerId: mongoose.Schema.Types.ObjectId,
    message: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CommunicationLog', communicationLogSchema);
