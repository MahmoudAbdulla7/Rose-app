import { cn } from '@/shared/lib/utils';
import { Separator } from '@/shared/ui/separator';

type AuthHeaderProps = {
  title: string;
  subtitle?: React.ReactNode;
  description: string;
  variant?: 'primary' | 'secondary';
};

export default function AuthHeader({
  title,
  subtitle,
  description,
  variant = 'primary',
}: AuthHeaderProps) {
  return (
    <>
      <div>
        <h1
          className={cn(
            'text-ds-text-plain',
            variant === 'primary' ? 'text-3xl font-bold' : 'text-2xl font-semibold',
          )}
        >
          {title}
        </h1>

        <p className="text-ds-text-plain mt-1">{description}</p>

        {subtitle && <div className="text-ds-primary mt-4 text-xl font-semibold">{subtitle}</div>}
      </div>

      <Separator className="mt-4 mb-6" />
    </>
  );
}
