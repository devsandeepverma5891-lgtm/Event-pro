import React, { useState, useEffect } from "react";
import { apiPost, apiPut } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import CustomSelectBox from "../../components/CustomSelectBox";
import DateRangePicker from "../../components/DateRangePicker";
import Button from "../../utils/Button";
import { toast } from "react-toastify";

const initialState = {
  eventName: "",
  city: "",
  types: [],
  description: "",
  startDate: null,
  endDate: null,
  venue: "",
  banner: null,
};

const eventTypeOptions = ["Exhibition", "Awards", "Conference", "Workshop", "Other"].map(v => ({ value: v, label: v }));
const cityOptions = ["Delhi", "Mumbai", "Bangalore", "Other"];

const EventForm = ({ onClose, event }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const isEditing = !!event;

  // Populate form when editing
  useEffect(() => {
    if (event) {
      setForm({
        eventName: event.eventName || event.name || "",
        city: event.city || "",
        types: event.eventTypes || event.types || [],
        description: event.description || "",
        startDate: event.startDateTime || event.startDate || null,
        endDate: event.endDateTime || event.endDate || null,
        venue: event.venue || "",
        banner: null,
      });
    }
  }, [event]);

  const handleTypesChange = (nextValues) => {
    setForm((prev) => ({ ...prev, types: nextValues }));
  };

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventData = {
        eventName: form.eventName,
        city: form.city,
        eventTypes: form.types,
        description: form.description,
        startDateTime: form.startDate ? new Date(form.startDate).toISOString() : null,
        endDateTime: form.endDate ? new Date(form.endDate).toISOString() : null,
        venue: form.venue,
        bannerImage: form.banner,
      };

      let response;
      if (isEditing) {
        response = await apiPut(`/api/events/${event._id || event.id}`, eventData, token);
        toast.success("Event updated successfully!");
      } else {
        response = await apiPost("/api/events", eventData, token);
        toast.success("Event created successfully!");
      }

      setForm(initialState);

      setTimeout(() => {
        if (onClose) onClose();
      }, 1200);

    } catch (err) {
      toast.error(err.message || `Failed to ${isEditing ? "update" : "create"} event.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-700 bg-card text-card-foreground shadow-elevated mb-8 p-6 space-y-6 bg-gray-900 dark:bg-gray-100">
      <div className="flex flex-col space-y-1.5 mb-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {isEditing ? "Edit Event" : "Create New Event"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isEditing ? "Update the event details" : "Fill in the details to create a new event"}
        </p>
      </div>

      {/* Event Name + City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="eventName" className="text-sm font-medium">Event Name *</label>
          <input
            id="eventName"
            name="eventName"
            type="text"
            className="w-full h-11 px-3 rounded-md border border-gray-700 bg-gray-800 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            placeholder="Enter event name"
            value={form.eventName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">City *</label>
          <CustomSelectBox
            options={cityOptions.map(c => ({ value: c, label: c }))}
            value={form.city}
            onChange={(val) => setForm(prev => ({ ...prev, city: val }))}
            placeholder="Select city"
            variant="dark"
          />
        </div>
      </div>

      {/* Event Types */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Event Type (Select multiple)</label>
        <CustomSelectBox
          options={eventTypeOptions}
          value={form.types}
          onChange={handleTypesChange}
          placeholder="Select event types"
          multiple
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">Event Description</label>
        <textarea
          id="description"
          name="description"
          className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-sm text-gray-200 placeholder-gray-400 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          placeholder="Enter event description"
          rows={3}
          value={form.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Event Date & Time Range *</label>
        <DateRangePicker
          startDate={form.startDate}
          setStartDate={(d) => setForm((prev) => ({ ...prev, startDate: d }))}
          endDate={form.endDate}
          setEndDate={(d) => setForm((prev) => ({ ...prev, endDate: d }))}
        />
      </div>

      {/* Venue */}
      <div className="space-y-2">
        <label htmlFor="venue" className="text-sm font-medium">Event Venue</label>
        <input
          id="venue"
          name="venue"
          type="text"
          className="w-full h-11 px-3 rounded-md border border-gray-700 bg-gray-800 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
          placeholder="Enter venue address"
          value={form.venue}
          onChange={handleInputChange}
        />
      </div>

      {/* Banner Upload */}
      <div className="space-y-2">
        <label htmlFor="banner" className="text-sm font-medium">Event Banner / Cover Image</label>
        <input
          id="banner"
          name="banner"
          type="file"
          accept="image/*"
          className="flex h-10 w-full rounded-md border px-3 py-2 text-base focus-visible:ring-2"
          onChange={handleInputChange}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-2">
        <Button type="submit" disabled={loading} color="default">
          {loading ? (isEditing ? "Updating Event..." : "Creating Event...") : (isEditing ? "Update Event" : "Create Event")}
        </Button>
        <Button type="button" color="outline" onClick={() => onClose ? onClose() : setForm(initialState)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
