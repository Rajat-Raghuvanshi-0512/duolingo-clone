import { InfinityIcon, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { useExitModal } from '@/store/useExitModal';

type HeaderProps = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

const Header = ({ hearts, percentage, hasActiveSubscription }: HeaderProps) => {
  const { openModal } = useExitModal();
  return (
    <header className="lg:pt-[50px] pt-5 px-10 gap-x-7 flex items-center justify-between max-w-5xl mx-auto w-full">
      <X
        onClick={() => openModal()}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />

      <Progress value={percentage} className="h-4 bg-slate-200" />
      <div className="text-red-500 flex items-center font-bold">
        <Image
          src="/icons/hearts.svg"
          alt="hearts"
          width={28}
          height={28}
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="size-6 stroke-3" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};

export default Header;
