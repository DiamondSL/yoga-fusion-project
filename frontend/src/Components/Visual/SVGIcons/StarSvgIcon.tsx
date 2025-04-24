// components/StarSvgIcon.tsx
'use client';

import React, { FC, useEffect, useRef } from "react";
import Image from "next/image";
import { SvgIcon } from "@mui/material";
import Star from "@/icons/Stars/Star.svg";

interface StarSvgIconProps {
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    animated?: boolean;
}

const StarSvgIcon: FC<StarSvgIconProps> = ({
                                               className,
                                               id,
                                               style,
                                               animated = false,
                                           }) => {
    const starRef = useRef<HTMLImageElement | SVGSVGElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const transformRef = useRef({
        x: !animated && style?.transform && style?.transform.includes('transformX') ? Number(style.transform?.replace( /[^\d.]/g, '' )) : Math.random() * 6 - 3, // Reduced initial translate to -3 to 3px
        y: !animated && style?.transform && style?.transform.includes('transformY') ? Number(style.transform?.replace( /[^\d.]/g, '' )) : Math.random() * 6 - 3,
        scale: 1, // Initial scale
        rotate: !animated ? Math.random() * 10 - 5 : 0, // Reduced initial rotation to -5 to 5deg
    });

    useEffect(() => {
        if (!animated || !starRef.current) return;

        const animateStar = () => {
            if (starRef.current) {
                const transformX = style?.transform && style?.transform.includes('transformX');
                const transformY = style?.transform && style?.transform.includes('transformY') ;
                // Translation (reduced range)
                const getRandomOffset = () => Math.random() * 3 + 5; // 5-8px instead of 10-15px
                const directionX = Math.random() > 0.5 ? 1 : -1;
                const directionY = Math.random() > 0.5 ? 1 : -1;

                let newX = transformX ? transformRef.current.x : transformRef.current.x + getRandomOffset() * directionX;
                let newY = transformY ? transformRef.current.y : transformRef.current.y + getRandomOffset() * directionY;
                newX = transformX ? newX : Math.max(-10, Math.min(10, newX)); // Reduced boundary to ±10px
                newY = transformY ? newY : Math.max(-10, Math.min(10, newY));

                // Scaling (more subtle)
                const scaleDirection = Math.random() > 0.5 ? 1 : -1;
                let newScale = transformRef.current.scale + (Math.random() * 0.03 * scaleDirection); // Reduced from 0.05 to 0.03
                newScale = Math.max(0.95, Math.min(1.05, newScale)); // 95% to 105% instead of 90% to 110%

                // Rotation (more subtle)
                const rotateDirection = Math.random() > 0.5 ? 1 : -1;
                let newRotate = transformRef.current.rotate + (Math.random() * 2 * rotateDirection); // Reduced from 5 to 2 degrees
                newRotate = Math.max(-10, Math.min(10, newRotate)); // Reduced to ±10° from ±20°

                // Update transform values
                transformRef.current.x = newX;
                transformRef.current.y = newY;
                transformRef.current.scale = newScale;
                transformRef.current.rotate = newRotate;

                // Apply combined transform
                starRef.current.style.transform = animated ? `translate(${newX}px, ${newY}px) scale(${newScale}) rotate(${newRotate}deg)` : 'none';
            }

            animationFrameRef.current = requestAnimationFrame(animateStar);
        };

        // Set initial transform
        starRef.current.style.transform = animated ? `translate(${transformRef.current.x}px, ${transformRef.current.y}px) 
      scale(${transformRef.current.scale}) 
      rotate(${transformRef.current.rotate}deg)` : 'none';
        animationFrameRef.current = requestAnimationFrame(animateStar);

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [animated, style?.transform]);

    if (style?.width || style?.height) {
        const width = Number(style.width?.toString().replace("px", "")) ?? 22;
        const height = Number(style.height?.toString().replace("px", "")) ?? 20;
        return (
            <Image
                ref={starRef as React.RefObject<HTMLImageElement>}
                color="primary"
                className={className ?? undefined}
                src="/icons/stars/star.svg"
                width={width}
                height={height}
                alt="star-icon"
                style={{
                    transition: animated ? 'transform 0.7s ease-in-out' : undefined, // Increased to 0.7s for smoother feel
                    ...style,
                }}
            />
        );
    } else {
        return (
            <SvgIcon
                ref={starRef as React.RefObject<SVGSVGElement>}
                className={className ?? undefined}
                id={id ?? undefined}
                component={Star}
                inheritViewBox={true}
                sx={{
                    transition: animated ? 'transform 0.7s ease-in-out' : undefined, // Increased to 0.7s
                    ...style,
                }}
                color="primary"
            />
        );
    }
};

export default StarSvgIcon;