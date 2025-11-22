import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ClerkLoading,
  ClerkLoaded,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
  SignedOut,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="hidden lg:block h-20 w-full border-b-2 p-2 border-slate-200">
      <div className="lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ClerkLoading>
            <Loader className="size-6 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl={'/learn'}>
                <Button size="lg" variant="ghost">
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal" forceRedirectUrl={'/learn'}>
                <Button size="lg" variant="ghost">
                  Register
                </Button>
              </SignUpButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
