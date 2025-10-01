import mongoose from "mongoose";

const AwardNominationSchema = new mongoose.Schema({
  // Basic nominee info
  nomineeName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  // mobileNumber: {
  //   type: String,
  //   required: false,
  //   trim: true,
  //   maxlength: 15,
  //   validate: {
  //     validator: function(v) {
  //       return /^[\+]?[1-9][\d]{0,15}$/.test(v);
  //     },
  //     message: "Please enter a valid mobile number"
  //   }
  // },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  organizationName: {
    type: String,
    trim: true,
    maxlength: 200
  },

  // Award/Event reference
  // awardCategory: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "AwardCategory",
  //   required: false
  // },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  // Registration type
  registrationType: {
    type: String,
    enum: ["self_nomination", "admin_nomination"],
    default: "self_nomination"
  },

  // Status & attendance
  status: {
    type: String,
    enum: ["submitted", "under_review", "approved", "winner"],
    default: "submitted"
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },

  // Metadata
  nominatedBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String,
    email: String,
    role: String
  }
}, {
  timestamps: true
});

// Indexes for fast queries
AwardNominationSchema.index({ eventId: 1, awardCategory: 1 });
AwardNominationSchema.index({ status: 1 });
AwardNominationSchema.index({ mobileNumber: 1 });

export default mongoose.model("AwardNomination", AwardNominationSchema);
