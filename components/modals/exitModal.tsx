'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { useExitModal } from '@/store/useExitModal';
import { useRouter } from 'next/navigation';

const ExitModal = () => {
  const router = useRouter();
  const { isOpen, closeModal } = useExitModal();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center justify-center w-full mb-5">
            <Image src="/mascot/sad.svg" alt="exit" width={80} height={80} />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Wait, don’t go! You’ll lose your progress if you quit now
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex md:flex-col gap-4">
          <Button variant="primary" onClick={closeModal}>
            KEEP LEARNING
          </Button>
          <Button
            variant="dangerOutline"
            onClick={() => {
              router.push('/learn');
              closeModal();
            }}
          >
            END SESSION
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitModal;
