const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
var cors = require('cors');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', require('./routes/index'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
