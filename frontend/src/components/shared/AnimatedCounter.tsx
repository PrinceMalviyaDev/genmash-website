'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ end, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, end, {
        duration,
        ease: 'easeOut',
        onUpdate: (v) => setValue(Math.round(v)),
      });
      return controls.stop;
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
