import mongoose from "mongoose";

const AwardeeSchema = new mongoose.Schema(
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
      required: false,
      trim: true,
      lowercase: true,
      default: function() {
        // Generate a default email if not provided
        return `awardee-${Date.now()}@example.com`;
      },
      validate: {
        validator: function(v) {
          // Only validate if email is provided
          if (!v) return true;
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },

    mobileNumber: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: (v) => /^[\+]?[1-9][\d]{0,15}$/.test(v),
        message: "Please enter a valid mobile number",
      },
    },

    // Professional Info
    designation: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    organization: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    // Award Info
    awardCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AwardCategory",
      required: false,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
      default: null
    },

    // Status
    status: {
      type: String,
      enum: ["nominated", "shortlisted", "winner", "rejected"],
      default: "nominated",
    },

    // Registration Metadata
    registrationType: {
      type: String,
      enum: ["self_nomination", "admin_nomination"],
      default: "admin_nomination",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Additional Info
    bio: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    photo: {
      type: String,
      trim: true,
    },

    socialLinks: {
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      website: { type: String, trim: true },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add text index for search
AwardeeSchema.index(
  { fullName: "text", email: "text", organization: "text" },
  { weights: { fullName: 3, organization: 2, email: 1 } }
);

// Virtual for award details
AwardeeSchema.virtual("awardDetails", {
  ref: "AwardCategory",
  localField: "awardCategory",
  foreignField: "_id",
  justOne: true,
});

// Virtual for event details
AwardeeSchema.virtual("eventDetails", {
  ref: "Event",
  localField: "eventId",
  foreignField: "_id",
  justOne: true,
});

const Awardee = mongoose.model("Awardee", AwardeeSchema);

export default Awardee;
