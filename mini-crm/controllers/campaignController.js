const Customer = require('../models/Customer');
const CommunicationLog = require('../models/CommunicationLog');
const axios = require('axios');

exports.createAudience = async (req, res) => {
    try {
        const criteria = req.body;
        const query = buildQuery(criteria);
        const customers = await Customer.find(query);
        // console.log(customers)
        res.status(200).send(customers);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { customerId, message } = req.body;
        const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';

        const log = new CommunicationLog({
            customerId,
            message,
            status,
        });

        await log.save();

        await axios.post('http://localhost:3000/api/campaigns/delivery-receipt', {
            logId: log._id,
            status,
        });

        res.status(200).send({ status });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deliveryReceipt = async (req, res) => {
    try {
        const { logId, status } = req.body;
        await CommunicationLog.findByIdAndUpdate(logId, { status });
        res.status(200).send({ status: 'updated' });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await CommunicationLog.find().sort({ createdAt: -1 });
        res.status(200).send(campaigns);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Utility function to build query based on criteria
const buildQuery = (criteria) => {
    const query = {};
    if (criteria.totalSpends) {
        query.totalSpends = { $gt: criteria.totalSpends };
    }
    if (criteria.maxVisits) {
        query.visits = { $lte: criteria.maxVisits };
    }
    if (criteria.lastVisit) {
        query.lastVisit = { $lte: new Date(new Date() - 3 * 30 * 24 * 60 * 60 * 1000) }; // Last 3 months
    }
    return query;
};
