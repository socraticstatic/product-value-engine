import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import attGlobe from '@/assets/att-globe.png';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address')
    .refine((v) => v.toLowerCase().endsWith('@att.com'), {
      message: 'Only @att.com email addresses are allowed',
    }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { user, loading: authLoading } = useAuth();
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const [mounted, setMounted] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // Already authenticated — go to app
  if (!authLoading && user) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (data: LoginForm) => {
    const email = data.email.toLowerCase().trim();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/product-value-engine/`,
      },
    });

    if (error) {
      if (error.status === 429) {
        toast.error('Too many requests. Please wait a minute and try again.');
      } else {
        toast.error(error.message || 'Failed to send magic link');
      }
      return;
    }

    setSentEmail(email);
    setSent(true);
  };

  const onError = () => {
    setShakeError(true);
    setTimeout(() => setShakeError(false), 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0057b8] via-[#003d82] to-[#001a4d] px-4 overflow-hidden">
      {/* Animated dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
          animation: 'patternDrift 20s linear infinite',
        }}
      />

      {/* Ambient glow behind card */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, #009fdb 0%, transparent 70%)',
          animation: 'ambientPulse 6s ease-in-out infinite',
        }}
      />

      <div
        className={`relative w-full max-w-md transition-all duration-700 ease-out ${
          mounted
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 space-y-8 relative overflow-hidden">
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#009fdb] to-transparent opacity-60" />

          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <img
                src={attGlobe}
                alt="AT&T"
                className="h-16 w-16 mx-auto transition-transform duration-500 hover:scale-110"
                style={{ animation: 'logoFloat 4s ease-in-out infinite' }}
              />
              {/* Logo glow ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: '0 0 20px 4px rgba(0, 159, 219, 0.15)',
                  animation: 'glowPulse 3s ease-in-out infinite',
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1d2329] tracking-[-0.03em]">
                Product Value Engine
              </h1>
              <p
                className={`text-sm text-[#686e74] mt-1 transition-all duration-500 ${
                  sent ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                }`}
                style={{ transitionDelay: sent ? '0ms' : '200ms' }}
              >
                Sign in with your AT&T email
              </p>
            </div>
          </div>

          {/* Content area with crossfade */}
          <div className="relative min-h-[180px]">
            {/* Confirmation State */}
            <div
              className={`transition-all duration-500 ease-out ${
                sent
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95 pointer-events-none absolute inset-0'
              }`}
            >
              {sent && (
                <div className="text-center space-y-6">
                  <div
                    className="mx-auto w-14 h-14 rounded-full bg-[#e6f6fd] flex items-center justify-center"
                    style={{ animation: 'checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
                  >
                    <CheckCircle2 className="h-7 w-7 text-[#0057b8]" />
                  </div>
                  <div
                    className="space-y-2"
                    style={{ animation: 'fadeSlideUp 0.5s ease-out 0.2s both' }}
                  >
                    <p className="text-[#454b52] text-sm">
                      We sent a magic link to
                    </p>
                    <p className="text-[#1d2329] font-medium text-base">
                      {sentEmail}
                    </p>
                    <p className="text-[#686e74] text-xs leading-relaxed mt-3">
                      Click the link in your email to sign in.
                      <br />
                      It may take a minute to arrive.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setSentEmail(''); }}
                    className="text-sm font-medium text-[#0057b8] hover:text-[#003d82] transition-all duration-200 hover:translate-x-[-2px] group"
                    style={{ animation: 'fadeSlideUp 0.5s ease-out 0.4s both' }}
                  >
                    <span className="inline-flex items-center gap-1">
                      <ArrowRight className="h-3 w-3 rotate-180 transition-transform group-hover:translate-x-[-3px]" />
                      Use a different email
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Login Form */}
            <div
              className={`transition-all duration-400 ease-out ${
                sent
                  ? 'opacity-0 -translate-y-4 scale-95 pointer-events-none absolute inset-0'
                  : 'opacity-100 translate-y-0 scale-100'
              }`}
            >
              {!sent && (
                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-[#686e74] uppercase tracking-wide"
                    >
                      Email address
                    </label>
                    <div
                      className={`relative group ${shakeError ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
                    >
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#878c94] transition-colors duration-200 group-focus-within:text-[#0057b8]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="yourname@att.com"
                        autoComplete="email"
                        autoFocus
                        className={`pl-10 h-11 bg-white text-[#1d2329] placeholder:text-[#878c94] transition-all duration-200
                          border-[#686e74] focus-visible:ring-[#0057b8] focus-visible:border-[#0057b8]
                          focus-visible:shadow-[0_0_0_3px_rgba(0,87,184,0.1)]
                          ${errors.email
                            ? 'border-[#c70032] focus-visible:ring-[#c70032] focus-visible:shadow-[0_0_0_3px_rgba(199,0,50,0.1)]'
                            : ''
                          }`}
                        {...register('email')}
                      />
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${errors.email ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-xs text-[#c70032] mt-1">
                        {errors.email?.message}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-[#0057b8] hover:bg-[#003d82] active:scale-[0.98] text-white font-medium rounded-lg
                      transition-all duration-200 hover:shadow-lg hover:shadow-[#0057b8]/20 group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Sign in with Magic Link
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p
          className={`text-center text-xs text-white/40 mt-6 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          AT&T Internal Tool &middot; Authorized use only
        </p>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes patternDrift {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes ambientPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.1); opacity: 0.25; }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(5px); }
          45% { transform: translateX(-4px); }
          60% { transform: translateX(3px); }
          75% { transform: translateX(-2px); }
        }
      `}</style>
    </div>
  );
}
