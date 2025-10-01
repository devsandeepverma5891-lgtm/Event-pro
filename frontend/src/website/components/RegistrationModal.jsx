import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import visitor from '../assets/visitor.png';
import awardees from '../assets/awardees.png';
import stalls from '../assets/stalls.png';
import sponsor from '../assets/sponsor.png';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    margin: 'auto',
    padding: 0,
    border: 'none',
    background: 'transparent',
    overflow: 'visible',
  },
  overlay: {
    zIndex: 9999,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

const RegistrationModal = ({
  isOpen,
  onClose,
  registrationType,
  selectedSubscription = '',
  subscriptionTypes = [],
  selectedSubscriptionType = '',
  onSubscriptionSelect = () => {}
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    type: '',
    organization: '',
    city: '',
    contactPerson: '',
    nomineeName: '',
    subscriptionType: '',
    specialRequirements: ''   // ✅ New field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getApiEndpoint = () => {
    switch (registrationType) {
      case 'Enquire Now':
        return 'http://localhost:8080/api/enquiries/register';
      case 'Visitor Registration':
        return 'http://localhost:8080/api/visitors/register';
      case 'Awards Registration':
        return 'http://localhost:8080/api/awards/register';
      case 'Book a Stall':
        return 'http://localhost:8080/api/stalls/register';
      case 'Sponsor Registration':
        return 'http://localhost:8080/api/sponsors/register';
      default:
        return '';
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const endpoint = getApiEndpoint();
      await axios.post(endpoint, formData);

      setMessage({
        text: 'Registration successful!',
        type: 'success'
      });

      // reset form
      setFormData({
        name: '',
        mobile: '',
        type: '',
        organization: '',
        city: '',
        contactPerson: '',
        nomineeName: '',
        subscriptionType: '',
        specialRequirements: ''
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({
        text: error.response?.data?.message || 'Registration failed. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRegistrationIcon = () => {
    switch (registrationType) {
      case 'Visitor Registration':
        return <img src={visitor} alt="Visitor" className="w-auto h-10" />;
      case 'Awards Registration':
        return <img src={awardees} alt="Awards" className="w-auto h-10" />;
      case 'Book a Stall':
        return <img src={stalls} alt="Stalls" className="w-auto h-10" />;
      case 'Sponsor Registration':
        return <img src={sponsor} alt="Sponsor" className="w-auto h-10" />;
      default:
        return null;
    }
  };

  // set subscription on open
  useEffect(() => {
    if (isOpen && registrationType === 'Enquire Now' && selectedSubscription) {
      onSubscriptionSelect(selectedSubscription);
      setFormData(prev => ({
        ...prev,
        subscriptionType: selectedSubscription
      }));
    }
  }, [isOpen, registrationType, selectedSubscription, onSubscriptionSelect]);

  const renderFormFields = () => {
    let fields = [];

    switch (registrationType) {
      case 'Visitor Registration':
        fields = [
          { id: 'name', label: 'Full Name *', type: 'text', required: true },
          { id: 'mobile', label: 'Mobile Number *', type: 'tel', required: true },
          { id: 'type', label: 'Working Professional / Business / Others *', type: 'select', options: ['Working Professional', 'Business', 'Others'], required: true },
          { id: 'organization', label: 'Organization / Company Name', type: 'text' },
          { id: 'city', label: 'City *', type: 'text', required: true }
        ];
        break;

      case 'Awards Registration':
        fields = [
          { id: 'nomineeName', label: 'Nominee Name *', type: 'text', required: true },
          { id: 'mobile', label: 'Contact Person Mobile *', type: 'tel', required: true },
          { id: 'organization', label: 'Organization / Company Name *', type: 'text', required: true }
        ];
        break;

      case 'Book a Stall':
        fields = [
          { id: 'organization', label: 'Company / Organization Name *', type: 'text', required: true },
          { id: 'name', label: 'Contact Person Name *', type: 'text', required: true },
          { id: 'mobile', label: 'Mobile Number *', type: 'tel', required: true }
        ];
        break;

      case 'Sponsor Registration':
        fields = [
          { id: 'organization', label: 'Sponsor Organization Name *', type: 'text', required: true },
          { id: 'name', label: 'Contact Person Name *', type: 'text', required: true },
          { id: 'mobile', label: 'Mobile Number *', type: 'tel', required: true }
        ];
        break;

        case 'Enquire Now':
        fields = [
          { id: 'name', label: 'Full Name *', type: 'text', required: true },
          { id: 'mobile', label: 'Mobile Number *', type: 'tel', required: true },
          { id: 'subscriptionType', label: 'Subscription Type *', type: 'select', options: subscriptionTypes, required: true },
          { id: 'specialRequirements', label: 'Special Requirements', type: 'textarea' }
        ];
        break;

      default:
        break;
    }

    return (
      <>
        {fields.map((f) => (
          <div className="space-y-2" key={f.id}>
            <label className="text-sm font-medium text-white" htmlFor={f.id}>{f.label}</label>
            {f.type === 'select' ? (
              <select
                id={f.id}
                name={f.id}
                required={f.required}
                value={formData[f.id]}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select type</option>
                {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                required={f.required}
                value={formData[f.id]}
                onChange={handleChange}
                placeholder={`Enter ${f.label}`}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            )}
          </div>
        ))}

      </>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={`${registrationType} Form`}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[#201E27] p-6 shadow-lg sm:rounded-lg max-w-md">
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
            {getRegistrationIcon()} {registrationType}
          </h2>
          <p className="text-sm text-white/70">Fill in the details below to complete your registration.</p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`p-3 rounded-md text-sm ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-green-100 text-green-700 border border-green-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">{renderFormFields()}</div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground text-white flex-1 h-10 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-10 rounded-md text-white bg-gradient-to-b from-[#F04F82] to-[#F10651] hover:from-[#F10651] hover:to-[#F04F82]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="text-white" />
        </button>
      </div>
    </Modal>
  );
};

export default RegistrationModal;
