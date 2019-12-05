const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    saltRounds = 10;

const UserSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: [Object],
        required: false,
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = async function (candidatePassword, hash) {
    async function main() {
        const isTrue = bcrypt.compareSync(candidatePassword, hash)
        return await isTrue
    }
    return await main()
};


const User = mongoose.model("User", UserSchema);

module.exports = User;