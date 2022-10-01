const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');
const Invite = require('../../models/Invite');
// @route   POST api/users
// @desc    Register new user
// @access  Public
router.get('/',express.json(), (req, res) => {

    const newUser = new User({
        name:"purabi",
        email:'purabi@gmail.com',
        password:'1234',
        ip:  req.clientIp,
        user_role: "gay"
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
            .then(user => {
            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                    }
                });
                }
            )
            });
        })
    })
 
});

module.exports = router;
