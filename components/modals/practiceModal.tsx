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
import { usePracticeModal } from '@/store/usePracticeModal';

const PracticeModal = () => {
  const { isOpen, closeModal } = usePracticeModal();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center justify-center w-full mb-5">
            <Image src="/icons/hearts.svg" alt="exit" width={80} height={80} />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Practice mode!{' '}
          </DialogTitle>
          <DialogDescription className="text-center">
            Use Practice lessons to get hearts back. Practice mode is a mode
            where you can practice the lesson without losing hearts.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex md:flex-col gap-4">
          <Button variant="primary" onClick={closeModal}>
            I understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PracticeModal;
