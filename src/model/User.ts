import mongoose, {Schema, Document} from 'mongoose';


export interface Message extends Document{
    content: string;
    createdAt: Date;
}
//Message schema definition
//This schema defines the structure of a Message document in MongoDB using Mongoose
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpires: Date;
    isVerified?: boolean; // Optional field for verification status
    isAcceptingMessage: boolean;
    messages: Message[];
}
//User schema definition
//This schema defines the structure of a User document in MongoDB using Mongoose
const UserSchema: Schema<User> = new Schema({
    username: {
       type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "password is required"],
        
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpires: {
        type: Date,
        required: [true, "Verify code expiry is required"]
    },

    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
});

// Create the User model using the UserSchema
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;
