import React, { useState, useEffect } from "react";
import { UserPlus, Calendar, Building, MapPin, Mail, Phone } from "lucide-react";
import { apiPost, apiPut } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import Button from "../../utils/Button";
import CustomSelectBox from "../../components/CustomSelectBox";
import useEventOptions from "../../hooks/useEventOptions";

const initialState = {
  eventId: '',
  name: '',
  email: '',
  phone: '',
  status: 'pending',
  organization: '',
  designation: '',
  address: '',
  city: '',
  state: '',
  pincode: ''
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

const GuestForm = ({ onClose, guest }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();
  const isEditing = !!guest;

  // Populate form when editing
  useEffect(() => {
    if (guest) {
      setForm({
        eventId: guest.eventId || '',
        name: guest.fullName || guest.name || '',
        email: guest.email || '',
        phone: guest.mobileNumber || guest.phone || '',
        status: guest.status || 'pending',
        organization: guest.organizationName || guest.organization || '',
        designation: guest.designation || '',
        address: guest.address || '',
        city: guest.city || '',
        state: guest.state || '',
        pincode: guest.pincode || ''
      });
    }
  }, [guest]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const guestData = {
        fullName: form.name,
        email: form.email,
        mobileNumber: form.phone,
        workingProfessional: 'Others',
        organizationName: form.organization,
        designation: form.designation,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        eventId: form.eventId,
        registrationType: 'admin_registration',
        createdBy: 'admin',
        createdByRole: 'admin',
        status: form.status,
        notes: '',
        priority: 'normal',
        tags: []
      };

      if (isEditing) {
        await apiPut(`/api/guests/${guest._id || guest.id}`, guestData, token);
        setSuccess('Guest updated successfully!');
      } else {
        await apiPost('/api/guests', guestData, token);
        setSuccess('Guest registered successfully!');
      }

      setForm(initialState);
      setTimeout(() => { if (onClose) onClose(); }, 1500);
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'register'} guest. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-700 bg-gray-900 text-gray-100 shadow-lg p-6 space-y-6">
      <div className="flex flex-col space-y-1.5 mb-2">
        <h3 className="text-2xl font-semibold">
          {isEditing ? 'Edit Guest' : 'Add New Guest'}
        </h3>
        <p className="text-sm text-gray-400">
          {isEditing ? 'Update guest details' : 'Fill in the details to register a new guest'}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-md text-red-400">{error}</div>
      )}

      {success && (
        <div className="p-4 bg-green-900/20 border border-green-500 rounded-md text-green-400">{success}</div>
      )}

      {/* Event Selection */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center"><Calendar className="w-5 h-5 mr-2" />Event Selection</h4>
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Event *</label>
          <CustomSelectBox
            options={useEventOptions().options}
            value={form.eventId}
            onChange={(v) => setForm(prev => ({ ...prev, eventId: v }))}
            placeholder="Choose an event"
            variant="dark"
          />
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center"><UserPlus className="w-5 h-5 mr-2" />Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name *</label>
            <input name="name" value={form.name} onChange={handleInputChange} placeholder="Enter full name" required className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Enter email address" required className="w-full h-10 pl-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} placeholder="+91 9876543210" required className="w-full h-10 pl-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select name="status" value={form.status} onChange={handleInputChange} className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500">
              {statusOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
            </select>
          </div>
        </div>
      </div>

      {/* Organization Details */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center"><Building className="w-5 h-5 mr-2" />Organization Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Organization Name</label><input name="organization" value={form.organization} onChange={handleInputChange} placeholder="Enter organization name" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Designation</label><input name="designation" value={form.designation} onChange={handleInputChange} placeholder="Enter designation" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
        </div>
      </div>

      {/* Address Information */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center"><MapPin className="w-5 h-5 mr-2" />Address Information</h4>
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <textarea name="address" value={form.address} onChange={handleInputChange} placeholder="Enter complete address" rows={3} className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">City</label><input name="city" value={form.city} onChange={handleInputChange} placeholder="Enter city" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">State</label><input name="state" value={form.state} onChange={handleInputChange} placeholder="Enter state" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Pincode</label><input name="pincode" value={form.pincode} onChange={handleInputChange} placeholder="Enter pincode" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 justify-end">
        <Button type="button" color="outline" onClick={() => onClose ? onClose() : setForm(initialState)}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading} color="default">
          <UserPlus className="w-4 h-4 mr-2" />
          {loading ? (isEditing ? 'Updating Guest...' : 'Creating Guest...') : (isEditing ? 'Update Guest' : 'Create Guest')}
        </Button>
      </div>
    </form>
  );
};

export default GuestForm;
