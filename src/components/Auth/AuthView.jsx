import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Mail, Lock, User, CheckCircle2, ChevronLeft } from 'lucide-react';
import Logo from '../Navigation/Logo';

export default function AuthView({ onAuthenticate }) {
  const [step, setStep] = useState('welcome'); // welcome | options | email-login | email-register | personalization
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("We couldn't sign you in. Check your details and try again.");
      return;
    }

    // Complete Auth & proceed to personalization
    setStep('personalization');
  };

  const handleEmailRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setStep('personalization');
  };

  const handleCompleteOnboarding = (selectedRole = role) => {
    onAuthenticate({
      name: name || (email ? email.split('@')[0] : 'Guest User'),
      email: email || 'guest@medref.ai',
      role: selectedRole || 'Healthcare Learner',
      isGuest: step === 'options' && !email
    });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-center items-center px-4 py-8 select-none">
      <div className="w-full max-w-md bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Step 1: Welcome Screen */}
        {step === 'welcome' && (
          <div className="text-center space-y-6 animate-in fade-in">
            <div className="flex justify-center">
              <Logo size="hero" showText={false} />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                MedRef AI
              </h1>
              <p className="text-sm text-slate-400 font-medium">
                Medical knowledge, intelligently organized.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStep('options')}
                className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Sign-In Options */}
        {step === 'options' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-1">
              <Logo size="normal" showText={true} className="justify-center mb-4" />
              <h2 className="text-xl font-bold text-slate-100">Sign in to MedRef AI</h2>
              <p className="text-xs text-slate-400">Access your personal medical reference workspace</p>
            </div>

            <div className="space-y-3">
              {/* Google */}
              <button
                onClick={() => handleCompleteOnboarding('Healthcare Learner')}
                className="w-full py-3 rounded-xl bg-[#1e293b]/70 hover:bg-[#1e293b] border border-slate-700/60 text-xs font-semibold text-slate-200 flex items-center justify-center gap-3 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Apple */}
              <button
                onClick={() => handleCompleteOnboarding('Healthcare Learner')}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs flex items-center justify-center gap-3 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.84.13-9.64-1.92-14.42-6.13-3.11-2.7-7-7.39-11.66-14.07-6.24-8.99-11.22-19.14-14.93-30.45-3.71-11.31-5.57-22.18-5.57-32.61 0-14.99 3.8-27.42 11.41-37.3 7.6-9.87 17.2-14.88 28.79-15.01 4.58 0 9.7 1.18 15.35 3.54 5.66 2.36 9.57 3.54 11.75 3.54 1.93 0 5.86-1.18 11.8-3.54 5.93-2.36 10.9-3.48 14.91-3.35 10.74.52 19.53 4.48 26.36 11.89-9.54 5.79-14.19 13.9-13.94 24.34.25 8.12 3.38 15.01 9.4 20.67 6.02 5.66 13.25 8.87 21.68 9.64-2.32 6.94-5.34 13.9-9.06 20.89zM119.22 31.86c0-6.72 2.45-13.15 7.35-18.28 4.9-5.13 11.02-8.17 18.36-9.12.13.9.19 1.8.19 2.7 0 6.6-2.52 13.06-7.55 18.37-5.04 5.31-11.16 8.35-18.35 9.12-.13-.78-.19-1.68-.19-2.79z"/>
                </svg>
                <span>Continue with Apple</span>
              </button>

              {/* Email */}
              <button
                onClick={() => setStep('email-login')}
                className="w-full py-3 rounded-xl bg-[#1e293b]/70 hover:bg-[#1e293b] border border-slate-700/60 text-xs font-semibold text-slate-200 flex items-center justify-center gap-3 transition-all"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Continue with Email</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 text-center">
              <button
                onClick={() => handleCompleteOnboarding('Healthcare Learner')}
                className="text-xs text-slate-400 hover:text-slate-200 font-medium underline underline-offset-4"
              >
                Continue as Guest (Limited Features)
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Email Sign In Form */}
        {step === 'email-login' && (
          <form onSubmit={handleEmailLogin} className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('options')}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-base font-bold text-slate-100">Sign in with Email</h2>
              <div className="w-5" />
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.edu"
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <button type="button" className="text-[11px] text-sky-400 hover:underline">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-all shadow-md mt-2"
            >
              Sign In
            </button>

            <div className="text-center pt-2 text-xs text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setStep('email-register')}
                className="text-sky-400 font-semibold hover:underline"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Create Account Form */}
        {step === 'email-register' && (
          <form onSubmit={handleEmailRegister} className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('email-login')}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-base font-bold text-slate-100">Create Account</h2>
              <div className="w-5" />
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Alex Morgan"
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.edu"
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-all shadow-md mt-2"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Step 5: Optional Personalization (Section 10) */}
        {step === 'personalization' && (
          <div className="space-y-6 animate-in fade-in text-center">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-100">Welcome to MedRef AI</h2>
              <p className="text-xs text-slate-400">How will you primarily use MedRef AI?</p>
            </div>

            <div className="space-y-2 text-left">
              {[
                'Medical Student',
                'Healthcare Professional',
                'Researcher',
                'Educator',
                'Healthcare Learner',
                'Other'
              ].map((r) => (
                <button
                  key={r}
                  onClick={() => handleCompleteOnboarding(r)}
                  className={`w-full p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                    role === r
                      ? 'bg-sky-950 border-sky-500 text-sky-200'
                      : 'bg-[#090d16] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleCompleteOnboarding('Healthcare Learner')}
                className="text-xs text-slate-400 hover:text-slate-200 font-medium"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
