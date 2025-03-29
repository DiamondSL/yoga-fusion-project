import React, { FC } from 'react';
import {Box, styled, SxProps} from '@mui/material';
import {Theme} from "@mui/system";

// Styled component for the marquee container
const MarqueeContainer = styled(Box)(({theme}) => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: theme.palette.secondary.light
}));


interface Marquee {
    speed?: number
    children: React.ReactNode;
    style?: SxProps<Theme>;
    onClick?: () => void;

}

// Styled component for the marquee content with animation
const MarqueeContent = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'speed', // Prevent 'speed' from being passed to DOM
})<{ speed?: number }>(({speed = 50}) => ({
    display: 'inline-block',
    paddingLeft: '100%', // Start off-screen
    animation: `marquee ${speed}s linear infinite`,
    '@keyframes marquee': {
        '0%': {transform: 'translateX(-100%)'},
        '100%': {transform: 'translateX(0)'},
    },
}));

// Responsive adjustments using MUI's theme breakpoints
const ResponsiveMarqueeContent = styled(MarqueeContent)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        animationDuration: '30s', // Slower on small screens
    },
    [theme.breakpoints.up('md')]: {
        animationDuration: '50s', // Default speed on medium and larger screens
    },
}));

const Marquee: FC<Marquee> = ({onClick, style, children, speed}) => {
    return (
        <MarqueeContainer onClick={onClick}>
            <ResponsiveMarqueeContent  sx={{display: 'flex', gap: '18px', ...style}} speed={speed ?? 50}>
                {children}
            </ResponsiveMarqueeContent>
        </MarqueeContainer>
    );
};

export default Marquee;