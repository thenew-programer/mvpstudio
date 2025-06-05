'use client';

import { CheckIcon } from 'lucide-react';

interface OnboardingProgressProps {
  currentStep: number;
}

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  const steps = [
    { id: 1, name: 'Describe Idea' },
    { id: 2, name: 'AI Processing' },
    { id: 3, name: 'Review Proposal' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={`relative flex-1 ${
                stepIdx === steps.length - 1 ? '' : 'pr-8 sm:pr-20'
              }`}
            >
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div
                  className={`h-0.5 w-full ${
                    stepIdx < currentStep
                      ? 'bg-primary'
                      : 'bg-muted'
                  }`}
                />
              </div>
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  step.id < currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step.id === currentStep
                    ? 'border-2 border-primary bg-background'
                    : 'border-2 border-muted bg-background'
                }`}
              >
                {step.id < currentStep ? (
                  <CheckIcon className="h-5 w-5\" aria-hidden="true" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-sm font-medium text-center">
                {step.name}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}