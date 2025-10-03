import React, { useState, useEffect } from 'react';
import { Building, Calendar } from 'lucide-react';
import { apiPost, apiPut } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../utils/Button';
import CustomSelectBox from "../../components/CustomSelectBox";
import useEventOptions from "../../hooks/useEventOptions";

const initialState = {
  sponsorName: '',
  companyName: '',
  sponsorshipType: 'bronze',
  amount: '',
  email: '',
  phone: '',
  eventId: '',
  city: ''
};

const eventOptions = [
  { value: 'real-estate', label: 'Real Estate Excellence Awards 2025' },
  { value: 'hospitals', label: 'Healthcare Innovation Summit 2025' },
  { value: 'education', label: 'Education Excellence Forum 2025' },
  { value: 'startup', label: 'Startup & Innovation Expo 2025' },
  { value: 'tech', label: 'Technology Leadership Conference 2025' }
];

export default function SponsorForm({ onClose, sponsor }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();
  const isEditing = !!sponsor;

  // Populate form when editing
  useEffect(() => {
    if (sponsor) {
      setForm({
        sponsorName: sponsor.contactPersonName || sponsor.sponsorName || '',
        companyName: sponsor.organizationName || sponsor.companyName || '',
        sponsorshipType: sponsor.sponsorshipTier || sponsor.sponsorshipType || 'bronze',
        amount: sponsor.sponsorshipAmount || sponsor.amount || '',
        email: sponsor.email || '',
        phone: sponsor.mobileNumber || sponsor.phone || '',
        eventId: sponsor.eventId || '',
        city: sponsor.city || ''
      });
    }
  }, [sponsor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const sponsorData = {
        // Sponsor schema payload
        organizationName: form.companyName || form.sponsorName,
        organizationType: 'corporate',
        industryType: '',
        website: '',
        contactPersonName: form.sponsorName,
        designation: '',
        email: form.email,
        mobileNumber: form.phone,
        alternatePhone: '',
        address: '',
        city: form.city || 'Delhi',
        state: '',
        pincode: '',
        eventId: form.eventId,
        sponsorshipTier: form.sponsorshipType || 'bronze',
        sponsorshipAmount: Number(form.amount || 0),
        currency: 'INR',
        registrationType: 'admin_registration',
        createdBy: 'admin',
        createdByRole: 'admin',
        status: 'pending',
        notes: '',
        priority: 'normal',
        tags: [],
        paymentStatus: 'unpaid',
        amountPaid: 0,
        balanceAmount: Number(form.amount || 0)
      };

      if (isEditing) {
        console.log('Updating sponsor with ID:', sponsor._id || sponsor.id);
        console.log('Sponsor data being sent:', sponsorData);
        await apiPut(`/api/sponsors/${sponsor._id || sponsor.id}`, sponsorData, token);
        setSuccess('Sponsor updated successfully');
      } else {
        console.log('Creating new sponsor with data:', sponsorData);
        await apiPost('/api/sponsors', sponsorData, token);
        setSuccess('Sponsor added successfully');
      }
      
      setForm(initialState);
      setTimeout(() => onClose?.(), 1200);
    } catch (err) {
      setError(err.message || `Failed to ${isEditing ? 'update' : 'add'} sponsor`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-700 bg-gray-900 text-gray-100 shadow-lg p-6 space-y-6">
      <h3 className="text-2xl font-semibold flex items-center"><Building className="w-5 h-5 mr-2"/>{isEditing ? 'Edit Sponsor' : 'Add Sponsor'}</h3>
      {error && <div className="p-3 border border-red-500 text-red-400 rounded">{error}</div>}
      {success && <div className="p-3 border border-green-500 text-green-400 rounded">{success}</div>}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <h4 className="text-lg font-semibold flex items-center"><Calendar className="w-5 h-5 mr-2"/>Event Selection</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm">Select Event *</label>
            <CustomSelectBox options={useEventOptions().options} value={form.eventId} onChange={(v)=> setForm(prev=>({...prev, eventId: v}))} placeholder="Choose an event" variant="dark" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm">Sponsor Name</label>
          <input name="sponsorName" value={form.sponsorName} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Company Name</label>
          <input name="companyName" value={form.companyName} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Sponsorship Type</label>
          <input name="sponsorshipType" value={form.sponsorshipType} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Amount</label>
          <input name="amount" value={form.amount} onChange={handleChange} type="number" className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>{loading ? (isEditing ? 'Updating...' : 'Saving...') : (isEditing ? 'Update' : 'Save')}</Button>
        <Button type="button" color="outline" onClick={() => onClose?.()}>Cancel</Button>
      </div>
    </form>
  );
}


