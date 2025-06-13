import { cn } from '@/lib/utils';
import React from 'react';

interface BookProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  texture?: boolean;
  depth?: number;
  variant?: 'default' | 'simple';
  illustration?: React.ReactNode;
  width?: number;
}

type FlexAlignItems = 'stretch' | 'start' | 'end' | 'center';
type FlexJustifyContent =
  | 'stretch'
  | 'start'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'center';

interface StackProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  direction?: 'column' | 'row';
  align?: FlexAlignItems;
  justify?: FlexJustifyContent;
  gap?: number;
  padding?: number;
  grow?: boolean;
  shrink?: boolean;
  wrap?: boolean;
  className?: string;
}

function Stack(props: StackProps) {
  const {
    children,
    shrink = false,
    grow = false,
    justify = 'start',
    align = 'start',
    wrap = false,
    padding = 0,
    gap = 0,
    direction = 'column',
    className,
    ...etc
  } = props;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flex: 'initial',
        flexDirection: direction,
        alignItems:
          align === 'start'
            ? 'flex-start'
            : align === 'end'
              ? 'flex-end'
              : align,
        justifyContent:
          justify === 'start'
            ? 'flex-start'
            : justify === 'end'
              ? 'flex-end'
              : justify,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        flexGrow: grow ? 1 : 0,
        flexShrink: shrink ? 1 : 0,
        padding: padding * 4 + 'px',
        gap: gap * 4 + 'px',
      }}
      {...etc}
    >
      {children}
    </div>
  );
}

export function Book(props: BookProps) {
  const {
    children,
    color = '#f50537',
    depth,
    texture,
    variant = 'default',
    textColor,
    illustration,
    width,
  } = props;
  return (
    <div
      className={cn('w-fit [perspective:900px] inline-block group')}
      style={{
        '--book-color': color || '#f50537',
        '--text-color': textColor || '#000',
        '--book-depth': (depth || 4) + 'px',
        '--book-width': (width || 196) + 'px',
        minWidth: width ? width + 'px' : '196px',
        minHeight: '240px', // Ensures visibility
        backgroundColor: color || '#f50537', // Fallback for browsers not supporting custom props
      } as React.CSSProperties}
    >
      <div className="border-l-4 border-l-black/50 contain-inline-size aspect-[49/60] w-fit rotate-0 relative [transform-style:preserve-3d] min-w-[calc(var(--book-width,196px))] min-h-[240px] transition-transform duration-500 ease-out group-hover:[transform:rotateY(-20deg)_scale(1.066)translateX(-8px)] bg-[var(--book-color,#f50537)]">
        <Stack
          align="stretch"
          className="rounded-l border border-border rounded-r shadow-book bg-gray-50 w-full h-full absolute overflow-hidden min-h-[240px] z-10"
        >
          {variant !== 'simple' && (
            <Stack
              shrink
              grow
              direction="row"
              className={cn(
                'min-w-[calc(var(--book-width,196px))] bg-[var(--book-color,#f50537)] relative overflow-hidden z-20',
              )}
            >
              <div className="absolute inset-y-0 mix-blend-overlay opacity-100 min-w-[8.2%] bg-book-bind-bg min-h-[240px] z-30" />
              {illustration && (
                <div className="object-cover z-30">{illustration}</div>
              )}
            </Stack>
          )}
          <Stack grow={variant === 'simple'} direction="row" className="h-fit min-h-[240px] z-20">
            <div className="mix-blend-overlay opacity-100 min-w-[8.2%] bg-book-bind-bg h-full min-h-[240px] z-30" />
            <div className="contain-inline-size w-full min-h-[240px] z-40 relative">{children}</div>
          </Stack>
          {texture && (
            <div
              aria-hidden={true}
              className="absolute bg-ali bg-no-repeat bg-cover inset-0 mix-blend-hard-light opacity-60 min-h-[240px] z-0"
            />
          )}
        </Stack>
        <div
          aria-hidden={true}
          className="absolute bg-book-pages w-[calc(var(--book-depth,4px)-2px)] h-[calc(100%-2*6px)] top-[3px] min-h-[240px] z-0"
          style={{
            transform:
              'translateX(calc(var(--book-width,196px) - var(--book-depth,4px) / 2 - 3px)) rotateY(90deg) translateX(calc(var(--book-depth,4px) / 2))',
          }}
        />
        <div
          aria-hidden={true}
          className="rounded-l-md rounded-r bg-[var(--book-color,#f50537)] book-bg absolute left-0 w-full h-full min-h-[240px] z-0"
          style={{
            transform: 'translateZ(calc(-1 * var(--book-depth,4px)))',
          }}
        />
      </div>
    </div>
  );
}

export { Stack };
