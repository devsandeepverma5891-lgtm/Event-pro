import mongoose from "mongoose";

const SponsorSchema = new mongoose.Schema(
  {
    // Basic Sponsor Info
    organizationName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    organizationType: {
      type: String,
      enum: ["corporate", "startup", "ngo", "government", "individual", "other"],
      default: "corporate",
    },

    industryType: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    website: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return (
            !v ||
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
              v
            )
          );
        },
        message: "Please enter a valid URL",
      },
    },

    // Contact Person Info
    contactPersonName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    designation: {
      type: String,
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

    alternatePhone: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^[\+]?[1-9][\d]{0,15}$/.test(v);
        },
        message: "Please enter a valid phone number",
      },
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
          return !v || /^[0-9]{6}$/.test(v);
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

    // Sponsorship Details
    sponsorshipTier: {
      type: String,
      enum: [
        "title",
        "platinum",
        "gold",
        "silver",
        "bronze",
        "associate",
        "custom",
      ],
      default: "bronze",
    },

    sponsorshipAmount: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
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
      type: String, // "self", "admin", "event_manager"
      required: true,
    },

    status: {
      type: String,
      default: "pending",
      enum: [
        "pending",
        "approved",
        "rejected",
        "active",
        "completed",
        "cancelled",
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

    // Payment Info
    paymentStatus: {
      type: String,
      default: "unpaid",
      enum: ["unpaid", "partial", "paid", "refunded"],
    },

    amountPaid: {
      type: Number,
      default: 0,
    },

    balanceAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for performance
SponsorSchema.index({ eventId: 1, createdAt: -1 });
SponsorSchema.index({ mobileNumber: 1, eventId: 1 }, { unique: true });
SponsorSchema.index({ organizationName: "text" });

// Pre-save hook to calculate balance
SponsorSchema.pre("save", function (next) {
  this.balanceAmount =
    (this.sponsorshipAmount || 0) - (this.amountPaid || 0);
  next();
});

export default mongoose.model("Sponsor", SponsorSchema);
