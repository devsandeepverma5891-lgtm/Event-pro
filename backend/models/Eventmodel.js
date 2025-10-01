import mongoose from "mongoose";
import slugify from "slugify";

export const EVENT_TYPES = ["Exhibition", "Awards", "Conference", "Workshop", "Other"];

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "Event Name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    eventTypes: [
      {
        type: String,
        enum: EVENT_TYPES,
        required: true,
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    startDateTime: {
      type: Date,
      required: [true, "Start date & time is required"],
    },
    endDateTime: {
      type: Date,
      required: [true, "End date & time is required"],
    },
    venue: {
      type: String,
      trim: true,
    },
    bannerImage: {
      type: String, // Store image URL or path
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Draft", "Completed"],
      default: "Draft"
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
  },
  {
    timestamps: true,
  }
);

// 🔹 Pre-save middleware to auto-generate slug
EventSchema.pre("save", function (next) {
  if (this.isModified("eventName")) {
    this.slug = slugify(this.eventName, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Event", EventSchema);
