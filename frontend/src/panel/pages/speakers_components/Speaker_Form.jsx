import React, { useState, useEffect } from "react";
import { UserPlus, Calendar, Building, MapPin, Mail, Phone } from "lucide-react";
import { apiPost, apiPut } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import Button from "../../utils/Button";
import CustomSelectBox from "../../components/CustomSelectBox";
import useEventOptions from "../../hooks/useEventOptions";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
  title: '',
  bio: ''
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

const SpeakerForm = ({ onClose, speaker }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const isEditing = !!speaker;

  // Populate form when editing
  useEffect(() => {
    if (speaker) {
      setForm({
        eventId: speaker.eventId || '',
        name: speaker.fullName || speaker.name || '',
        email: speaker.email || '',
        phone: speaker.mobileNumber || speaker.phone || '',
        status: speaker.status || 'pending',
        organization: speaker.organizationName || speaker.organization || '',
        designation: speaker.designation || '',
        address: speaker.address || '',
        city: speaker.city || '',
        state: speaker.state || '',
        pincode: speaker.pincode || '',
        title: speaker.title || '',
        bio: speaker.bio || ''
      });
    }
  }, [speaker]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const speakerData = {
        fullName: form.name,
        email: form.email,
        mobileNumber: form.phone,
        organizationName: form.organization,
        designation: form.designation,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        eventId: form.eventId,
        status: form.status,
        title: form.title,
        bio: form.bio,
        registrationType: 'admin_registration',
        createdBy: 'admin',
        createdByRole: 'admin',
        notes: '',
        priority: 'normal',
        tags: []
      };

      if (isEditing) {
        await apiPut(`/api/speakers/${speaker._id || speaker.id}`, speakerData, token);
        toast.success('Speaker updated successfully!');
      } else {
        await apiPost('/api/speakers', speakerData, token);
        toast.success('Speaker added successfully!');
      }

      setForm(initialState);
      setTimeout(() => onClose?.(), 1500);
    } catch (err) {
      toast.error(err.message || `Failed to ${isEditing ? 'update' : 'add'} speaker`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-700 bg-gray-900 text-gray-100 shadow-lg p-6 space-y-6">
      <div className="flex flex-col space-y-1.5 mb-2">
        <h3 className="text-2xl font-semibold">{isEditing ? 'Edit Speaker' : 'Add New Speaker'}</h3>
        <p className="text-sm text-gray-400">{isEditing ? 'Update speaker details' : 'Fill in the details to register a new speaker'}</p>
      </div>

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

      {/* Personal Info */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center"><UserPlus className="w-5 h-5 mr-2" />Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name *</label>
            <input name="name" value={form.name} onChange={handleInputChange} required className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleInputChange} required className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} required className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select name="status" value={form.status} onChange={handleInputChange} className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100">
              {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Organization */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center"><Building className="w-5 h-5 mr-2" />Organization Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Organization</label><input name="organization" value={form.organization} onChange={handleInputChange} className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Designation</label><input name="designation" value={form.designation} onChange={handleInputChange} className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100" /></div>
        </div>
      </div>

      {/* Address */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center"><MapPin className="w-5 h-5 mr-2" />Address Information</h4>
        <textarea name="address" value={form.address} onChange={handleInputChange} rows={3} placeholder="Enter address" className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="city" value={form.city} onChange={handleInputChange} placeholder="City" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100" />
          <input name="state" value={form.state} onChange={handleInputChange} placeholder="State" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100" />
          <input name="pincode" value={form.pincode} onChange={handleInputChange} placeholder="Pincode" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100" />
        </div>
      </div>

      {/* Speaker Specific */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold">Speaker Details</h4>
        <input name="title" value={form.title} onChange={handleInputChange} placeholder="Title / Position" className="w-full h-10 px-3 rounded-md border border-gray-600 bg-gray-700 text-gray-100 mb-2" />
        <textarea name="bio" value={form.bio} onChange={handleInputChange} rows={3} placeholder="Short bio" className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100" />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 justify-end">
        <Button type="button" color="outline" onClick={() => onClose?.()}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          <UserPlus className="w-4 h-4 mr-2" />
          {loading ? (isEditing ? 'Updating Speaker...' : 'Creating Speaker...') : (isEditing ? 'Update Speaker' : 'Create Speaker')}
        </Button>
      </div>
    </form>
  );
};

export default SpeakerForm;
