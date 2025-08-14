'use client';;
import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export const Stories = ({
  className,
  opts,
  ...props
}) => (
  <Carousel
    className={cn('w-full', className)}
    opts={{
      align: 'start',
      loop: false,
      dragFree: true,
      ...opts,
    }}
    {...props} />
);

export const StoriesContent = ({
  className,
  ...props
}) => (
  <CarouselContent className={cn('-ml-2 gap-2', className)} {...props} />
);

export const Story = ({
  className,
  ...props
}) => (
  <CarouselItem className={cn('pl-2 md:pl-4 w-[120px] flex-shrink-0', className)}>
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl bg-muted/40 w-full aspect-[16/9]',
        'cursor-pointer transition-all duration-200',
        'hover:scale-[1.02] hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      role="button"
      tabIndex={0}
      {...props} />
  </CarouselItem>
);

const tRegex = /t=(\d+(?:\.\d+)?)/;

export const StoryVideo = ({
  className,
  ...props
}) => {
  const videoRef = useRef(null);
  const initialTimeRef = useRef(0);

  // Parse the initial time from the src attribute (e.g., #t=20)
  useEffect(() => {
    const src = (props.src ?? '');
    let initialTime = 0;
    if (typeof src === 'string') {
      const hashIndex = src.indexOf('#');
      if (hashIndex !== -1) {
        const hash = src.slice(hashIndex + 1);
        // Look for t=number or t=start,end
        const tMatch = hash.match(tRegex);
        if (tMatch) {
          initialTime = Number.parseFloat(tMatch[1]);
        }
      }
    }
    initialTimeRef.current = initialTime;
  }, [props.src]);

  const handleMouseOver = () => {
    videoRef.current?.play();
  };

  const handleMouseOut = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  const handleFocus = () => {
    videoRef.current?.play();
  };

  const handleBlur = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = initialTimeRef.current;
    }
  };

  return (
    <video
      className={cn(
        'absolute inset-0 size-full object-cover',
        'transition-opacity duration-200',
        'group-hover:opacity-90',
        className
      )}
      loop
      muted
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
      preload="metadata"
      ref={videoRef}
      tabIndex={0}
      {...props} />
  );
};

export const StoryImage = ({
  className,
  alt,
  ...props
}) => (
  // biome-ignore lint/performance/noImgElement: "Kibo UI is framework agnostic"
  (<img
    alt={alt}
    className={cn(
      'absolute inset-0 h-full w-full object-cover',
      'transition-opacity duration-200',
      'group-hover:opacity-90',
      className
    )}
    {...props} />)
);

export const StoryAuthor = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn('absolute right-0 bottom-0 left-0 z-10', 'p-3 text-white', className)}
    {...props}>
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

export const StoryAuthorImage = ({
  src,
  fallback,
  name,
  className,
  ...props
}) => (
  <Avatar className={cn('size-6 border border-white/20', className)} {...props}>
    {src && <AvatarImage alt={name} src={src} />}
    <AvatarFallback className='bg-white/10 text-white text-xs'>
      {fallback || name?.charAt(0)?.toUpperCase()}
    </AvatarFallback>
  </Avatar>
);

export const StoryAuthorName = ({
  className,
  ...props
}) => (
  <span className={cn('truncate font-medium text-sm', className)} {...props} />
);

export const StoryTitle = ({
  className,
  ...props
}) => (
  <div
    className={cn('absolute top-0 right-0 left-0 z-10', 'p-3 text-white', className)}
    {...props} />
);

export const StoryOverlay = ({
  className,
  side = 'bottom',
  ...props
}) => {
  const positionClasses =
    side === 'top' ? 'top-0 bg-gradient-to-b' : 'bottom-0 bg-gradient-to-t';

  return (
    <div
      className={cn(
        'absolute right-0 left-0 h-10 from-black/20 to-transparent',
        positionClasses,
        className
      )}
      {...props} />
  );
};
