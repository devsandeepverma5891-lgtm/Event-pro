import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { apiPost, apiPut } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Button from '../../utils/Button';
import CustomSelectBox from "../../components/CustomSelectBox";
import useEventOptions from "../../hooks/useEventOptions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = { nomineeName: '', category: '', description: '', achievements: '' };

export default function AwardeeForm({ onClose, awardee }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const isEditing = !!awardee;

  // Populate form when editing
  useEffect(() => {
    if (awardee) {
      setForm({
        nomineeName: awardee.nomineeName || '',
        category: awardee.awardCategory || awardee.category || '',
        description: awardee.description || '',
        achievements: awardee.achievements || '',
        eventId: awardee.eventId || ''
      });
    }
  }, [awardee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const awardData = {
        nomineeName: form.nomineeName,
        mobileNumber: '',
        email: '',
        organizationName: '',
        // awardCategory: form.category || 'replace-category-id',
        awardCategory: '',
        eventId: form.eventId,
        registrationType: 'admin_nomination',
        status: 'submitted',
      };

      if (isEditing) {
        await apiPut(`/api/awards/${awardee._id || awardee.id}`, awardData, token);
        toast.success('Nomination updated successfully!');
      } else {
        await apiPost('/api/awards', awardData, token);
        toast.success('Nomination created successfully!');
      }

      setForm(initialState);
      setTimeout(() => onClose?.(), 1000);
    } catch (err) {
      toast.error(err.message || `Failed to ${isEditing ? 'update' : 'create'} nomination`);
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="rounded-lg border border-gray-700 bg-gray-900 text-gray-100 shadow-lg p-6 space-y-6"
    >
      <h3 className="text-2xl font-semibold flex items-center">
        <Trophy className="w-5 h-5 mr-2"/>
        {isEditing ? 'Edit Nomination' : 'Create Nomination'}
      </h3>

      {/* Event Selection */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm">Select Event *</label>
          <CustomSelectBox 
            options={useEventOptions().options} 
            value={form.eventId} 
            onChange={(v)=> setForm(prev=>({...prev, eventId: v}))} 
            placeholder="Choose an event" 
            variant="dark" 
          />
        </div>
      </div>

      {/* Nomination Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm">Nominee Name</label>
          <input 
            name="nomineeName" 
            value={form.nomineeName} 
            onChange={handleChange} 
            className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Category</label>
          <input 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-gray-100" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm">Description</label>
        <textarea 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100" 
          rows={3} 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm">Achievements</label>
        <textarea 
          name="achievements" 
          value={form.achievements} 
          onChange={handleChange} 
          className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100" 
          rows={3} 
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? (isEditing ? 'Updating...' : 'Saving...') : (isEditing ? 'Update' : 'Save')}
        </Button>
        <Button type="button" color="outline" onClick={() => onClose?.()}>Cancel</Button>
      </div>
    </form>
  );
}
