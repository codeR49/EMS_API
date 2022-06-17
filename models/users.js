const { timeStamp } = require('console');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        enum: ["Remote Engineer", "General Manager", "Director"],
        required: true
    },
    location: {
        type: String,
        enum: ["Coorg", "Hampi", "Kabini"]
    }
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

module.exports = mongoose.model('User', userSchema);