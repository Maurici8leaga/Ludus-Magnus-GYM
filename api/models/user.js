const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birth:{
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'picture'
    }
});

// Saving the user and encrypt it for sign up
userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next();
        });
    });
});

// decrypt user for login
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
}

const ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;