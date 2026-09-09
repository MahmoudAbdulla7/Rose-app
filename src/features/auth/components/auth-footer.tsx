import { Link } from '@/i18n/navigation';
import { Separator } from '@/shared/ui/separator';

type Props = {
  text: string;
  linkText?: string;
  href?: string | null;
};

export default function AuthFooter({ text, linkText, href }: Props) {
  return (
    <div className="mt-4 flex w-full flex-col content-center items-center justify-center 2xl:mt-9">
      <Separator />

      <div className="mt-5 flex gap-1 text-sm font-medium">
        <span>{text}</span>

        {linkText &&
          (href ? (
            <Link
              href={href}
              className="text-ds-primary hover:text-ds-primary-saturated text-sm font-bold"
            >
              {linkText}
            </Link>
          ) : (
            <span className="text-ds-primary cursor-not-allowed text-sm font-bold">{linkText}</span>
          ))}
      </div>
    </div>
  );
}
