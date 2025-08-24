export default function StepperControl({ handleClick, currentStep, steps, onFinish, productData, canProceed }) {
  const isLastStep = currentStep === steps.length;
  
  const handleNext = () => {
    if (isLastStep) {
      // Validate required fields before finishing
      if (!productData.title || productData.variants.length === 0) {
        alert('Please fill in all required fields (Product Title and at least one variant with pricing)');
        return;
      }
      onFinish();
    } else {
      if (canProceed) {
        handleClick("next");
      } else {
        // Show specific validation messages based on current step
        let message = '';
        switch (currentStep) {
          case 1:
            message = 'Please fill in Product Title and complete the Category Path (Prime Category > Category > Subcategory)';
            break;
          case 2:
            message = 'Please configure at least one variant type with values';
            break;
          default:
            message = 'Please complete all required fields';
        }
        alert(message);
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
          canProceed || isLastStep 
            ? 'bg-brand-900 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90' 
            : 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
        }`}
        disabled={!canProceed && !isLastStep}
      >
        {isLastStep ? "Create Product" : "Next"}
      </button>
    </div>
  );
} 