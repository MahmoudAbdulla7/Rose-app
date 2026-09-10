import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { Loader2 } from 'lucide-react';
import { cn } from 'shared/lib/utils';
import { useTranslations } from 'next-intl';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center gap-2 justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: `
          bg-ds-primary text-ds-text-inverse 
          hover:bg-ds-primary-saturated cursor-pointer 
          disabled:bg-ds-soft disabled:text-ds-text-muted
        `,
        secondary: `
          bg-ds-primary-fade text-ds-primary dark:text-ds-text-plain 
          hover:bg-ds-primary-faint cursor-pointer 
          disabled:bg-ds-soft disabled:text-ds-text-muted dark:disabled:text-ds-text-muted
        `,
        outline: `
          bg-ds-plain text-ds-primary border border-ds-primary 
          hover:bg-ds-primary-fade cursor-pointer 
          disabled:bg-ds-soft disabled:border-transparent disabled:text-ds-text-muted
        `,
        subtle: `
          bg-ds-muted text-ds-text-plain border border-ds-border-soft 
          hover:bg-ds-soft cursor-pointer dark:hover:border-ds-primary 
          disabled:bg-ds-soft disabled:border-transparent disabled:text-ds-text-muted
        `,
        ghost: `
          bg-transparent text-ds-text-plain 
          hover:bg-ds-soft cursor-pointer dark:hover:bg-ds-soft 
          disabled:bg-ds-soft disabled:text-ds-text-muted dark:disabled:bg-ds-soft
        `,
        destructive: `
          bg-ds-danger text-ds-text-inverse 
          hover:bg-ds-danger-saturated cursor-pointer 
          disabled:bg-ds-soft disabled:text-ds-text-muted
        `,
        soft: `
          bg-ds-subtle text-ds-text-plain border border-ds-border-default 
          hover:bg-ds-soft cursor-pointer dark:hover:border-ds-primary 
          disabled:bg-ds-soft disabled:border-transparent disabled:text-ds-text-muted
        `,
      },
      size: {
        default:
          'h-input gap-1.5 px-4 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',
        xl: 'h-11 gap-1.5 px-6 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
        'icon-rounded': 'size-9 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

function Button({
  className,
  variant = 'primary',
  size = 'default',
  disabled,
  loading = false,
  leftIcon,
  rightIcon,
  render,
  nativeButton,
  ...props
}: ButtonProps) {
  const t = useTranslations('common');

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      nativeButton={nativeButton ?? !render}
      render={render}
      {...props}
    >
      {(loading || leftIcon) && (
        <span className="inline-flex items-center">
          {loading ? <Loader2 className="animate-spin" /> : leftIcon}
        </span>
      )}

      {loading ? t('button.loading') : props.children}

      {!loading && rightIcon && <span className="inline-flex items-center">{rightIcon}</span>}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
