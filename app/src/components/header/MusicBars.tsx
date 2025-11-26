'use client';

import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

interface MusicBarsProps {
  isPlaying?: boolean;
  className?: string;
}

export const MusicBars: React.FC<MusicBarsProps> = ({
  isPlaying = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<Animation[]>([]); // Храним ссылки на анимации

  const initialScales = [0.64, 0.21, 0.57, 0.86, 0.21];

  useEffect(() => {
    if (!containerRef.current || !isPlaying) return;

    const bars = containerRef.current.children as HTMLCollectionOf<HTMLElement>;
    const animations: Animation[] = [];

    Array.from(bars).forEach((bar, i) => {
      // Сбрасываем возможные предыдущие fill-моды
      bar.style.transform = `scaleY(${initialScales[i]})`;

      const animation = bar.animate(
        [
          { transform: `scaleY(${initialScales[i]})` },
          { transform: `scaleY(${Math.random() * 0.5 + 0.3})` },
          { transform: `scaleY(${Math.random() * 0.6 + 0.4})` },
          { transform: `scaleY(${Math.random() * 0.7 + 0.5})` },
          { transform: `scaleY(${initialScales[i]})` },
        ],
        {
          duration: 800 + Math.random() * 1200,
          iterations: Infinity,
          direction: 'alternate',
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          delay: i * 80 + Math.random() * 100,
        }
      );

      animations.push(animation);
    });

    animationsRef.current = animations;

    // При уходе с isPlaying = true — просто ставим на паузу
    return () => {
      animations.forEach(anim => anim.pause()); // ← Только pause, не cancel!
    };
  }, [isPlaying]);

  // Отдельный эффект: когда isPlaying меняется на false — пауза
  // Когда на true — возобновление
  useEffect(() => {
    if (!isPlaying) {
      animationsRef.current.forEach(anim => {
        if (anim.playState !== 'paused' && anim.playState !== 'finished') {
          anim.pause();
        }
      });
    } else {
      animationsRef.current.forEach(anim => {
        if (anim.playState === 'paused') {
          anim.play(); // Возобновляем с того места, где остановились
        }
      });
    }
  }, [isPlaying]);

  // Опционально: плавное затухание при длительной паузе (если хочешь)
  // Но по твоему запросу — просто заморозка, поэтому можно убрать второй useEffect из старого кода

  return (
    <div
      ref={containerRef}
      className={clsx('relative flex items-center justify-between', className)}
      style={{ width: '18px', height: '16px' }}
    >
      {initialScales.map((scale, i) => (
        <div
          key={i}
          className="absolute w-[2px] bg-current rounded-full origin-center"
          style={{
            left: `${1 + i * 4}px`,
            height: '14px',
            top: '1px',
            transform: `scaleY(${scale})`,
          }}
        />
      ))}
    </div>
  );
};

export default MusicBars;