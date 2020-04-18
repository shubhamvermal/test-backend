// inint code
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const user = require('../modals/user');


// middle were setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// router goes here

//default route
router.all(
    '/',
    function (req, res) {
        return res.json({
            'status': true,
            'message': 'user controler working'
        })
    }
)

// create new user route
router.post(
    '/createNew',
    [
        //check not empty field
        check('name').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()
    ],
    function (req, res) {
        // check validation error
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: 'form validation error',
                error: err.array()
            })
        }

        // hash password code
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // create new user modal
        let temp = new user({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })// check error


        // insert data in db
        temp.save(function (err, result) {
            if (err) {
                return res.json({
                    status: false,
                    message: 'insertion in db fail',
                    error: err
                })
            }
            //ok 
            return res.json({
                status: true,
                message: '  db insert is success... ',
                result: result
            })
        })
    }
);

// find with condition
router.get(
    // '/find/:email', // url binding meathod
    '/find', // FOR QUERY 
    function (req, res) {
        // find user doc
        user.find(function (err, result) {     // simple find all
            // user.find({ email: req.params.email }, function (err, result) {   // url binding method
            // user.find({ email: req.query.email }, function (err, result) {     // query method
            // user.find({ email: req.query.email }, { password: 0 }, function (err, result) {     // query with projection
            // user.findOne(function (err, result) {     // find only one in all
            // user.findById("5e99eb482b12a2262c96589c", function (err, result) {     // find using id

            // check error
            if (err) {
                return res.json({
                    status: false,
                    message: 'find in db failed',
                    error: err
                })
            }
            //ok
            return res.json({
                status: true,
                message: 'find in db success...',
                result: result
            })
        })
    }
)

//////////////////////////////////////////////// update
router.put(
    // '/update/:email', //for find any field given and update
    '/update/:id',      // for find id and update
    [
        //check not empty field
        check('name').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()
    ],
    function (req, res) {
        // checking is exist
        // if (req.params.email) {         // for email
        if (req.params.id) {         // for id            
            // update user doc
            // user.update(            // for simple update
            // user.findOneAndUpdate(            // for find single and update
            user.findByIdAndUpdate(            // for find by id and update

                // { email: req.params.email },   //all except findByIdAndUpdate
                req.params.id,
                { name: 'urururuururruur' },
                function (err, result) {
                    if (err) {
                        return res.json({
                            status: false,
                            message: 'db update failed...',
                            error: err
                        })
                    }
                    //ok
                    return res.json({
                        status: true,
                        messaga: ' db update success',
                        result: result
                    })
                }
            )
        }
        else {
            return res.json({
                status: false,
                message: 'not get email'
            })
        }
    }
)
///////////////////////////////////////////delete

router.delete(
    // '/delete/:email', //for simple
    '/delete/:id', // for id   
    [
        //check not empty field
        check('name').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()
    ],
    function (req, res) {
        if (req.params.id) {
            // user.remove(            //for remove with key in url like email
            // { email: req.params.email },     // for simple remove
            user.findByIdAndDelete(             // for use with id
                { _id: req.params.id },             // for use with id
                function (err, result) {
                    if (err) {
                        return res.json({
                            status: false,
                            message: 'db delete failed...',
                            error: err
                        })
                    }
                    return res.json({
                        status: true,
                        message: ' success in delete',
                        result: result
                    })
                }
            );
        }
        else {
            // if email not provided
            return res.json({
                status: false,
                message: 'email not provided'
            })
        }

    }
)

// login route for user
router.post(
    '/login',
    [
        //check not empty field
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()
    ],
    function (req, res) {
        //check validation
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: 'form validation error',
                error: err.array()
            })
        }

        //check mail exist or not
        user.findOne(
            { email: req.body.email },
            function (err, result) {
                if (err) {
                    return res.json({
                        status: false,
                        message: 'db read fail',
                        error: err
                    })
                }
                // result is empty or not
                if (result) {
                    //when result have value
                    // match hashed apss
                    const isMatch = bcrypt.compareSync(req.body.password, result.password)

                    // check pass is match
                    if (isMatch) {
                        // pass match
                        return res.json({
                            status: true,
                            message: ' user log in  succcess...',
                            result: result
                        })
                    }
                    else {
                        return res.json({
                            status: true,
                            message: ' password not match  log in  failed...',
                        })

                    }

                }
                else {
                    return res.json({
                        status: false,
                        message: 'user not exist'
                    })

                }
            }
        )
    }
)

//module exports
module.exports = router