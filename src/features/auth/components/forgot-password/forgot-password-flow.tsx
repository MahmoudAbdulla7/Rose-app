'use client';

import { useState } from 'react';

import ForgotPasswordForm from './forgot-password-form';
import PasswordResetSent from './password-reset-sent';
import { STEP } from '../../lib/constants/forgot-password.constant';
import type { Step } from '../../lib/constants/forgot-password.constant';

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<Step>(STEP.EMAIL);
  const [email, setEmail] = useState('');

  return (
    <>
      {step === STEP.EMAIL && <ForgotPasswordForm goToStep={setStep} setEmail={setEmail} />}
      {step === STEP.SENT && <PasswordResetSent goToStep={setStep} email={email} />}
    </>
  );
}
