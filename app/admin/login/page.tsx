'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1b1b1b] rounded-lg p-8 border border-[#484848]">
          <h1 className="text-[32px] font-extrabold text-white font-['Raleway'] mb-2 text-center">
            Admin Login
          </h1>
          <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono'] mb-8 text-center">
            Sign in to manage your portfolio
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[12px] text-white font-['IBM_Plex_Mono'] font-semibold block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded-[4px] px-[12px] h-[40px] text-[12px] text-[#080808] font-['IBM_Plex_Mono'] focus:outline-none focus:border-[#3f8e00]"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="text-[12px] text-white font-['IBM_Plex_Mono'] font-semibold block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded-[4px] px-[12px] h-[40px] text-[12px] text-[#080808] font-['IBM_Plex_Mono'] focus:outline-none focus:border-[#3f8e00]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-500 text-[12px] font-['IBM_Plex_Mono'] text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3f8e00] border border-[#62ba1b] text-white px-[24px] py-[12px] rounded-[4px] font-['IBM_Plex_Mono'] font-bold text-[14px] hover:bg-[#4aa100] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
