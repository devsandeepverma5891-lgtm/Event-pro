import EventModel from "../models/Eventmodel.js";

// CREATE Event
export const createEvent = async (req, res) => {
  try {
    const event = new EventModel({
      eventName: req.body.eventName,
      city: req.body.city,
      status: req.body.status||'Active',
      eventTypes: req.body.eventTypes,
      description: req.body.description,
      startDateTime: new Date(req.body.startDateTime),
      endDateTime: new Date(req.body.endDateTime),
      venue: req.body.venue,
      bannerImage: req.body.bannerImage,
      createdBy: req.user?.userId, // from auth middleware
    });

    const savedEvent = await event.save();

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: savedEvent,
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

// READ All Events
export const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const events = await EventModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await EventModel.countDocuments({});

    return res.status(200).json({
      success: true,
      data: events,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit,
        total,
      },
    });
  } catch (error) {
    console.error("Get Events Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

// READ Single Event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id).populate("createdBy", "username email");
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    return res.json({ success: true, data: event });
  } catch (error) {
    console.error("Get Event Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

// UPDATE Event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if ID is provided and valid
    if (!id || id === 'undefined') {
      return res.status(400).json({
        success: false,
        message: 'Event ID is required and must be valid',
        field: 'id'
      });
    }

    const updateData = { ...req.body };
    
    // Only include fields that are allowed to be updated
    const allowedUpdates = ['eventName', 'city', 'eventTypes', 'description', 'startDateTime', 'endDateTime', 'venue', 'bannerImage'];
    const updates = {};
    
    // Filter and format the updates
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        // Handle date fields
        if (key === 'startDateTime' || key === 'endDateTime') {
          updates[key] = updateData[key] ? new Date(updateData[key]) : null;
        } else {
          updates[key] = updateData[key];
        }
      }
    });
    
    // Add updatedBy
    updates.updatedBy = req.user.userId;
    
    // Find and update in one operation with validation
    const updatedEvent = await EventModel.findOneAndUpdate(
      { _id: id, createdBy: req.user.userId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).json({ 
        success: false, 
        message: "Event not found or you don't have permission to update this event" 
      });
    }

    return res.json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Update Event Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};

// DELETE Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Only creator can delete
    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    return res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};
