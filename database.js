//init code
require('dotenv').config()
const mongoose = require('mongoose');
const assert = require('assert');

// const db_url = process.env.DB_URL; ////127.0.0.1:27017/mongo_test 
const db_url = "mongodb+srv://shubham:$@Mlr201999@shubham-test-trzmg.mongodb.net/test?retryWrites=true&w=majority"

// CONNECTION CODE

// const connectdb = async () => {

mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    },
    function (err, link) {
        if (err) {

            console.log('err#####', err.message)
        }
        //check errF
        assert.equal(err, null, 'DB CONNECTION FAILED');

        //ok
        console.log('DB CONNECTION SUCCESS......')
        // console.log(link)

    }
)
// }