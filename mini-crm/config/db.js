const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    // console.log("Hello")
    try {
        // console.log(process.env.MONGO_URI)
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("DB Connected")
        }).catch((err) => {
            console.log(err)
        });
        // console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
