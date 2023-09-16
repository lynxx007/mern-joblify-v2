import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName'
    },
    location: {
        type: String,
        default: 'My City'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('User', userSchema);

export default User