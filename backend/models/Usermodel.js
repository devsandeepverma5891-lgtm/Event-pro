import mongoose from 'mongoose';

export const USER_ROLES = [
	"admin",
	"event_manager",
	"visitor",
	"sponsor",
	"stall_owner",
	"award_applicant",
    "guest"
];

export const UserSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: [true, 'Please provide unique username'],
        unique: [true, 'Username already exists'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        unique: false,
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
    },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    refreshToken: { type: String },
    role: { type: String, enum: USER_ROLES, default: "guest" },
    },
	{ timestamps: true });

export default mongoose.model.Users || mongoose.model('users', UserSchema);