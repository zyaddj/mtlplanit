"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { FcGoogle } from 'react-icons/fc';

interface SignInDialogProps {
  onSignInSuccess?: () => void;
}

export function SignInDialog({ onSignInSuccess }: SignInDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      setIsOpen(false);
      onSignInSuccess?.();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setIsOpen(false);
      onSignInSuccess?.();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleContinueAnonymously = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-header-gradient">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] w-[95%] mx-auto dialog-background p-0 overflow-hidden border-blue-500/20">
        <DialogTitle className="sr-only">{isSignUp ? 'Sign Up' : 'Sign In'}</DialogTitle>
        <div className="bg-gradient-to-b from-blue-900/50 via-blue-900/20 to-transparent h-20 flex items-center justify-center px-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe_Express_-_file__1_-removebg-preview-KvoQDS38GTuBFzQ3hBAEWX81TmuwR9.png"
            alt="Planit Logo"
            width={120}
            height={40}
            className="w-auto h-12"
          />
        </div>

        <div className="px-4 sm:px-6 pb-6 space-y-4 sm:space-y-6">
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium flex items-center justify-center gap-2 py-2"
            >
              <FcGoogle className="w-5 h-5" />
              Continue with Google
            </Button>

            <Button
              type="button"
              onClick={handleContinueAnonymously}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2"
            >
              Continue as Guest
            </Button>
          </div>

          <div className="text-center pt-2">
            <Button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              variant="link"
              className="text-blue-400 hover:text-blue-300 font-medium text-base"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Create an account'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 