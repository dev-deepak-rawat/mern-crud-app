const express = require('express');
const app = express();

require('dotenv').config();

require('./startup/db')();
require('./startup/routes')(app);


const PORT = process.env.PORT || 9005;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))    