// hooks/useGradientCloudsBackground.ts
import {useEffect} from 'react';

interface GradientCloudsOptions {
    colors: string[]; // Array of HEX color strings
    targetElementId: string; // ID of the target element
    animationDuration?: number; // Base duration in seconds (default: 20s)
    variant?: 'default' | 'roundGradient' | 'roundTopGradient'; // Gradient style variant
}

function hexToRGBA(hex: string, opacity: number): string {
    const hexValue = hex.replace('#', '');
    const r = parseInt(hexValue.slice(0, 2), 16);
    const g = parseInt(hexValue.slice(2, 4), 16);
    const b = parseInt(hexValue.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function getBlurStrength(color: string): number {
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    return Math.round(30 + brightness * 70); // 30-100px
}

export const useGradientCloudsBackground = ({
                                                colors,
                                                targetElementId,
                                                animationDuration = 20,
                                                variant = 'default',
                                            }: GradientCloudsOptions) => {

    useEffect(() => {
        const applyLiveGradient = () => {
            const targetElement = document.getElementById(targetElementId);
            if (!targetElement) {
                return
            }

            targetElement.style.position = 'relative';

            const gradientElement = document.createElement('div');
            const gradientId = `gradient-layer-${targetElementId}-${Date.now()}`;
            gradientElement.id = gradientId;
            gradientElement.style.position = 'absolute';
            gradientElement.style.zIndex = '-1';
            gradientElement.style.pointerEvents = 'none';

            // Append to target element
            targetElement.appendChild(gradientElement);

            // Validate and prepare colors
            const validColors = colors.filter(color => /^#[0-9A-F]{6}$/i.test(color));
            const baseColors = validColors.length >= 1 ? validColors : ['#FF81BE', '#F7BE01', '#FE4538'];

            // Inject styles into stylesheet
            const styleSheet = document.styleSheets[0];

            // Generate gradient layers based on variant
            const gradientLayers = baseColors.map((color, index) => {
                const blur = getBlurStrength(color);
                const centerOpacity = 0.8 + Math.random() * 0.2;
                const edgeOpacity = 0.1 + Math.random() * 0.3;
                const animationName = `cloudShift${index}-${gradientId}`;
                let gradient: string;

                if (variant === 'roundGradient') {
                    // Left-side circular gradient, static, centered vertically
                    const posY = 25 + index * 25; // Stack within 50% height, roughly centered
                    gradient = `radial-gradient(circle at 15% ${posY}%, ${hexToRGBA(color, centerOpacity)} 0%, ${hexToRGBA(color, edgeOpacity)} 50%, transparent 70%)`;
                    gradientElement.style.top = '25%'; // Center vertically (50% height - 25%)
                    gradientElement.style.left = '-10%'; // Extend slightly left
                    gradientElement.style.width = '30%'; // Max 30% of target width
                    gradientElement.style.height = '50%'; // Max 50% of target height
                } else if (variant === 'roundTopGradient') {
                    // Top-center circular gradient
                    const posX = 50;
                    const posY = 10 + index * 20;
                    gradient = `radial-gradient(circle at ${posX}% ${posY}%, ${hexToRGBA(color, centerOpacity)} 0%, ${hexToRGBA(color, edgeOpacity)} 50%, transparent 70%)`;
                    gradientElement.style.top = '-20%';
                    gradientElement.style.left = '0';
                    gradientElement.style.width = '100%';
                    gradientElement.style.height = '50%';
                } else {
                    // Default variant
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    const sizeX = 30 + Math.random() * 70;
                    const sizeY = 30 + Math.random() * 70;
                    gradient = `radial-gradient(ellipse ${sizeX}% ${sizeY}% at ${posX}% ${posY}%, ${hexToRGBA(color, centerOpacity)} 0%, ${hexToRGBA(color, edgeOpacity)} 70%, transparent 100%)`;
                    gradientElement.style.top = '-5%';
                    gradientElement.style.left = '0';
                    gradientElement.style.width = '95%';
                    gradientElement.style.height = '110%';
                }

                return {gradient, animationName, blur, duration: animationDuration + index * 5};
            });

            // CSS rules for the gradient element
            const cssRules = `
        #${gradientId} {
          background: ${gradientLayers.map(layer => layer.gradient).join(', ')};
          background-size: 100% 100%;
          background-blend-mode: screen;
          filter: blur(${Math.max(...gradientLayers.map(layer => layer.blur))}px);
          ${variant !== 'roundGradient' ? `animation: ${gradientLayers.map(layer => `${layer.animationName} ${layer.duration}s ease infinite`).join(', ')};` : ''}
        }
      `;

            // Keyframes for animated variants only
            const keyframesCSS = variant !== 'roundGradient' ? gradientLayers.map(layer => `
        @keyframes ${layer.animationName} {
          0% {
            transform: translate(0%, 0%) scale(1);
            opacity: ${hexToRGBA(baseColors[gradientLayers.indexOf(layer)], 0.8 + Math.random() * 0.2).split(', ').slice(0, -1).join(', ') + ', 0.92)'};
            background-position: 0% 0%;
          }
          25% {
            transform: translate(${Math.random() * 20 - 10}%, ${Math.random() * 20 - 10}%) scale(${1 + Math.random() * 0.1});
            opacity: ${hexToRGBA(baseColors[gradientLayers.indexOf(layer)], 0.8 + Math.random() * 0.2).split(', ').slice(0, -1).join(', ') + ', 0.74)'};
            background-position: ${Math.random() * 50}% ${Math.random() * 50}%;
          }
          50% {
            transform: translate(${Math.random() * 20 - 10}%, ${Math.random() * 20 - 10}%) scale(${1 + Math.random() * 0.1});
            opacity: ${hexToRGBA(baseColors[gradientLayers.indexOf(layer)], 0.8 + Math.random() * 0.2).split(', ').slice(0, -1).join(', ') + ', 0.92)'};
            background-position: ${Math.random() * 50 + 50}% ${Math.random() * 50 + 50}%;
          }
          75% {
            transform: translate(${Math.random() * 20 - 10}%, ${Math.random() * 20 - 10}%) scale(${1 + Math.random() * 0.1});
            opacity: ${hexToRGBA(baseColors[gradientLayers.indexOf(layer)], 0.8 + Math.random() * 0.2).split(', ').slice(0, -1).join(', ') + ', 0.83)'};
            background-position: ${Math.random() * 50}% ${Math.random() * 50 + 50}%;
          }
          100% {
            transform: translate(0%, 0%) scale(1);
            opacity: ${hexToRGBA(baseColors[gradientLayers.indexOf(layer)], 0.8 + Math.random() * 0.2).split(', ').slice(0, -1).join(', ') + ', 0.92)'};
            background-position: 0% 0%;
          }
        }
      `).join('') : '';

            try {
                styleSheet.insertRule(cssRules, styleSheet.cssRules.length);
                if (variant !== 'roundGradient') {
                    keyframesCSS.split('}').forEach(rule => {
                        if (rule.trim()) {
                            styleSheet.insertRule(rule + '}', styleSheet.cssRules.length);
                        }
                    });
                }
            } catch (e) {
                console.log(e)
                const styleTag = document.createElement('style');
                styleTag.textContent = cssRules + keyframesCSS;
                document.head.appendChild(styleTag);
            }
        };

        applyLiveGradient();

        return () => {
            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                const gradientIdMatch = Array.from(targetElement.children).find(child =>
                    child.id.startsWith(`gradient-layer-${targetElementId}-`)) as HTMLElement | undefined;
                if (gradientIdMatch) {
                    targetElement.removeChild(gradientIdMatch);
                }
                const styleSheet = document.styleSheets[0];
                for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
                    const rule = styleSheet.cssRules[i] as CSSStyleRule | CSSKeyframesRule;
                    if ((rule as CSSStyleRule).selectorText?.includes(`gradient-layer-${targetElementId}`) ||
                        (rule as CSSKeyframesRule).name?.includes(`gradient-layer-${targetElementId}`)) {
                        styleSheet.deleteRule(i);
                    }
                }
                targetElement.style.position = '';
                targetElement.style.overflow = '';
            }
        };
    }, [colors, targetElementId, animationDuration, variant]);
};


interface DynamicSvgGradientOptions {
    colors?: string[]; // Array of HEX color strings
    targetElementId: string; // ID of the target element
    animationDuration?: number; // Base duration in seconds (default: 20s)
    positioning?: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    }
    overflow?: boolean
}


interface Ellipse {
    id: string;
    cx: number; // Center x (%)
    cy: number; // Center y (%)
    rx: number; // Radius x (px, scaled to %)
    ry: number; // Radius y (px, scaled to %)
    fill: string; // HEX color
    blur: number; // Blur radius (px)
    animationDuration: number; // Animation duration (s)
}

export const useDynamicSvgGradientBackground = ({
                                                    colors = ['#FF81BE', '#FE4538', '#F7BE01'], // Default to design colors
                                                    targetElementId,
                                                    animationDuration = 20,
                                                    positioning,
                                                    overflow = true
                                                }: DynamicSvgGradientOptions) => {
    useEffect(() => {
        const targetElement = document.getElementById(targetElementId);
        if (!targetElement) return;

        if (!overflow) {
            targetElement.style.overflow = 'hidden';
        }

        targetElement.style.position = 'relative';

        // Create SVG element
        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const svgId = `svg-gradient-${targetElementId}-${Date.now()}`;
        svgElement.id = svgId;
        svgElement.style.position = 'absolute';
        svgElement.style.top = positioning?.top ?? '0';
        svgElement.style.left = positioning?.left ?? '0';
        svgElement.style.width = '100%';
        svgElement.style.height = '100%';
        svgElement.style.zIndex = '-1';
        svgElement.style.pointerEvents = 'none';
        svgElement.setAttribute('viewBox', '0 0 100 100'); // Use percentage-based viewBox
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet'); // Maintain aspect ratio for circular shapes

        // Append to target element
        targetElement.appendChild(svgElement);

        // Validate colors
        const validColors = colors.filter(color => /^#[0-9A-F]{6}$/i.test(color));
        const baseColors = validColors.length >= 3 ? validColors : ['#FF81BE', '#FE4538', '#F7BE01'];

        // Define blur levels for each ellipse
        const blurLevels = [120, 80, 50]; // Pink, Red, Yellow

        // Calculate ellipse size in pixels (1125-2062px for 1440px screen, scales to 1200-2200px on 1536px)
        const baseScreenWidth = 1440; // Reference width
        const minSizePx = 1125; // Min size in pixels at 1440px
        const maxSizePx = 2062; // Max size in pixels at 1440px

        // Generate ellipses with random sizes and initial positions
        const ellipses: Ellipse[] = baseColors.map((color, index) => {
            // Random size in pixels
            const sizeVariationPx = minSizePx + Math.random() * (maxSizePx - minSizePx);
            const sizePercent = (sizeVariationPx / baseScreenWidth) * 100; // Convert to % of viewport width

            // Randomize ry to be 80%-120% of rx for slight variation
            const rx = sizePercent / 2; // Radius x in % of viewBox
            const ryVariation = 0.8 + Math.random() * 0.4; // 80%-120%
            const ry = rx * ryVariation; // Radius y with slight randomization

            return {
                id: `ellipse-${index}-${Date.now()}`,
                cx: 50 + (Math.random() - 0.5) * 70, // ±35% variation around center (15%-85%)
                cy: 50 + (Math.random() - 0.5) * 70,
                rx,
                ry,
                fill: color,
                blur: blurLevels[index],
                animationDuration: animationDuration + index * 5,
            };
        });

        // Adjust positions to ensure at least 60% visibility
        const adjustOverlap = (ellipses: Ellipse[]) => {
            for (let i = 1; i < ellipses.length; i++) {
                for (let j = 0; j < i; j++) {
                    const e1 = ellipses[i];
                    const e2 = ellipses[j];

                    // Approximate each ellipse as a circle for overlap calculation
                    const r1 = (e1.rx + e1.ry) / 2; // Average radius for e1
                    const r2 = (e2.rx + e2.ry) / 2; // Average radius for e2
                    const smallerRadius = Math.min(r1, r2);
                    const smallerArea = Math.PI * smallerRadius * smallerRadius;

                    // Calculate distance between centers
                    const dx = e1.cx - e2.cx;
                    const dy = e1.cy - e2.cy;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistanceForOverlap = r1 + r2;

                    if (distance < maxDistanceForOverlap) {
                        // Approximate overlap area (simplified as intersection of two circles)
                        const d = distance;
                        const r = r1;
                        const R = r2;
                        let overlapArea = 0;
                        if (d < Math.abs(r - R)) {
                            // One circle is inside the other
                            overlapArea = Math.PI * Math.min(r, R) * Math.min(r, R);
                        } else {
                            overlapArea =
                                r * r * Math.acos((d * d + r * r - R * R) / (2 * d * r)) +
                                R * R * Math.acos((d * d + R * R - r * r) / (2 * d * R)) -
                                0.5 * Math.sqrt((-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R));
                        }

                        // Calculate overlap as a percentage of the smaller ellipse's area
                        const overlapPercentage = (overlapArea / smallerArea) * 100;

                        // If overlap is more than 40% (i.e., less than 60% visible), adjust position
                        if (overlapPercentage > 40) {
                            // Move e1 away from e2
                            const angle = Math.atan2(dy, dx);
                            const minDistance = maxDistanceForOverlap * 0.6; // Ensure at least 60% visibility
                            const newDistance = Math.max(distance, minDistance);
                            e1.cx = e2.cx + newDistance * Math.cos(angle);
                            e1.cy = e2.cy + newDistance * Math.sin(angle);

                            // Ensure the new position stays within 15%-85% range
                            e1.cx = Math.max(15, Math.min(85, e1.cx));
                            e1.cy = Math.max(15, Math.min(85, e1.cy));
                        }
                    }
                }
            }
        };

        // Apply overlap adjustment
        adjustOverlap(ellipses);

        // Create SVG content
        ellipses.forEach(ellipse => {
            // Create filter for blur
            const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.setAttribute('id', `blur-${ellipse.id}`);
            filter.setAttribute('x', '-50%');
            filter.setAttribute('y', '-50%');
            filter.setAttribute('width', '200%');
            filter.setAttribute('height', '200%');
            filter.setAttribute('filterUnits', 'objectBoundingBox');
            filter.setAttribute('color-interpolation-filters', 'sRGB');

            const gaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
            gaussianBlur.setAttribute('stdDeviation', `${ellipse.blur / 20}`); // Scale blur for percentage units
            gaussianBlur.setAttribute('result', 'blur');
            filter.appendChild(gaussianBlur);

            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.appendChild(filter);
            svgElement.appendChild(defs);

            // Create ellipse
            const ellipseElement = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            ellipseElement.setAttribute('cx', `${ellipse.cx}%`);
            ellipseElement.setAttribute('cy', `${ellipse.cy}%`);
            ellipseElement.setAttribute('rx', `${ellipse.rx}%`);
            ellipseElement.setAttribute('ry', `${ellipse.ry}%`);
            ellipseElement.setAttribute('fill', ellipse.fill);
            ellipseElement.setAttribute('fill-opacity', '0.8');
            ellipseElement.setAttribute('filter', `url(#blur-${ellipse.id})`);
            ellipseElement.style.animation = `move-${ellipse.id} ${ellipse.animationDuration}s ease infinite`;
            svgElement.appendChild(ellipseElement);
        });

        // Inject styles into stylesheet for animations
        const styleSheet = document.styleSheets[0];
        const keyframesCSS = ellipses.map(ellipse => `
      @keyframes move-${ellipse.id} {
        0% { transform: translate(0%, 0%) scale(1); }
        25% { transform: translate(${(Math.random() - 0.5) * 5}%, ${(Math.random() - 0.5) * 5}%) scale(${1 + Math.random() * 0.03}); }
        50% { transform: translate(${(Math.random() - 0.5) * 5}%, ${(Math.random() - 0.5) * 5}%) scale(${1 + Math.random() * 0.03}); }
        75% { transform: translate(${(Math.random() - 0.5) * 5}%, ${(Math.random() - 0.5) * 5}%) scale(${1 + Math.random() * 0.03}); }
        100% { transform: translate(0%, 0%) scale(1); }
      }
    `).join('');

        try {
            keyframesCSS.split('}').forEach(rule => {
                if (rule.trim()) {
                    styleSheet.insertRule(rule + '}', styleSheet.cssRules.length);
                }
            });
        } catch (e) {
            console.info(e)
            const styleTag = document.createElement('style');
            styleTag.textContent = keyframesCSS;
            document.head.appendChild(styleTag);
        }

        return () => {
            if (targetElement) {
                const svgElement = document.getElementById(svgId);
                if (svgElement) {
                    targetElement.removeChild(svgElement);
                }
                const styleSheet = document.styleSheets[0];
                for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
                    const rule = styleSheet.cssRules[i] as CSSKeyframesRule;
                    if (rule.name?.includes(`move-ellipse-${targetElementId}`)) {
                        styleSheet.deleteRule(i);
                    }
                }
                targetElement.style.position = '';
                targetElement.style.overflow = '';
            }
        };
    }, [targetElementId, animationDuration, colors, overflow, positioning]); // Dependencies ensure effect runs once per reload
};