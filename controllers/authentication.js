const jwt = require('jwt-simple');
const User = require('../models/users');
const { secret } = require ('../config');

function tokenForUser(user) {
    const ts = new Date().getTime();

    return jwt.encode({
        uid: user.id,
        ts: ts
    }, secret);
};

exports.signup = (req, res, next) => {
    const {email, password, firstName, lastName} = req.body;
    if (!email || !password || !firstName || !lastName) {
        const errors = [];
        if (!email) {
            errors.push('No email found');
        }
        if (!password) {
            errors.push('No password found');
        }
        if (!firstName) {
            errors.push('No first name found');
        }
        if (!lastName) {
            errors.push('No last name found');
        }

        return res.status(422).send(errors);
    }
    User.findOne({email}, (err, existingUser) => {
        if(err) return next(err);

        if(existingUser) {
            return res.status(422).send(['Email already in use'])
        }

        const newUser = new User({
            email: email,
            password: password, 
            firstName: firstName,
            lastName: lastName
        });

        newUser.save(err => {
            if(err) return next(err);
            res.send({
                token: tokenForUser(newUser)
            });
        })
    });
};

exports.signin = (req, res, next) => {
    res.send({
        token: tokenForUser(req.user)
    });
}