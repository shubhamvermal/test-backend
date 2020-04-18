//init code
const mongoose = require('mongoose')

// user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

// user modal
mongoose.model('users', userSchema)

// module export
module.exports = mongoose.model('users')