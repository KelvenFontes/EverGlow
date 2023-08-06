import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'outlined' | 'danger' | 'dark';
}

function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primaryDarker rounded-full',
    dark: 'bg-dark text-whiteWater drop-shadow-[0_5px_5px_rgba(128,128,128,0.3)] rounded-xl',
    outlined: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    danger: 'text-red-500 border-red-500 border hover:bg-red-600 bg-transparent hover:text-white',
  };

  const _className = twMerge(variantClasses[variant], 'appearance-none p-4 text-sm font-medium shadow transition-all', className);

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  );
}

export default Button;
