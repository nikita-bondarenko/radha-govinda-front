// components/ui/TextSlideUp.tsx
import clsx from "clsx";
import React, { memo } from "react";

type TextSlideUpProps = {
  children: string;
  className?: string;
};

export const TextSlideUp = memo(function TextSlideUp({
  children,
  className,
}: TextSlideUpProps) {
  if (!children) return null;

  return (
    <span className={clsx("group relative block overflow-hidden leading-none", className)}>
      {/* Фиксированная высота строки */}
      <span className="inline-block py-1">
        {/* Оригинальный текст — уезжает вниз */}
        <span
          className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-y-full"
          style={{ willChange: "transform" }}
        >
          {children}
        </span>

        {/* Дубликат — въезжает сверху */}
        <span
          className="absolute inset-0 inline-block transition-transform duration-300 ease-in-out translate-y-[-100%] group-hover:translate-y-0"
          style={{ willChange: "transform" }}
        >
          {children}
        </span>
      </span>

      {/* Для скринридеров */}
      <span className="sr-only">{children}</span>
    </span>
  );
});