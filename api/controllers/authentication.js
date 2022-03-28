const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
    res.send({ token: tokenForUser(req.user), user: req.user});
}

exports.signup = function (req, res, next) {

    const { email, password, name, lastname, birth, height, sex, weight } = req.body;

    if (!sex) {
        return res.status(422).send({ error: { msg: 'You have to specify your gender' } })
    }

    if (!birth) {
        return res.status(422).send({ error: { msg: 'You have to put your date of birth' } })
    }

    if (!height || !weight) {
        return res.status(422).send({ error: { msg: 'You have to put your weight and height.' } })
    }

    if (!name || !lastname) {
        return res.status(422).send({ error: { msg: 'You have to put your first and last name' } })
    }

    if (!email || !password) {
        return res.status(422).send({ error: { msg: 'You have to put your email and password' } });
    }

    // check if the user already exists
    User.findOne({ email }, function (err, existingUser) {
        if (err) { return next(err) }

        if (existingUser) {
            return res.status(422).send({ error: { msg: 'This email already exists' } });
        }

        const user = new User({
            email,
            password,
            name,
            lastname,
            birth,
            height,
            weight,
            sex
        });

        // creating a new user
        user.save(function (err) {
            if (err) { 
                return next(err);
            }else {                
                res.json({ token: tokenForUser(user), user: user , msg: 'User created, Welcome to the club' });
            }
        });
    });
}