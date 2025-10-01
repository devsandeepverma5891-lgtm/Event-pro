import mongoose from "mongoose";

const SpeakerSchema = new mongoose.Schema(
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

    // Speaker Specific Fields
    topic: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    sessionTime: {
      type: Date, // event ke session ka time
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 2000, // short profile/bio
    },

    profileImage: {
      type: String, // URL of uploaded profile pic
    },

    // Address Info
    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
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

    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
SpeakerSchema.index({ eventId: 1, createdAt: -1 });
SpeakerSchema.index({ mobileNumber: 1, eventId: 1 }, { unique: true });

export default mongoose.model("Speaker", SpeakerSchema);
