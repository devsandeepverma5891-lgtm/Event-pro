import Guest from "../models/Guestmodel.js";

// CREATE Guest (for logging purpose)
export const createGuest12 = async (req, res) => {
  console.log(req.user);
}

// CREATE Guest
export const createGuest = async (req, res) => {
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

    // Decide registration type
    let registrationType, createdBy, createdByRole;

    if (req.user) {
      // User is logged in → admin/event_manager/team
      registrationType = "admin_registration";
      createdBy = req.user.userId;
      createdByRole = req.user.userRole;
    } else {
      // Self registration
      registrationType = "self_registration";
      createdBy = "self";
      createdByRole = "self";
    }

    const guest = new Guest({
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

    await guest.save();

    res.status(201).json({
      success: true,
      message: "Guest registered successfully",
      guest,
    });
  } catch (err) {
    console.error("Error creating guest:", err);
    res.status(500).json({ success: false, message: "Failed to register guest" });
  }
};

// GET all guests (with filters)
export const getGuests = async (req, res) => {
  try {
    const filters = {};
    if (req.query.eventId) filters.eventId = req.query.eventId;
    if (req.query.status) filters.status = req.query.status;

    const guests = await Guest.find(filters)
      .populate("eventId", "eventName city")
      .sort({ createdAt: -1 });

    res.json({ success: true, guests });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch guests" });
  }
};

// GET single guest
export const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id).populate(
      "eventId",
      "eventName city"
    );

    if (!guest) {
      return res.status(404).json({ success: false, message: "Guest not found" });
    }

    res.json({ success: true, guest });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch guest" });
  }
};

// UPDATE Guest
export const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Only include fields that are allowed to be updated
    const allowedUpdates = [
      'fullName', 'email', 'mobileNumber', 'workingProfessional', 
      'organizationName', 'designation', 'address', 'city', 'state', 
      'pincode', 'eventId', 'notes', 'priority', 'tags', 'status'
    ];
    
    const updates = {};
    
    // Filter the updates
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });
    
    // If user is admin/manager, they can update more fields
    if (req.user && (req.user.userRole === 'admin' || req.user.userRole === 'event_manager')) {
      updates.updatedBy = req.user.userId;
    }
    
    // Find and update in one operation with validation
    const updatedGuest = await Guest.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!updatedGuest) {
      return res.status(404).json({ 
        success: false, 
        message: "Guest not found" 
      });
    }
    
    res.json({ 
      success: true, 
      message: "Guest updated successfully", 
      data: updatedGuest 
    });
  } catch (error) {
    console.error("Update Guest Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update guest",
      error: error.message 
    });
  }
};

// DELETE Guest
export const deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);

    if (!guest) {
      return res.status(404).json({ success: false, message: "Guest not found" });
    }

    res.json({ success: true, message: "Guest deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete guest" });
  }
};

// Check-in Guest
export const checkInGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });

    guest.checkInTime = new Date();
    await guest.save();
    res.json({ message: "Guest checked in", guest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check-out Guest
export const checkOutGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });

    if (!guest.checkInTime)
      return res.status(400).json({ message: "Guest has not checked in yet" });

    guest.checkOutTime = new Date();
    await guest.save();
    res.json({ message: "Guest checked out", guest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
