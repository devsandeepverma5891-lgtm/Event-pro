import AwardeeVip from "../models/AwardeeVipmodel.js";

// CREATE AwardeeVip
export const createAwardeeVip = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      workingProfessional,
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

    const awardeeVip = new AwardeeVip({
      fullName,
      email,
      mobileNumber,
      workingProfessional,
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
      registrationType,
      createdBy,
      createdByRole,
    });

    await awardeeVip.save();

    res.status(201).json({
      success: true,
      message: "Awardee VIP registered successfully",
      awardeeVip,
    });
  } catch (err) {
    console.error("Error creating Awardee VIP:", err);
    res.status(500).json({ success: false, message: "Failed to register Awardee VIP" });
  }
};

// GET all Awardees VIP
export const getAwardeesVip = async (req, res) => {
  try {
    const filters = {};
    if (req.query.eventId) filters.eventId = req.query.eventId;
    if (req.query.status) filters.status = req.query.status;

    const awardees = await AwardeeVip.find(filters)
      .populate("eventId", "eventName city")
      .sort({ createdAt: -1 });

    res.json({ success: true, awardees });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch Awardee VIPs" });
  }
};

// GET single Awardee VIP
export const getAwardeeByIdVip = async (req, res) => {
  try {
    const awardeeVip = await AwardeeVip.findById(req.params.id).populate("eventId", "eventName city");

    if (!awardeeVip) {
      return res.status(404).json({ success: false, message: "Awardee VIP not found" });
    }

    res.json({ success: true, awardeeVip });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch Awardee VIP" });
  }
};

// UPDATE Awardee VIP
export const updateAwardeeVip = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const allowedUpdates = [
      "fullName",
      "email",
      "mobileNumber",
      "workingProfessional",
      "organizationName",
      "designation",
      "address",
      "city",
      "state",
      "pincode",
      "eventId",
      "notes",
      "priority",
      "tags",
      "status",
    ];

    const updates = {};
    Object.keys(updateData).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });

    if (req.user && (req.user.userRole === "admin" || req.user.userRole === "event_manager")) {
      updates.updatedBy = req.user.userId;
    }

    const updatedAwardee = await AwardeeVip.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedAwardee) {
      return res.status(404).json({
        success: false,
        message: "Awardee VIP not found",
      });
    }

    res.json({
      success: true,
      message: "Awardee VIP updated successfully",
      data: updatedAwardee,
    });
  } catch (error) {
    console.error("Update Awardee VIP Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Awardee VIP",
      error: error.message,
    });
  }
};

// DELETE Awardee VIP
export const deleteAwardeeVip = async (req, res) => {
  try {
    const awardeeVip = await AwardeeVip.findByIdAndDelete(req.params.id);

    if (!awardeeVip) {
      return res.status(404).json({ success: false, message: "Awardee VIP not found" });
    }

    res.json({ success: true, message: "Awardee VIP deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete Awardee VIP" });
  }
};

// Check-in Awardee VIP
export const checkInAwardeeVip = async (req, res) => {
  try {
    const awardeeVip = await AwardeeVip.findById(req.params.id);
    if (!awardeeVip) return res.status(404).json({ message: "Awardee VIP not found" });

    awardeeVip.checkInTime = new Date();
    await awardeeVip.save();
    res.json({ message: "Awardee VIP checked in", awardeeVip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check-out Awardee VIP
export const checkOutAwardeeVip = async (req, res) => {
  try {
    const awardeeVip = await AwardeeVip.findById(req.params.id);
    if (!awardeeVip) return res.status(404).json({ message: "Awardee VIP not found" });

    if (!awardeeVip.checkInTime)
      return res.status(400).json({ message: "Awardee VIP has not checked in yet" });

    awardeeVip.checkOutTime = new Date();
    await awardeeVip.save();
    res.json({ message: "Awardee VIP checked out", awardeeVip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
