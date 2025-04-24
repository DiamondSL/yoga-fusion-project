'use client'; // Ensure client-side rendering for Next.js

import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, CSSProperties, styled, SxProps} from '@mui/material';
import {Theme} from '@mui/system';

// Styled component for the marquee container
const MarqueeContainer = styled(Box)(({theme}) => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: theme.palette.secondary.light,
    minHeight: '40px', // Ensure visibility
}));

interface MarqueeProps {
    speed?: number;
    children?: React.ReactNode;
    content?: React.ReactNode;
    style?: SxProps<Theme>;
    onClick?: () => void;
    gap?: number | string;
    reverse?: boolean
}

// Styled component for the animated wrapper
const Wrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'speed',
})<{ speed: number }>(({speed}) => ({
    display: 'inline-block',
    animation: `marquee ${speed}s linear infinite`,
    '&:hover': {
        animationPlayState: 'paused',
    },
    '@keyframes marquee': {
        '0%': {transform: 'translateX(-50%)'},
        '100%': {transform: 'translateX(0%)'},
    },
}));

// Styled component for content with flex layout
const MarqueeContent = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'gap',
})<{ gap: number | string }>(({gap}) => ({
    display: 'flex',
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    flexShrink: 0,
}));

// Responsive adjustments for animation speed
const ResponsiveWrapper = styled(Wrapper)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        animationDuration: '15s',
    },
    [theme.breakpoints.between('sm', 'md')]: {
        animationDuration: '25s',
    },
    [theme.breakpoints.up('md')]: {
        animationDuration: '35s',
    },
}));

const Marquee: FC<MarqueeProps> = ({
                                       onClick,
                                       style,
                                       children,
                                       content,
                                       speed = 40,
                                       gap = 18,
                                       reverse = false,
                                   }) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const [contentWidth, setContentWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Measure container and content width
    useEffect(() => {
        const updateWidths = () => {
            if (containerRef.current && contentRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
                setContentWidth(contentRef.current.offsetWidth);
            }
        };
        updateWidths();
        window.addEventListener('resize', updateWidths);
        const observer = new ResizeObserver(updateWidths);
        if (containerRef.current) observer.observe(containerRef.current);
        return () => {
            window.removeEventListener('resize', updateWidths);
            observer.disconnect();
        };
    }, [children, content]);

    // Determine content to render
    const marqueeContent = content || children;
    if (!marqueeContent) return null;

    // Calculate repetitions to cover at least 2x container width
    const repeatCount = contentWidth > 0 && containerWidth > 0
        ? Math.ceil((containerWidth * 2) / (contentWidth + (Number(gap))))
        : 10;

    // Debugging output
    console.log({containerWidth, contentWidth, repeatCount});

    const reverseAnimation = {
        '@keyframes marquee': {
            '0%': {transform: 'translateX(0%)'},
            '100%': {transform: 'translateX(-50%)'},
        }
    } as CSSProperties

    return (
        <MarqueeContainer ref={containerRef} onClick={onClick} sx={style}>
            <ResponsiveWrapper speed={speed} style={reverse ?
                reverseAnimation : {}}>
                <MarqueeContent gap={gap}>
                    {Array.from({length: repeatCount}).map((_, index) => (
                        <Box
                            key={`first-${index}`}
                            ref={index === 0 ? contentRef : null}
                            sx={{display: 'inline-block'}}
                        >
                            {marqueeContent}
                        </Box>
                    ))}
                </MarqueeContent>
            </ResponsiveWrapper>
        </MarqueeContainer>
    );
};

export default Marquee;