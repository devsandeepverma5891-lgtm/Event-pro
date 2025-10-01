import React from 'react';
import SharedInput from './SharedInput';

const EnquiryFields = ({
  formData,
  handleChange,
  subscriptionTypes = [],
  selectedSubscriptionType,
  onSubscriptionSelect
}) => (
  <div className="space-y-4">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white mb-3">Select Package</h3>
      <div className="grid grid-cols-2 gap-3">
        {subscriptionTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              onSubscriptionSelect(type);
              handleChange({
                target: { name: 'subscriptionType', value: type }
              });
            }}
            className={`py-2 px-4 rounded-md text-center transition-colors ${
              selectedSubscriptionType === type
                ? 'bg-gradient-to-b from-[#F04F82] to-[#F10651] text-white'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>

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
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px]"
        />
      </div>
    </div>
  </div>
);

export default EnquiryFields;
