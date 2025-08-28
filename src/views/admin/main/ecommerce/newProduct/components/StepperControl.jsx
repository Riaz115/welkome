export default function StepperControl({ handleClick, currentStep, steps, isUpdate = false }) {
  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;

  return (
    <div className="mt-2 flex flex-col justify-between px-3 pt-2 md:flex-row md:px-8">
      {/* Previous Button */}
      {!isFirstStep && (
        <button
          onClick={() => handleClick()}
          className={`mb-3 cursor-pointer rounded-xl bg-lightPrimary px-16 py-2 font-medium text-navy-700 transition duration-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20 md:mb-0`}
        >
          Prev
        </button>
      )}

      {/* Next/Submit Button */}
      {!isLastStep && (
        <button
          onClick={() => handleClick("next")}
          className="cursor-pointer rounded-xl bg-brand-900 px-16 py-2 font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90 md:ml-2"
        >
          Next
        </button>
      )}

      {/* Final Step - Show both Prev and Update buttons */}
      {isLastStep && (
        <>
          <button
            onClick={() => handleClick()}
            className="mb-3 cursor-pointer rounded-xl bg-lightPrimary px-16 py-2 font-medium text-navy-700 transition duration-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20 md:mb-0"
          >
            Prev
          </button>
          <button
            onClick={() => handleClick("submit")}
            className="cursor-pointer rounded-xl bg-green-600 px-16 py-2 font-medium text-white transition duration-200 hover:bg-green-700 active:bg-green-800 md:ml-2"
          >
            {isUpdate ? "Update Product" : "Submit"}
          </button>
        </>
      )}
    </div>
  );
}
