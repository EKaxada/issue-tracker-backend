const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.static('public'));

const port = process.env.UI_SERVER_PORT || 8000
app.listen(port, function() {
    console.log(`UI Server started on port ${port}`);
});