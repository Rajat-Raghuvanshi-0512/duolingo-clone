import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';
import { darkenColor } from '@/lib/constants';

const colors = [
  '#3b82f6',
  '#10b981',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#eab308',
];
type UnitBannerProps = {
  title: string;
  description: string;
  order?: number;
};

const UnitBanner = ({ title, description, order }: UnitBannerProps) => {
  let hash = 0;
  for (let i = 0; i < (order || 0); i++) {
    hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0;
  }
  const colorIndex = Math.abs(hash) % colors.length;
  const randomColor = colors[colorIndex];
  const darkerColor = darkenColor(randomColor);

  return (
    <div
      className={cn(
        'rounded-xl w-full p-5 text-white flex items-center justify-between'
      )}
      style={{ backgroundColor: randomColor }}
    >
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg text-slate-100 font-bold">{description}</p>
      </div>
      <Link href={`/lesson`}>
        <Button
          variant="secondary"
          size="lg"
          className="hidden lg:flex border-2 border-b-4 active:border-b-2"
          style={{ backgroundColor: randomColor, borderColor: darkerColor }}
        >
          <NotebookText className="size-6 mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};

export default UnitBanner;
