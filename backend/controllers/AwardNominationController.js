import AwardNomination from "../models/AwardNomineemodel.js";
import mongoose from "mongoose";


// Create nomination (Self-registration / Admin)
export const createNomination = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Validate required fields
    const requiredFields = ['nomineeName', 'eventId'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields,
        error: `The following fields are required: ${missingFields.join(', ')}`
      });
    }
    
    // Validate awardCategory is a valid ObjectId if provided
    if (data.awardCategory && !mongoose.Types.ObjectId.isValid(data.awardCategory)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid award category ID',
        field: 'awardCategory',
        error: 'The award category must be a valid ID'
      });
    }
    
    // Validate eventId is a valid ObjectId if provided
    if (data.eventId && !mongoose.Types.ObjectId.isValid(data.eventId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID',
        field: 'eventId',
        error: 'The event ID must be a valid ID'
      });
    }
    
    // Set registration metadata
    if (req.user) {
      // Admin/Manager creating nomination
      data.registrationType = "admin_nomination";
      data.createdBy = req.user.userId;
      data.updatedBy = req.user.userId;
      data.status = data.status || "approved";
    } else {
      // Self-registration
      data.registrationType = "self_nomination";
      data.createdBy = "self";
      data.updatedBy = "self";
      data.status = "pending"; // Default status for self-nomination
    }

    const nomination = new AwardNomination(data);
    await nomination.save();
    
    // Remove sensitive/technical fields from response
    const nominationResponse = nomination.toObject();
    delete nominationResponse.__v;
    
    res.status(201).json({
      success: true,
      message: "Nomination submitted successfully",
      data: nominationResponse
    });
  } catch (error) {
    console.error("Create Nomination Error:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A nomination with these details already exists',
        error: 'Duplicate entry'
      });
    }
    
    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Failed to create nomination",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all nominations (Admin)
export const getNominations = async (req, res) => {
  try {
    const filters = req.query || {};
    const nominations = await AwardNomination.find(filters)
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: nominations.length,
      data: nominations
    });
  } catch (error) {
    console.error("Get Nominations Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch nominations",
      error: error.message
    });
  }
};

// Get nomination by ID
export const getNominationById = async (req, res) => {
  try {
    const nomination = await AwardNomination.findById(req.params.id);
    
    if (!nomination) {
      return res.status(404).json({
        success: false,
        message: "Nomination not found"
      });
    }
    
    res.json({
      success: true,
      data: nomination
    });
  } catch (error) {
    console.error("Get Nomination Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch nomination",
      error: error.message
    });
  }
};

// Update nomination
export const updateNomination = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Only include fields that are allowed to be updated
    const allowedUpdates = [
      'nomineeName', 'category', 'eventId', 'description',
      'contactEmail', 'contactPhone', 'status', 'awarded',
      'additionalInfo', 'documents'
    ];
    
    const updates = {};
    
    // Filter the updates
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });
    
    // Add updatedBy if user is authenticated
    if (req.user) {
      updates.updatedBy = req.user.userId;
    } else {
      updates.updatedBy = 'system';
    }
    
    // Find and update in one operation with validation
    const updatedNomination = await AwardNomination.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!updatedNomination) {
      return res.status(404).json({
        success: false,
        message: "Nomination not found"
      });
    }
    
    res.json({
      success: true,
      message: "Nomination updated successfully",
      data: updatedNomination
    });
  } catch (error) {
    console.error("Update Nomination Error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update nomination",
      error: error.message
    });
  }
};

// Delete nomination
export const deleteNomination = async (req, res) => {
  try {
    const conditions = { _id: req.params.id };
    
    // If not admin, only allow deletion by creator
    if (req.user?.userRole !== 'admin') {
      conditions.createdBy = req.user?.userId || 'self';
    }
    
    const nomination = await AwardNomination.findOneAndDelete(conditions);
    
    if (!nomination) {
      return res.status(404).json({
        success: false,
        message: "Nomination not found or you don't have permission to delete it"
      });
    }
    
    res.json({
      success: true,
      message: "Nomination deleted successfully"
    });
  } catch (error) {
    console.error("Delete Nomination Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete nomination",
      error: error.message
    });
  }
};

// Check-in nominee
export const checkInNominee = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedNomination = await AwardNomination.findOneAndUpdate(
      { 
        _id: id,
        checkInTime: { $exists: false } // Only if not already checked in
      },
      { 
        $set: { 
          checkInTime: new Date(),
          updatedBy: req.user?.userId || 'system'
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedNomination) {
      return res.status(400).json({
        success: false,
        message: "Nominee not found or already checked in"
      });
    }
    
    res.json({
      success: true,
      message: "Nominee checked in successfully",
      data: updatedNomination
    });
  } catch (error) {
    console.error("Check-in Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check in nominee",
      error: error.message
    });
  }
};

// Check-out nominee
export const checkOutNominee = async (req, res) => {
  try {
    const { id } = req.params;
    
    const updatedNomination = await AwardNomination.findOneAndUpdate(
      { 
        _id: id,
        checkInTime: { $exists: true }, // Must be checked in
        checkOutTime: { $exists: false } // Not already checked out
      },
      { 
        $set: { 
          checkOutTime: new Date(),
          updatedBy: req.user?.userId || 'system'
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedNomination) {
      return res.status(400).json({
        success: false,
        message: "Nominee not found, not checked in, or already checked out"
      });
    }
    
    res.json({
      success: true,
      message: "Nominee checked out successfully",
      data: updatedNomination
    });
  } catch (error) {
    console.error("Check-out Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check out nominee",
      error: error.message
    });
  }
};
