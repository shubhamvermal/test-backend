//init code
require('dotenv').config()
const mongoose = require('mongoose');
const assert = require('assert');

const db_url = process.env.DB_URL;

// CONNECTION CODE
mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    },
    function (err, link) {
        //check err
        assert.equal(err, null, 'DB CONNECTION FAILED');

        //ok
        console.log('DB CONNECTION SUCCESS......')
        // console.log(link)

    }
)
