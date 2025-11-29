'use client';
import { refillHearts } from '@/actions/userProgress';
import { createStripeUrl } from '@/actions/userSubscription';
import { Button } from '@/components/ui/button';
import { MAX_HEARTS, POINTS_PRICE } from '@/lib/constants';
import Image from 'next/image';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};
const Items = ({ hearts, points, hasActiveSubscription }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    startTransition(async () => {
      await refillHearts().catch((error) => {
        toast.error(error.message);
      });
    });
  };

  const onUpgrade = () => {
    startTransition(async () => {
      await createStripeUrl()
        .then((redirectUrl) => {
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };
  return (
    <ul className="w-full">
      <div className="flex items-center gap-x-4 p-4 w-full border-t-2">
        <Image src="/icons/hearts.svg" alt="heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-base font-bold lg:text-xl text-neutral-700">
            Refill Hearts
          </p>
        </div>
        <Button
          disabled={hearts === MAX_HEARTS || points < POINTS_PRICE || pending}
          onClick={onRefillHearts}
        >
          {hearts === MAX_HEARTS ? (
            'full'
          ) : (
            <div className="flex items-center">
              <Image
                src="/icons/points.svg"
                alt="points"
                width={20}
                height={20}
              />
              <p>{POINTS_PRICE}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center gap-x-4 p-4 w-full border-t-2">
        <Image src="/icons/hearts.svg" alt="heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-base font-bold lg:text-xl text-neutral-700">
            Unlimited Hearts
          </p>
        </div>
        <Button variant="default" disabled={pending} onClick={onUpgrade}>
          {hasActiveSubscription ? 'Active' : 'Upgrade'}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
