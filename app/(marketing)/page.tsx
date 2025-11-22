import { Button } from '@/components/ui/button';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const MarketingPage = () => {
  return (
    <div className="max-w-[988px] mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[420px] lg:h-[420px] mb-8 lg:mb-0">
        <Image src="/hero.svg" alt="hero" width={420} height={420} />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <h1 className="text-3xl font-extrabold text-neutral-600 max-w-[480px] text-center">
          Learn, practice and master language with lingo.
        </h1>
        <div className="flex flex-col gap-y-3 items-center max-h-[330px] w-full">
          <ClerkLoading>
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal" forceRedirectUrl={'/learn'}>
                <Button className="w-full" size="lg" variant="secondary">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" forceRedirectUrl={'/learn'}>
                <Button className="w-full" size="lg" variant="primaryOutline">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button className="w-full" size="lg" variant="secondary">
                <Link href="/learn">Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;
