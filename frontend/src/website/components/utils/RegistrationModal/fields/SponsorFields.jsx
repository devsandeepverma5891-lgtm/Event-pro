import React from 'react';
import SharedInput from './SharedInput';

const SponsorFields = ({ formData, handleChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <SharedInput
      label="Company Name"
      name="companyName"
      value={formData.companyName}
      onChange={handleChange}
      required
    />
    <SharedInput
      label="Contact Person"
      name="contactPerson"
      value={formData.contactPerson}
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
      label="Sponsorship Package"
      name="sponsorshipPackage"
      value={formData.sponsorshipPackage}
      onChange={handleChange}
      required
    />
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Additional Requirements
      </label>
      <textarea
        name="additionalRequirements"
        value={formData.additionalRequirements}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
      />
    </div>
  </div>
);

export default SponsorFields;
