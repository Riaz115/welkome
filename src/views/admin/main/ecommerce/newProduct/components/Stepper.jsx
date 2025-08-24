import React, { useState, useEffect, useRef } from "react";

const Stepper = ({ steps, currentStep, action }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        //step completed
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        //step pending
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          stepNo: step.stepNo,
          description: step.name,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== 0 ? "flex w-full items-center" : "flex items-center"
        }
      >
        <div
          className={`flex-auto border-t-[4px] border-white transition duration-500 ease-in-out ${
            step.completed ? "opacity-100" : "opacity-10"
          } `}
        />
        <div
          onClick={() => action(step.stepNo)}
          className="relative flex flex-col items-center hover:cursor-pointer"
        >
          <div
            className={`flex h-4 w-4 items-center justify-center rounded-full border border-[var(--color-300)] bg-gradient-to-br from-brand-400 to-brand-600 transition duration-500 ease-in-out ${
              step.selected
                ? "border-[2px] !border-white font-bold text-white"
                : "border-[2px] border-[var(--color-300)]"
            }`}
          />
          <div
            className={`absolute top-0 mt-6 hidden w-32 text-center font-medium text-white md:block ${
              step.completed ? "font-medium opacity-100" : "opacity-30"
            }`}
          >
            {step.description}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="mx-4 flex items-center justify-between md:p-4">
      {stepsDisplay}
    </div>
  );
};
export default Stepper;
