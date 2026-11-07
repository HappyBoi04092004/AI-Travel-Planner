'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { user, updateUser, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }

    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user, authLoading, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await axios.put(
        API_ENDPOINTS.updateProfile,
        {
          username,
          email
        },
        {
          headers: {
            ...getAuthHeaders()
          }
        }
      );

      updateUser(response.data.user);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await axios.put(
        API_ENDPOINTS.updateProfile,
        {
          password: newPassword
        },
        {
          headers: {
            ...getAuthHeaders()
          }
        }
      );

      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Home
          </button>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center gap-3 text-pink-700 dark:text-pink-300">
            <CheckCircleIcon className="w-5 h-5 text-pink-600" />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
            {error}
          </div>
        )}

        {/* Profile Information */}
        <div className="glass-card rounded-2xl p-8 border border-border-subtle shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <UserCircleIcon className="w-6 h-6 text-pink-600" />
            Profile Information
          </h2>

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border bg-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-border bg-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-pink-500/25 hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        {user.has_password && (
          <div className="glass-card rounded-2xl p-8 border border-border-subtle shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <KeyIcon className="w-6 h-6 text-pink-600" />
              Change Password
            </h2>

            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-border bg-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-border bg-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-pink-500/25 hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
