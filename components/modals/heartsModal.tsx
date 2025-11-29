'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import { useHeartsModal } from '@/store/useHeartsModal';
import { useRouter } from 'next/navigation';

const HeartsModal = () => {
  const router = useRouter();
  const { isOpen, closeModal } = useHeartsModal();

  const onClick = () => {
    closeModal();
    router.push('/store');
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center justify-center w-full mb-5">
            <Image src="/mascot/sad.svg" alt="exit" width={80} height={80} />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            You ran out of hearts!{' '}
          </DialogTitle>
          <DialogDescription className="text-center">
            Get pro for unlimited hearts or purchase more hearts in the shore.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex md:flex-col gap-4">
          <Button variant="primary" onClick={onClick}>
            Get unlimited hearts
          </Button>
          <Button variant="primaryOutline" onClick={closeModal}>
            No thanks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HeartsModal;
