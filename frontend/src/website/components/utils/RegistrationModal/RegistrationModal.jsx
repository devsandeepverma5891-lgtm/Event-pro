import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import axios from "axios";
import RegistrationForm from "./RegistrationForm";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    background: "transparent",
    border: "none",
    padding: 0,
    inset: "unset",
  },
  overlay: {
    zIndex: 9999,
    backgroundColor: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const RegistrationModal = ({
  isOpen,
  onClose,
  registrationType,
  selectedSubscription = "",
  subscriptionTypes = [],
  selectedSubscriptionType = "",
  onSubscriptionSelect = () => {},
}) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // API Endpoints
  const apiEndpoints = {
    "Visitor Registration": "/api/visitors/register",
    "Awards Registration": "/api/awards/register",
    "Book a Stall": "/api/stalls/register",
    "Sponsor Registration": "/api/sponsors/register",
    "Enquire Now": "/api/enquiries/register",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const endpoint = apiEndpoints[registrationType];
      await axios.post(`http://localhost:8080${endpoint}`, formData);

      setMessage({ text: "Registration successful!", type: "success" });
      setTimeout(onClose, 1500);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Registration failed.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sync subscription when modal opens
  useEffect(() => {
    if (isOpen && registrationType === "Enquire Now" && selectedSubscription) {
      onSubscriptionSelect(selectedSubscription);
      setFormData((prev) => ({ ...prev, subscriptionType: selectedSubscription }));
    }
  }, [isOpen, registrationType, selectedSubscription]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={`${registrationType} Form`}
    >
      <div className="relative max-w-md w-full bg-[#201E27] p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">{registrationType}</h2>
          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        {/* Alert Message */}
        {message.text && (
          <div
            className={`p-2 mb-3 text-sm rounded ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <RegistrationForm
          registrationType={registrationType}
          formData={formData}
          setFormData={setFormData}
          subscriptionTypes={subscriptionTypes}
          selectedSubscriptionType={selectedSubscriptionType}
          onSubscriptionSelect={onSubscriptionSelect}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};

export default RegistrationModal;
