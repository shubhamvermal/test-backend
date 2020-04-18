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

        user.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            },
            function (error, result) {
                // check error
                if (error) {
                    return res.json({
                        status: false,
                        message: 'db insert fail',
                        error: error
                    })
                }
                // if  every thing ok..
                return res.json({
                    status: true,
                    message: ' db insert success...',
                    result: result
                })
            }
        )
        // output data to user  ===> commented so no return data to user
        // return res.json({
        //     status: true,
        //     message: ' data is ok...',
        //     data: req.body,
        //     hashedPassword: hashedPassword
        // })
    }
)


//module exports
module.exports = router