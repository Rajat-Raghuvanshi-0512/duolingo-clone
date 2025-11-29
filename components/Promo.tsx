import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/icons/hearts.svg" alt="promo" width={26} height={26} />
          <h3 className="text-lg font-bold">Upgrade to Pro</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Get unlimited hearts and earn more points
        </p>
      </div>
      <Button variant="super" className="w-full" size="lg" asChild>
        <Link href="/shop">Upgrade now</Link>
      </Button>
    </div>
  );
};

export default Promo;
