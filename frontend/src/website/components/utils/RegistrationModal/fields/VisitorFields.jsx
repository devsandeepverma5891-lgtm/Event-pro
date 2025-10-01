import React from 'react';
import SharedInput from './SharedInput';

const VisitorFields = ({ formData, handleChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <SharedInput
      label="Full Name"
      name="name"
      value={formData.name}
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
      label="Organization"
      name="organization"
      value={formData.organization}
      onChange={handleChange}
    />
    <div className="md:col-span-2">
      <SharedInput
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
    </div>
  </div>
);

export default VisitorFields;
