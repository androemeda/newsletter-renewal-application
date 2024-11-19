import React from 'react';

const ProgressSteps = ({ currentStatus }) => {
  const steps = [
    { key: 'INITIAL', label: 'Start Flow' },
    { key: 'WAITING_FIRST', label: 'First Reminder Sent' },
    { key: 'SENDING_SECOND', label: 'Second Reminder Sent' },
    { key: 'COMPLETED', label: 'Flow Completed' },
  ];

  const getStatusClass = (stepKey) => {
    if (stepKey === currentStatus) return 'bg-blue-500 text-white';
    if (steps.findIndex((step) => step.key === stepKey) < steps.findIndex((step) => step.key === currentStatus))
      return 'bg-green-500 text-white';
    return 'bg-gray-200 text-gray-500';
  };

  return (
    <div className="flex justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${getStatusClass(step.key)}`}
          >
            {index + 1}
          </div>
          <div className="mt-2 text-sm text-center">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
