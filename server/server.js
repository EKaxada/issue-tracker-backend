const express = require('express')
const app = express()

// serve the public folder to the home route '/'
app.use('/', express.static('public'))

// start application 
app.listen(3000, () => {
    console.log('App started on port 3000')
})