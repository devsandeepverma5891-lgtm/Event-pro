import Speaker from "../models/Speakermodel.js";

// CREATE Speaker
export const createSpeaker = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      organizationName,
      designation,
      address,
      city,
      state,
      pincode,
      eventId,
      notes,
      priority,
      tags,
      topic,
      bio,
      sessionTime,
    } = req.body;

    let registrationType, createdBy, createdByRole;

    if (req.user) {
      registrationType = "admin_registration";
      createdBy = req.user.userId;
      createdByRole = req.user.userRole;
    } else {
      registrationType = "self_registration";
      createdBy = "self";
      createdByRole = "self";
    }

    const speaker = new Speaker({
      fullName,
      email,
      mobileNumber,
      organizationName,
      designation,
      address,
      city,
      state,
      pincode,
      eventId,
      notes,
      priority,
      tags,
      topic,
      bio,
      sessionTime,
      registrationType,
      createdBy,
      createdByRole,
    });

    await speaker.save();

    res.status(201).json({
      success: true,
      message: "Speaker registered successfully",
      speaker,
    });
  } catch (err) {
    console.error("Error creating speaker:", err);
    res.status(500).json({ success: false, message: "Failed to register speaker" });
  }
};

// GET all speakers
export const getSpeakers = async (req, res) => {
  try {
    const filters = {};
    if (req.query.eventId) filters.eventId = req.query.eventId;
    if (req.query.status) filters.status = req.query.status;

    const speakers = await Speaker.find(filters)
      .populate("eventId", "eventName city")
      .sort({ createdAt: -1 });

    res.json({ success: true, speakers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch speakers" });
  }
};

// GET single speaker
export const getSpeakerById = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id).populate(
      "eventId",
      "eventName city"
    );

    if (!speaker) {
      return res.status(404).json({ success: false, message: "Speaker not found" });
    }

    res.json({ success: true, speaker });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch speaker" });
  }
};

// UPDATE Speaker
export const updateSpeaker = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const allowedUpdates = [
      "fullName", "email", "mobileNumber", "organizationName", "designation",
      "address", "city", "state", "pincode", "eventId", "notes",
      "priority", "tags", "status", "topic", "bio", "sessionTime"
    ];

    const updates = {};
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });

    if (req.user && (req.user.userRole === "admin" || req.user.userRole === "event_manager")) {
      updates.updatedBy = req.user.userId;
    }

    const updatedSpeaker = await Speaker.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedSpeaker) {
      return res.status(404).json({ success: false, message: "Speaker not found" });
    }

    res.json({
      success: true,
      message: "Speaker updated successfully",
      data: updatedSpeaker,
    });
  } catch (error) {
    console.error("Update Speaker Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update speaker",
      error: error.message,
    });
  }
};

// DELETE Speaker
export const deleteSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);

    if (!speaker) {
      return res.status(404).json({ success: false, message: "Speaker not found" });
    }

    res.json({ success: true, message: "Speaker deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete speaker" });
  }
};

// Check-in Speaker
export const checkInSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    if (!speaker) return res.status(404).json({ message: "Speaker not found" });

    speaker.checkInTime = new Date();
    await speaker.save();
    res.json({ message: "Speaker checked in", speaker });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check-out Speaker
export const checkOutSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    if (!speaker) return res.status(404).json({ message: "Speaker not found" });

    if (!speaker.checkInTime)
      return res.status(400).json({ message: "Speaker has not checked in yet" });

    speaker.checkOutTime = new Date();
    await speaker.save();
    res.json({ message: "Speaker checked out", speaker });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
