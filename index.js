//init code
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const database = require('./database')
const userController = require('./controllers/user')
// const morgan = require('morgan');
// const morgan = require('morgan');


const port = process.env.PORT;
const app = express();

// middelwerw set up

app.use(morgan('dev'))
app.use(cors())
app.use('/api/user', userController);
app.all(
    '*',
    function (req, res) {

        return res.json({
            status: true,
            name: 'shubham',
            message: 'good night'
        })
    }
);

app.listen(
    port,
    function () {
        console.log('listen at ===> ', port)
    }
)

