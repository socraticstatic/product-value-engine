import { useState } from 'react';
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0057b8] via-[#003d82] to-[#001a4d] px-4">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 space-y-8">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <img
              src={attGlobe}
              alt="AT&T"
              className="h-16 w-16 mx-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-[#1d2329] tracking-[-0.03em]">
                Product Value Engine
              </h1>
              <p className="text-sm text-[#686e74] mt-1">
                {sent ? 'Check your inbox' : 'Sign in with your AT&T email'}
              </p>
            </div>
          </div>

          {sent ? (
            /* ─── Confirmation State ─── */
            <div className="text-center space-y-6">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#e6f6fd] flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-[#0057b8]" />
              </div>
              <div className="space-y-2">
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
                className="text-sm font-medium text-[#0057b8] hover:text-[#003d82] transition-colors"
              >
                Use a different email
              </button>
            </div>
          ) : (
            /* ─── Login Form ─── */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-[#686e74] uppercase tracking-wide"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#878c94]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@att.com"
                    autoComplete="email"
                    autoFocus
                    className={`pl-10 h-11 border-[#686e74] focus-visible:ring-[#0057b8] focus-visible:border-[#0057b8] bg-white text-[#1d2329] placeholder:text-[#878c94] ${
                      errors.email ? 'border-[#c70032] focus-visible:ring-[#c70032]' : ''
                    }`}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-[#c70032] mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-[#0057b8] hover:bg-[#003d82] text-white font-medium rounded-lg transition-colors"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign in with Magic Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/40 mt-6">
          AT&T Internal Tool &middot; Authorized use only
        </p>
      </div>
    </div>
  );
}
