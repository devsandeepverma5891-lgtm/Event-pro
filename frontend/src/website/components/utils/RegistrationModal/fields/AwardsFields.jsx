import React from 'react';
import SharedInput from './SharedInput';

const AwardsFields = ({ formData, handleChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <SharedInput
      label="Nominee Name"
      name="nomineeName"
      value={formData.nomineeName}
      onChange={handleChange}
      required
    />
    <SharedInput
      label="Organization"
      name="organization"
      value={formData.organization}
      onChange={handleChange}
      required
    />
    <SharedInput
      label="Designation"
      name="designation"
      value={formData.designation}
      onChange={handleChange}
      required
    />
    <SharedInput
      label="Mobile Number"
      name="mobile"
      type="tel"
      value={formData.mobile}
      onChange={handleChange}
      required
    />
    <SharedInput
      label="Email"
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
    <SharedInput
      label="Category"
      name="category"
      value={formData.category}
      onChange={handleChange}
      required
    />
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Project Details <span className="text-red-500">*</span>
      </label>
      <textarea
        name="projectDetails"
        value={formData.projectDetails}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
        required
      />
    </div>
  </div>
);

export default AwardsFields;
