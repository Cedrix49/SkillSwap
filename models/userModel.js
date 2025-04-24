import mongoose from "mongoose";

//User schema
const userSchema = new mongoose.Schema({
    //User name
    name: {
        type: String,
        required: true,
    },
    //User email
    email: {
        type: String,
        required: true,
        unique: true,
    },
    //User password
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: '',
    },
    //User profile image
    avatarUrl: {
        type: String,
        default: '',
    },
    skillsToTeach: [{ type: String }],
    skillsToLearn: [{ type: String }],
    //User verify otp
    verifyOtp: {
        type: String,
        default: '',
    },
    //User verify otp expire at
    verifyOtpExpireAt: {
        type: Number,
        default: 0,
    },
    //User account verified
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    //User reset otp
    resetOtp: {
        type: String,
        default: '',
    },
    //User reset otp expire at
    resetOtpExpireAt: {
        type: Number,
        default: 0,
    },
})

//User model to create a collection in the database
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
