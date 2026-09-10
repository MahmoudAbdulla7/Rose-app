interface AddressFormStepperProps {
  step: number;
}

export default function Stepper({ step }: AddressFormStepperProps) {
  return (
    <div className="flex items-center">
      {/* Before Step 1 */}
      <div className="bg-ds-primary h-1.5 flex-1" />

      {/* Step 1 */}
      <div
        className={`text-ds-text-inverse flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          step >= 1 ? 'bg-ds-primary' : 'bg-ds-border-muted'
        }`}
      >
        1
      </div>

      {/* Between Steps */}
      <div className={`h-1.5 flex-1 ${step >= 2 ? 'bg-ds-primary' : 'bg-ds-border-muted'}`} />

      {/* Step 2 */}
      <div
        className={`text-ds-text-inverse flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          step >= 2 ? 'bg-ds-primary' : 'bg-ds-border-muted text-ds-text-soft'
        }`}
      >
        2
      </div>

      {/* After Step 2 */}
      <div className="bg-ds-border-muted h-1.5 flex-1" />
    </div>
  );
}
