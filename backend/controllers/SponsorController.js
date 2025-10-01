import Sponsor from "../models/Sponsormodel.js";

// -------------------- Self-registration --------------------
export const selfRegister = async (req, res) => {
  try {
    const data = req.body;

    // Meta info for self registration
    data.registrationType = "self_registration";
    data.createdBy = "self";
    data.createdByRole = "sponsor";

    const sponsor = new Sponsor(data);
    await sponsor.save();

    res.status(201).json({ success: true, sponsor });
  } catch (error) {
    console.error("Self Register Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- Create Sponsor (Admin) --------------------
export const createSponsor = async (req, res) => {
  try {
    //const requiredFields = ['companyName', 'contactPerson', 'email', 'sponsorshipLevel'];
    const requiredFields = ['eventId'];
    const missingFields = [];
    
    // Check for required fields
    requiredFields.forEach(field => {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    });
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields,
        error: `The following fields are required: ${missingFields.join(', ')}`
      });
    }
    
    // Check if sponsor with same email already exists
    const existingSponsor = await Sponsor.findOne({ email: req.body.email });
    if (existingSponsor) {
      return res.status(409).json({
        success: false,
        message: 'A sponsor with this email already exists',
        field: 'email'
      });
    }
    
    const data = {
      ...req.body,
      registrationType: "admin_registration",
      createdBy: req.user.userId,
      createdByRole: req.user.userRole,
      updatedBy: req.user.userId,
      status: req.body.status || 'active' // Default status
    };

    const sponsor = new Sponsor(data);
    await sponsor.save();

    // Remove sensitive data from response
    const sponsorResponse = sponsor.toObject();
    delete sponsorResponse.__v;
    
    res.status(201).json({ 
      success: true, 
      message: "Sponsor created successfully",
      data: sponsorResponse
    });
    
  } catch (error) {
    console.error("Create Sponsor Error:", error);
    
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
        message: 'A sponsor with this email already exists',
        field: 'email'
      });
    }
    
    // Handle other errors
    res.status(500).json({ 
      success: false, 
      message: "Failed to create sponsor",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// -------------------- Get all sponsors --------------------
export const getAllSponsors = async (req, res) => {
  try {
    const filters = req.query || {};
    const sponsors = await Sponsor.find(filters).sort({ createdAt: -1 });

    res.json({ success: true, sponsors });
  } catch (error) {
    console.error("Get All Sponsors Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- Get sponsor by ID --------------------
export const getSponsorById = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);

    if (!sponsor) {
      return res
        .status(404)
        .json({ success: false, message: "Sponsor not found" });
    }

    res.json({ success: true, sponsor });
  } catch (error) {
    console.error("Get Sponsor By ID Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- Update Sponsor --------------------
export const updateSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Only include fields that are allowed to be updated
    const allowedUpdates = [
      'companyName', 'contactPerson', 'email', 'phone', 'website',
      'sponsorshipLevel', 'logo', 'description', 'address', 'city',
      'state', 'country', 'postalCode', 'status', 'notes'
    ];
    
    const updates = {};
    
    // Filter the updates
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });
    
    // Add updatedBy
    updates.updatedBy = req.user.userId;
    
    // Find and update in one operation with validation
    const updatedSponsor = await Sponsor.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!updatedSponsor) {
      return res.status(404).json({ 
        success: false, 
        message: "Sponsor not found" 
      });
    }
    
    res.json({ 
      success: true, 
      message: "Sponsor updated successfully",
      data: updatedSponsor 
    });
  } catch (error) {
    console.error("Update Sponsor Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update sponsor",
      error: error.message 
    });
  }
};

// -------------------- Delete sponsor --------------------
export const deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndDelete(req.params.id);

    if (!sponsor) {
      return res
        .status(404)
        .json({ success: false, message: "Sponsor not found" });
    }

    res.json({ success: true, message: "Sponsor deleted successfully" });
  } catch (error) {
    console.error("Delete Sponsor Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
