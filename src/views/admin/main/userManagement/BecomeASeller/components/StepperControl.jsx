import { useState } from 'react';
import { toast } from 'react-toastify';

export default function StepperControl({ handleClick, currentStep, steps, onFinish, sellerData, canProceed, mode = 'create' }) {
  const isLastStep = currentStep === steps.length;
  const [submitting, setSubmitting] = useState(false);
  
  // Check if all required documents are uploaded for Step 2
  const areDocumentsUploaded = () => {
    if (!isLastStep) return true;
    const requiredDocs = ['businessRegistrationCertificate', 'bankStatement', 'idProof', 'tradingLicense'];
    return requiredDocs.every(doc => sellerData.documents && sellerData.documents[doc]);
  };
  
  // Dynamic text based on mode
  const getButtonText = () => {
    if (mode === 'update') {
      return submitting ? "Updating..." : "Update Application";
    } else {
      return submitting ? "Submitting..." : "Submit Application";
    }
  };
  
  const handleNext = async () => {
    if (isLastStep) {
      const requiredDocs = ['businessRegistrationCertificate', 'bankStatement', 'idProof', 'tradingLicense'];
      const missingDocs = requiredDocs.filter(doc => !sellerData.documents[doc]);
      
      if (missingDocs.length > 0) {
        toast.error('Please upload all required documents: Business Registration Certificate, Bank Statement, ID Proof, and Trading License');
        return;
      }
      
      if (!sellerData.businessName || !sellerData.businessType || !sellerData.businessRegistrationNumber) {
        toast.error('Please fill all required fields');
        return;
      }
      
      try {
        setSubmitting(true);
        await onFinish();
      } finally {
        setSubmitting(false);
      }
    } else {
      if (canProceed) {
        handleClick("next");
      } else {
        let message = '';
        switch (currentStep) {
          case 1:
            message = 'Please complete all required fields: Business Name, Business Type, and Registration Number';
            break;
          case 2:
            message = 'Please upload all required documents: Business Registration Certificate, Bank Statement, ID Proof, and Trading License';
            break;
          default:
            message = 'Please complete all required fields';
        }
        toast.error(message);
      }
    }
  };

  const handlePrev = () => {
    handleClick("prev");
  };

  return (
    <div className="mt-2 flex flex-col justify-between px-3 pt-2 md:flex-row md:px-8">
      {currentStep === 1 ? (
        <div />
      ) : (
        <button
          onClick={handlePrev}
          className={`mb-3 cursor-pointer rounded-xl bg-lightPrimary px-16 py-2 font-medium text-navy-700 transition duration-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20 md:mb-0`}
        >
          Prev
        </button>
      )}

      <button
        onClick={handleNext}
        className={`cursor-pointer rounded-xl px-16 py-2 font-medium text-white transition duration-200 md:ml-2 ${
          (canProceed || (isLastStep && areDocumentsUploaded())) && !submitting
            ? 'bg-brand-900 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90' 
            : 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
        }`}
        disabled={submitting || (!canProceed && !isLastStep) || (isLastStep && !areDocumentsUploaded())}
      >
        {isLastStep ? getButtonText() : "Next"}
      </button>
    </div>
  );
}
