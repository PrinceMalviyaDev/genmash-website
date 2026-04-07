import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl mb-14', centered && 'mx-auto text-center')}>
      {subtitle && (
        <p
          className={cn(
            'font-semibold text-sm tracking-wide uppercase mb-3',
            light ? 'text-blue-400' : 'text-blue-600'
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl font-bold',
          light ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>
    </div>
  );
}
