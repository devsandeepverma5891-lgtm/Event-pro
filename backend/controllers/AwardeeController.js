import mongoose from "mongoose";
import Awardee from "../models/Awardeemodel.js";


// Create Awardee (Admin)
export const createAwardee = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Set createdBy and updatedBy from authenticated user or use default
    data.createdBy = req.user?.userId || new mongoose.Types.ObjectId();
    data.updatedBy = req.user?.userId || new mongoose.Types.ObjectId();
    
    // Set default values
    data.status = data.status || "nominated";
    data.registrationType = data.registrationType || "admin_nomination";
    
    // Ensure required fields have values
    if (!data.fullName) {
      return res.status(400).json({
        success: false,
        message: 'Full name is required',
        field: 'fullName'
      });
    }

    // Create awardee with only the fields defined in the schema
    const awardeeData = {
      fullName: data.fullName,
      email: data.email || `${Date.now()}@example.com`, // Provide a default email if not provided
      mobileNumber: data.mobileNumber || '',
      designation: data.designation || '',
      organization: data.organization || '',
      awardCategory: data.awardCategory || null,
      eventId: data.eventId || null,
      status: data.status || 'nominated',
      registrationType: data.registrationType || 'admin_nomination',
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      bio: data.bio || '',
      photo: data.photo || '',
      socialLinks: data.socialLinks || {},
      isActive: data.isActive !== undefined ? data.isActive : true
    };

    const awardee = new Awardee(awardeeData);
    await awardee.save();

    // Remove sensitive/technical fields from response
    const awardeeResponse = awardee.toObject();
    delete awardeeResponse.__v;
    
    res.status(201).json({
      success: true,
      message: "Awardee created successfully",
      data: awardeeResponse
    });
    
  } catch (error) {
    console.error("Create Awardee Error:", error);
    
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
        message: 'An awardee with this email or mobile number already exists',
        error: 'Duplicate entry'
      });
    }
    
    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Failed to create awardee",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all awardees with filters
export const getAwardees = async (req, res) => {
  try {
    const { status, awardCategory, eventId, search, page = 1, limit = 10 } = req.query;
    const query = {};
    
    // Apply filters
    if (status) query.status = status;
    if (awardCategory) query.awardCategory = awardCategory;
    if (eventId) query.eventId = eventId;
    
    // Apply search
    if (search) {
      query.$text = { $search: search };
    }
    
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: ['awardCategory', 'eventId', 'createdBy', 'updatedBy'],
      select: '-__v'
    };
    
    const awardees = await Awardee.paginate(query, options);
    
    res.json({
      success: true,
      ...awardees
    });
    
  } catch (error) {
    console.error("Get Awardees Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch awardees",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get awardee by ID
export const getAwardeeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid awardee ID',
        error: 'The provided ID is not valid'
      });
    }
    
    const awardee = await Awardee.findById(id)
      .populate('awardCategory', 'name description')
      .populate('eventId', 'eventName startDate endDate')
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .select('-__v');
    
    if (!awardee) {
      return res.status(404).json({
        success: false,
        message: 'Awardee not found'
      });
    }
    
    res.json({
      success: true,
      data: awardee
    });
    
  } catch (error) {
    console.error("Get Awardee Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch awardee",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Update awardee
export const updateAwardee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid awardee ID',
        error: 'The provided ID is not valid'
      });
    }
    
    // Fields that can be updated
    const allowedUpdates = [
      'fullName', 'email', 'mobileNumber', 'designation', 'organization',
      'awardCategory', 'status', 'bio', 'photo', 'socialLinks', 'isActive'
    ];
    
    const updates = {};
    
    // Filter and format the updates
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });
    
    // Add updatedBy
    updates.updatedBy = req.user.userId;
    
    const updatedAwardee = await Awardee.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    )
    .select('-__v');
    
    if (!updatedAwardee) {
      return res.status(404).json({
        success: false,
        message: 'Awardee not found or you do not have permission to update this awardee'
      });
    }
    
    res.json({
      success: true,
      message: 'Awardee updated successfully',
      data: updatedAwardee
    });
    
  } catch (error) {
    console.error("Update Awardee Error:", error);
    
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
    
    res.status(500).json({
      success: false,
      message: "Failed to update awardee",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Delete awardee
export const deleteAwardee = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid awardee ID',
        error: 'The provided ID is not valid'
      });
    }
    
    const deletedAwardee = await Awardee.findByIdAndDelete(id);
    
    if (!deletedAwardee) {
      return res.status(404).json({
        success: false,
        message: 'Awardee not found or already deleted'
      });
    }
    
    res.json({
      success: true,
      message: 'Awardee deleted successfully'
    });
    
  } catch (error) {
    console.error("Delete Awardee Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete awardee",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};
