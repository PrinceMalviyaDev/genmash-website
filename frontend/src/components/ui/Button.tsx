'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25',
  secondary: 'bg-slate-900 text-white hover:bg-slate-800',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  ghost: 'text-slate-700 hover:bg-slate-100',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  isLoading,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all',
    variants[variant],
    sizes[size],
    (disabled || isLoading) && 'opacity-60 cursor-not-allowed',
    className
  );

  const content = isLoading ? (
    <>
      <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      Loading...
    </>
  ) : (
    children
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {content}
    </motion.button>
  );
}
