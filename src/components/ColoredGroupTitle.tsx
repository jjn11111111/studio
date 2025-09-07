'use client';

import { cn } from "@/lib/utils";

interface ColoredGroupTitleProps {
  title: string;
  className?: string;
}

export function ColoredGroupTitle({ title, className }: ColoredGroupTitleProps) {
  const parts = title.split(' ');
  
  const colorMap: { [key: string]: string } = {
    'Red': 'text-red-500',
    'Yellow': 'text-yellow-500',
    'Blue': 'text-blue-500',
  };

  return (
    <span className={cn(className)}>
      {parts.map((part, index) => {
        const colorClass = colorMap[part];
        if (colorClass) {
          return <span key={index} className={cn(colorClass, 'font-bold')}>{part}</span>;
        }
        return <span key={index}> {part} </span>;
      })}
    </span>
  );
}
