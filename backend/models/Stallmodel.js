import mongoose from "mongoose";

const StallBookingSchema = new mongoose.Schema({
  // Basic company info
  companyName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  contactPersonName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: "Please enter a valid mobile number"
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },

  // Event reference
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  // Registration type
  bookingType: {
    type: String,
    enum: ["self_booking", "admin_booking"],
    default: "self_booking"
  },

  // Stall info
  stallNumber: String,
  stallType: {
    type: String,
    enum: ["standard", "premium", "corner", "double", "custom"],
    default: "standard"
  },
  stallSize: {
    width: Number,
    length: Number,
    unit: { type: String, enum: ["feet", "meters"], default: "feet" }
  },

  // Status & payment
  status: {
    type: String,
    enum: ["pending", "confirmed", "active", "completed", "cancelled"],
    default: "pending"
  },
  paymentStatus: {
    type: String,
    enum: ["unpaid", "partial", "paid", "refunded"],
    default: "unpaid"
  },

  // Metadata
  bookedBy: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    email: String,
    role: String
  },

}, { timestamps: true });

// Indexes
StallBookingSchema.index({ eventId: 1, bookingType: 1 });
StallBookingSchema.index({ mobileNumber: 1 });
StallBookingSchema.index({ stallNumber: 1, eventId: 1 }, { unique: true, sparse: true });

export default mongoose.model("StallBooking", StallBookingSchema);
