const express = require('express');
const app = express();

// middleware function for serving static files
const fileServerMiddleware = express.static('public')

// mount middleware to application using 'use()' method
app.use('/', fileServerMiddleware)

// starting the server using 'listen()' method
app.listen(3000, function() {
    console.log('App started on port 3000')
})