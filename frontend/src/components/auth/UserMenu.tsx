'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';
import {
  UserCircleIcon,
  BookmarkIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) {
    return (
      <>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              setAuthMode('signin');
              setShowAuthModal(true);
            }}
            className="px-3 sm:px-3.5 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthMode('signup');
              setShowAuthModal(true);
            }}
            style={{
              backgroundColor: '#db2777',
              backgroundImage: 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #ec4899 100%)',
              color: '#ffffff'
            }}
            className="px-4 py-1.5 text-xs font-black text-white rounded-xl shadow-md shadow-pink-900/25 hover:shadow-lg transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </div>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode={authMode}
        />
      </>
    );
  }

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
      >
        {user.profile_picture ? (
          <img
            src={user.profile_picture}
            alt={user.username}
            className="w-8 h-8 rounded-full ring-2 ring-rose-600/40"
          />
        ) : (
          <div
            style={{
              backgroundColor: '#be123c',
              backgroundImage: 'linear-gradient(135deg, #be123c 0%, #e11d48 100%)',
              color: '#ffffff'
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm shadow-xs shadow-rose-900/30"
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 hidden sm:inline">
          {user.username}
        </span>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          ></div>

          {/* Menu */}
          <div className="absolute top-12 right-0 z-50 w-56 bg-background border border-border-subtle rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
            {/* User info */}
            <div className="px-4 py-3 border-b border-border-subtle">
              <p className="text-sm font-semibold text-foreground">{user.username}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>

            {/* Menu items */}
            <div className="py-2">
              <button
                onClick={() => {
                  router.push('/profile');
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                <Cog6ToothIcon className="w-4 h-4 text-rose-600" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={() => {
                  router.push('/saved-trips');
                  setShowDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                <BookmarkIcon className="w-4 h-4 text-rose-600" />
                <span>Saved Trips ({user.trip_count})</span>
              </button>
            </div>

            {/* Sign out */}
            <div className="border-t border-border-subtle py-2">
              <button
                onClick={() => {
                  logout();
                  setShowDropdown(false);
                  router.push('/');
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
