'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface HeroContent {
  name: string;
  intro_text: string;
  profile_photo_url: string;
}

interface HeroEditorProps {
  initialData: HeroContent;
}

export default function HeroEditor({ initialData }: HeroEditorProps) {
  const [name, setName] = useState(initialData.name);
  const [introText, setIntroText] = useState(initialData.intro_text);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(initialData.profile_photo_url);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          intro_text: introText,
          profile_photo_url: profilePhotoUrl,
        }),
      });

      if (response.ok) {
        setMessage('Changes saved successfully!');
        router.refresh();
      } else {
        setMessage('Failed to save changes');
      }
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/admin"
          className="text-[#3f8e00] font-['IBM_Plex_Mono'] text-[14px] hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-[#1b1b1b] border border-[#484848] rounded-lg p-6">
        <h2 className="text-[24px] font-bold text-white font-['Raleway'] mb-6">
          Hero Section
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-[12px] text-white font-['IBM_Plex_Mono'] font-semibold block mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded-[4px] px-[12px] h-[40px] text-[12px] text-[#080808] font-['IBM_Plex_Mono'] focus:outline-none focus:border-[#3f8e00]"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="text-[12px] text-white font-['IBM_Plex_Mono'] font-semibold block mb-1">
              Intro Text
            </label>
            <textarea
              required
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              rows={4}
              className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded-[4px] px-[12px] py-[12px] text-[12px] text-[#080808] font-['IBM_Plex_Mono'] focus:outline-none focus:border-[#3f8e00]"
              placeholder="Your introduction text..."
            />
          </div>

          <div>
            <label className="text-[12px] text-white font-['IBM_Plex_Mono'] font-semibold block mb-1">
              Profile Photo URL
            </label>
            <input
              type="url"
              required
              value={profilePhotoUrl}
              onChange={(e) => setProfilePhotoUrl(e.target.value)}
              className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded-[4px] px-[12px] h-[40px] text-[12px] text-[#080808] font-['IBM_Plex_Mono'] focus:outline-none focus:border-[#3f8e00]"
              placeholder="https://..."
            />
            <p className="text-[10px] text-[#9c9c9c] font-['IBM_Plex_Mono'] mt-1">
              Upload your image to a service like Imgur or use Vercel Blob Storage
            </p>
          </div>

          {profilePhotoUrl && (
            <div className="mt-4">
              <p className="text-[12px] text-white font-['IBM_Plex_Mono'] font-semibold mb-2">
                Preview:
              </p>
              <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-[#62ba1b]">
                <Image
                  src={profilePhotoUrl}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {message && (
          <p className={`mt-4 text-[12px] font-['IBM_Plex_Mono'] ${
            message.includes('success') ? 'text-[#3f8e00]' : 'text-red-500'
          }`}>
            {message}
          </p>
        )}

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#3f8e00] border border-[#62ba1b] text-white px-[24px] py-[12px] rounded-[4px] font-['IBM_Plex_Mono'] font-bold text-[14px] hover:bg-[#4aa100] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin"
            className="bg-transparent border border-[#484848] text-white px-[24px] py-[12px] rounded-[4px] font-['IBM_Plex_Mono'] font-bold text-[14px] hover:border-[#9c9c9c] transition-colors inline-block text-center"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
