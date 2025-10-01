import React from "react";
import VisitorFields from "./fields/VisitorFields";
import AwardsFields from "./fields/AwardsFields";
import StallFields from "./fields/StallFields";
import SponsorFields from "./fields/SponsorFields";
import EnquiryFields from "./fields/EnquiryFields";

const RegistrationForm = ({
  registrationType,
  formData,
  setFormData,
  subscriptionTypes,
  selectedSubscriptionType,
  onSubscriptionSelect,
  isSubmitting,
  handleSubmit,
  onClose,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderFields = () => {
    switch (registrationType) {
      case "Visitor Registration":
        return <VisitorFields formData={formData} handleChange={handleChange} />;
      case "Awards Registration":
        return <AwardsFields formData={formData} handleChange={handleChange} />;
      case "Book a Stall":
        return <StallFields formData={formData} handleChange={handleChange} />;
      case "Sponsor Registration":
        return <SponsorFields formData={formData} handleChange={handleChange} />;
      case "Enquire Now":
        return (
          <EnquiryFields
            formData={formData}
            handleChange={handleChange}
            subscriptionTypes={subscriptionTypes}
            selectedSubscriptionType={selectedSubscriptionType}
            onSubscriptionSelect={onSubscriptionSelect}
          />
        );
      default:
        return null;
    }
  };

  const renderSubmitButton = () => {
    return (
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 bg-gradient-to-b from-pink-500 to-pink-700 text-white py-2 rounded"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    );
  };

  const renderCancelButton = () => {
    return (
      <button
        type="button"
        onClick={onClose}
        className="flex-1 bg-gray-600 text-white py-2 rounded"
      >
        Cancel
      </button>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFields()}
      <div className="flex gap-3 pt-4">
        {renderCancelButton()}
        {renderSubmitButton()}
      </div>
    </form>
  );
};

export default RegistrationForm;
