import Visitor from "../models/Visitormodel.js";

export const createVisitor12 = async (req, res) => {
  console.log(req.user);
}

// CREATE Visitor
export const createVisitor = async (req, res) => {
  
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

    const visitor = new Visitor({
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

    await visitor.save();

    res.status(201).json({
      success: true,
      message: "Visitor registered successfully",
      visitor,
    });
  } catch (err) {
    console.error("Error creating visitor:", err);
    res.status(500).json({ success: false, message: "Failed to register visitor" });
  }
};

// GET all visitors (with filters)
export const getVisitors = async (req, res) => {
  try {
    const filters = {};
    if (req.query.eventId) filters.eventId = req.query.eventId;
    if (req.query.status) filters.status = req.query.status;

    const visitors = await Visitor.find(filters)
      .populate("eventId", "eventName city")
      .sort({ createdAt: -1 });

    res.json({ success: true, visitors });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch visitors" });
  }
};

// GET single visitor
export const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id).populate(
      "eventId",
      "eventName city"
    );

    if (!visitor) {
      return res.status(404).json({ success: false, message: "Visitor not found" });
    }

    res.json({ success: true, visitor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch visitor" });
  }
};

// UPDATE Visitor
export const updateVisitor = async (req, res) => {
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
    const updatedVisitor = await Visitor.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!updatedVisitor) {
      return res.status(404).json({ 
        success: false, 
        message: "Visitor not found" 
      });
    }
    
    res.json({ 
      success: true, 
      message: "Visitor updated successfully", 
      data: updatedVisitor 
    });
  } catch (error) {
    console.error("Update Visitor Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update visitor",
      error: error.message 
    });
  }
};

// DELETE Visitor
export const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);

    if (!visitor) {
      return res.status(404).json({ success: false, message: "Visitor not found" });
    }

    res.json({ success: true, message: "Visitor deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete visitor" });
  }
};

// Check-in Visitor
export const checkInVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });

    visitor.checkInTime = new Date();
    await visitor.save();
    res.json({ message: "Visitor checked in", visitor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check-out Visitor
export const checkOutVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });

    if (!visitor.checkInTime)
      return res.status(400).json({ message: "Visitor has not checked in yet" });

    visitor.checkOutTime = new Date();
    await visitor.save();
    res.json({ message: "Visitor checked out", visitor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
