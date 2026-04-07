import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-100 p-6',
        hover && 'hover:shadow-lg hover:shadow-slate-200/50 transition-shadow duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
