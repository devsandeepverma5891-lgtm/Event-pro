import React, { useState, useEffect } from 'react';
import { UserPlus, Calendar, Building, MapPin, FileText } from 'lucide-react';
import { apiPost, apiPut } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../utils/Button';
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
  pincode: '',
  requirements: ''
};

const eventOptions = [
  { value: 'real-estate', label: 'Real Estate Excellence Awards 2025' },
  { value: 'hospitals', label: 'Healthcare Innovation Summit 2025' },
  { value: 'education', label: 'Education Excellence Forum 2025' },
  { value: 'doctors', label: 'Medical Professionals Meet 2025' },
  { value: 'startup', label: 'Startup & Innovation Expo 2025' },
  { value: 'tech', label: 'Technology Leadership Conference 2025' }
];

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

const StallForm = ({ onClose, stall }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();
  const isEditing = !!stall;

  // Populate form when editing
  useEffect(() => {
    if (stall) {
      setForm({
        eventId: stall.eventId || '',
        name: stall.contactPersonName || stall.name || '',
        email: stall.email || '',
        phone: stall.mobileNumber || stall.phone || '',
        status: stall.status || 'pending',
        organization: stall.companyName || stall.organization || '',
        designation: stall.designation || '',
        address: stall.address || '',
        city: stall.city || '',
        state: stall.state || '',
        pincode: stall.pincode || '',
        requirements: stall.requirements || ''
      });
    }
  }, [stall]);

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
      const stallData = {
        // Map to StallBooking schema
        companyName: form.organization || 'N/A',
        contactPersonName: form.name,
        mobileNumber: form.phone,
        email: form.email,
        eventId: form.eventId,
        bookingType: 'admin_booking',
        stallNumber: '',
        stallType: 'standard',
        stallSize: { width: 0, length: 0, unit: 'feet' },
        status: form.status || 'pending',
        paymentStatus: 'unpaid',
        bookedBy: { name: 'admin', role: 'admin' }
      };

      if (isEditing) {
        console.log('Updating stall with ID:', stall._id || stall.id);
        console.log('Stall data being sent:', stallData);
        await apiPut(`/api/stalls/${stall._id || stall.id}`, stallData, token);
        setSuccess('Stall updated successfully!');
      } else {
        console.log('Creating new stall with data:', stallData);
        await apiPost('/api/stalls', stallData, token);
        setSuccess('Stall created successfully!');
      }
      
      setForm(initialState);
      setTimeout(() => { if (onClose) onClose(); }, 1500);
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'create'} stall. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-700 bg-gray-900 text-gray-100 shadow-lg p-6 space-y-6">
      <div className="space-y-1.5">
        <h3 className="text-2xl font-semibold">
          {isEditing ? 'Edit Stall' : 'Create New Stall'}
        </h3>
        <p className="text-sm text-gray-400">
          {isEditing ? 'Update stall details' : 'Fill in the details to register a new stall'}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-md text-red-400">{error}</div>
      )}

      {success && (
        <div className="p-4 bg-green-900/20 border border-green-500 rounded-md text-green-400">{success}</div>
      )}

      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center"><Calendar className="w-5 h-5 mr-2"/>Event Selection</h4>
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Event *</label>
          <CustomSelectBox options={useEventOptions().options} value={form.eventId} onChange={(v)=> setForm(prev=>({...prev, eventId: v}))} placeholder="Choose an event" variant="dark" />
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center">
          <UserPlus className="w-5 h-5 mr-2" />
          Personal Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name *</label>
            <input name="name" value={form.name} onChange={handleInputChange} placeholder="Enter full name" required className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address *</label>
            <input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Enter email address" required className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} placeholder="+91 9876543210" required className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select name="status" value={form.status} onChange={handleInputChange} className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500">
              {statusOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center">
          <Building className="w-5 h-5 mr-2" />
          Organization Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Organization Name</label>
            <input name="organization" value={form.organization} onChange={handleInputChange} placeholder="Enter organization name" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Designation</label>
            <input name="designation" value={form.designation} onChange={handleInputChange} placeholder="Enter designation" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Address Information
        </h4>
        <div className="space-y-2">
          <label className="text-sm font-medium">Address</label>
          <textarea name="address" value={form.address} onChange={handleInputChange} placeholder="Enter complete address" rows={3} className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <input name="city" value={form.city} onChange={handleInputChange} placeholder="Enter city" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <input name="state" value={form.state} onChange={handleInputChange} placeholder="Enter state" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Pincode</label>
            <input name="pincode" value={form.pincode} onChange={handleInputChange} placeholder="Enter pincode" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Additional Requirements
        </h4>
        <div className="space-y-2">
          <label className="text-sm font-medium">Special Requirements</label>
          <textarea name="requirements" value={form.requirements} onChange={handleInputChange} placeholder="Enter any special requirements for stall..." rows={3} className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} color="default">
          {loading ? (isEditing ? 'Updating Stall...' : 'Creating Stall...') : (isEditing ? 'Update Stall' : 'Create Stall')}
        </Button>
        <Button type="button" color="outline" onClick={() => onClose ? onClose() : setForm(initialState)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default StallForm;


