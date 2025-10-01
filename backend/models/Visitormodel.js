import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema(
  {
    // Basic Info
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },

    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[\+]?[1-9][\d]{0,15}$/.test(v);
        },
        message: "Please enter a valid mobile number",
      },
    },

    // Professional Info
    workingProfessional: {
      type: String,
      enum: ["Working Professional", "Business", "Student", "Others"],
      default: "Others",
    },

    organizationName: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    designation: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    // Address Info
    address: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    pincode: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^[0-9]{6}$/.test(v); // Indian pincode check
        },
        message: "Please enter a valid 6-digit pincode",
      },
    },

    // Event Reference
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    // Registration Info
    registrationType: {
      type: String,
      enum: ["self_registration", "admin_registration"],
      required: true,
    },

    createdBy: {
      type: String, // "self" ya userId
      required: true,
    },

    createdByRole: {
      type: String, // "self" ya "admin" / "event_manager" / "team_member"
      required: true,
    },

    status: {
      type: String,
      default: "pending",
      enum: [
        "pending",
        "approved",
        "rejected",
        "confirmed",
        "cancelled",
        "checked_in",
        "checked_out",
      ],
    },

    // Extra Metadata
    notes: {
      type: String,
      maxlength: 1000,
    },

    priority: {
      type: String,
      default: "normal",
      enum: ["low", "normal", "high", "vip"],
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // Attendance
    checkInTime: {
      type: Date,
    },

    checkOutTime: {
      type: Date,
    },

    duration: {
      type: Number, // minutes
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
VisitorSchema.index({ eventId: 1, createdAt: -1 });
VisitorSchema.index({ mobileNumber: 1, eventId: 1 }, { unique: true });

export default mongoose.model("Visitor", VisitorSchema);
