import { Check } from 'lucide-react'

interface CheckoutStepsProps {
  currentStep: number
}

const steps = [
  { id: 1, name: 'Review', description: 'Review your selection' },
  { id: 2, name: 'Details', description: 'Buyer information' },
  { id: 3, name: 'Payment', description: 'Payment & confirmation' },
  { id: 4, name: 'Complete', description: 'Order confirmation' },
]

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.id}
            className={`relative ${
              stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
            } flex-1`}
          >
            <>
              {stepIdx !== steps.length - 1 ? (
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div
                    className={`h-0.5 w-full ${
                      step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                </div>
              ) : null}
              <div className="relative flex items-start">
                <span className="h-9 w-9 flex items-center">
                  <span
                    className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                      step.id < currentStep
                        ? 'bg-blue-600 border-blue-600'
                        : step.id === currentStep
                        ? 'border-blue-600 bg-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          step.id === currentStep
                            ? 'text-blue-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.id}
                      </span>
                    )}
                  </span>
                </span>
                <span className="ml-4 min-w-0 flex flex-col">
                  <span
                    className={`text-sm font-medium ${
                      step.id <= currentStep ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {step.description}
                  </span>
                </span>
              </div>
            </>
          </li>
        ))}
      </ol>
    </nav>
  )
}