import StallBooking from "../models/Stallmodel.js";

// Self-registration
export const createBooking = async (req, res) => {
  try {
    const data = req.body;
    
    // Set registration metadata
    data.registrationType = "self_registration";
    data.createdBy = "self";
    data.updatedBy = "self";
    data.status = "pending"; // Default status for self-registration

    const booking = new StallBooking(data);
    await booking.save();
    
    res.status(201).json({
      success: true,
      message: "Stall booking request submitted successfully",
      data: booking
    });
  } catch (error) {
    console.error("Create Booking Error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create booking",
      error: error.message
    });
  }
};

// Get all bookings (Admin)
export const getBookings = async (req, res) => {
  try {
    const filters = req.query || {};
    const bookings = await StallBooking.find(filters)
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error("Get Bookings Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await StallBooking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error("Get Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message
    });
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Only include fields that are allowed to be updated
    const allowedUpdates = [
      'stallType', 'stallNumber', 'eventId', 'status',
      'companyName', 'contactPerson', 'email', 'phone',
      'address', 'city', 'state', 'country', 'postalCode',
      'boothSize', 'additionalRequirements', 'paymentStatus'
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
    const updatedBooking = await StallBooking.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    
    res.json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking
    });
  } catch (error) {
    console.error("Update Booking Error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update booking",
      error: error.message
    });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await StallBooking.findOneAndDelete({
      _id: req.params.id,
      ...(req.user ? { createdBy: req.user.userId } : {}) // Only allow creator to delete
    });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or you don't have permission to delete it"
      });
    }
    
    res.json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: error.message
    });
  }
};
