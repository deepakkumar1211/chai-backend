import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username : {
            type: String,
            required : true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // it is used for easy searching
        },
        email : {
            type: String,
            required : true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName : {
            type: String,
            required : true, 
            trim: true,
            index: true
        },
        avatar : {
            type: String, // cloudnery url
            required : true,
        },
        coverImage : {
            type: String, // cloudnery url
        },
        watchHistory : [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshTokens: {
            type: String,
        }

    }, {timestamps: true})


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    await bcrypt.compare(password, this.password) // isme password user bhejega vo hai & this.password encrypted password hai.
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.userSchema,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,  // refresh token ke liye jada kuch nhi lagta hai
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_REFRESH_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)