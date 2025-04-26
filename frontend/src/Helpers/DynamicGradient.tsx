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

                return { gradient, animationName, blur, duration: animationDuration + index * 5 };
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

interface DynamicGradientOptions {
    colors: string[]; // Array of HEX color strings
    targetElementId: string; // ID of the target element
    animationDuration?: number; // Base duration in seconds (default: 20s)
    variant?: 'default' | 'radialCenterGradient'; // Gradient style variant
}

interface Ellipse {
    x: number; // Center x (%)
    y: number; // Center y (%)
    radiusX: number; // Radius x (%)
    radiusY: number; // Radius y (%)
    color: string; // HEX color
    alpha: number; // Transparency (0-1)
    blur: number; // Blur radius (px)
    velocityX: number; // Movement speed x (%/s)
    velocityY: number; // Movement speed y (%/s)
    scale: number; // Current scale (1-1.05)
    scaleVelocity: number; // Scaling speed (oscillates)
}

export const useDynamicGradientBackground = ({
                                                 colors,
                                                 targetElementId,
                                                 animationDuration = 20,
                                                 variant = 'default',
                                             }: DynamicGradientOptions) => {
    useEffect(() => {
        const targetElement = document.getElementById(targetElementId);
        if (!targetElement) return;

        targetElement.style.position = 'relative';
        targetElement.style.overflow = 'hidden';

        // Create canvas element
        const canvas = document.createElement('canvas');
        const canvasId = `gradient-canvas-${targetElementId}-${Date.now()}`;
        canvas.id = canvasId;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';

        // Append to target element
        targetElement.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match target element
        const resizeCanvas = () => {
            canvas.width = targetElement.clientWidth;
            canvas.height = targetElement.clientHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Validate and prepare colors
        const validColors = colors.filter(color => /^#[0-9A-F]{6}$/i.test(color));
        const baseColors = validColors.length >= 1 ? validColors : ['#D5F166', '#F7BE00', '#FF81BE'];

        // Initialize ellipses based on variant
        let ellipses: Ellipse[] = [];
        if (variant === 'radialCenterGradient') {
            // Based on SVG: green (50%, 50%), yellow (81%, 72%), pink (82%, 73%)
            ellipses = [
                {
                    x: 50, // Green
                    y: 50,
                    radiusX: 48, // 48% of width
                    radiusY: 43, // 43% of height
                    color: baseColors[0],
                    alpha: 0.8,
                    blur: 100, // From SVG
                    velocityX: (Math.random() * 0.1 - 0.05) * 60 / animationDuration,
                    velocityY: (Math.random() * 0.1 - 0.05) * 60 / animationDuration,
                    scale: 1,
                    scaleVelocity: (Math.random() * 0.002 - 0.001) * 60 / animationDuration,
                },
                {
                    x: 81, // Yellow
                    y: 72,
                    radiusX: 31, // 31% of width
                    radiusY: 28, // 28% of height
                    color: baseColors[1],
                    alpha: 0.8,
                    blur: 50, // From SVG
                    velocityX: (Math.random() * 0.1 - 0.05) * 60 / animationDuration,
                    velocityY: (Math.random() * 0.1 - 0.05) * 60 / animationDuration,
                    scale: 1,
                    scaleVelocity: (Math.random() * 0.002 - 0.001) * 60 / animationDuration,
                },
                {
                    x: 82, // Pink
                    y: 73,
                    radiusX: 32, // 32% of width
                    radiusY: 29, // 29% of height
                    color: baseColors[2],
                    alpha: 0.8,
                    blur: 200, // From SVG
                    velocityX: (Math.random() * 0.1 - 0.05) * 60 / animationDuration,
                    velocityY: (Math.random() * 0.1 - 0.05) * 60 / animationDuration,
                    scale: 1,
                    scaleVelocity: (Math.random() * 0.002 - 0.001) * 60 / animationDuration,
                },
            ];
        } else {
            // Default variant: random positions
            ellipses = baseColors.map((color) => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                radiusX: 30 + Math.random() * 20,
                radiusY: 30 + Math.random() * 20,
                color,
                alpha: 0.8,
                blur: 50 + Math.random() * 50, // Random blur 50-100px
                velocityX: (Math.random() * 0.1 - 0.05) * 60 / animationDuration,
                velocityY: (Math.random() * 0.1 - 0.05) * 60 / animationDuration,
                scale: 1,
                scaleVelocity: (Math.random() * 0.002 - 0.001) * 60 / animationDuration,
            }));
        }

        let lastTime = 0;
        const animate = (time: number) => {
            if (!ctx || !canvas.parentElement) return;

            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw each ellipse
            ellipses.forEach(ellipse => {
                // Update position
                ellipse.x += ellipse.velocityX * deltaTime;
                ellipse.y += ellipse.velocityY * deltaTime;

                // Bounce off boundaries (0-100%)
                if (ellipse.x < 0) { ellipse.x = 0; ellipse.velocityX *= -1; }
                if (ellipse.x > 100) { ellipse.x = 100; ellipse.velocityX *= -1; }
                if (ellipse.y < 0) { ellipse.y = 0; ellipse.velocityY *= -1; }
                if (ellipse.y > 100) { ellipse.y = 100; ellipse.velocityY *= -1; }

                // Update scale
                ellipse.scale += ellipse.scaleVelocity * deltaTime;
                if (ellipse.scale > 1.05) { ellipse.scale = 1.05; ellipse.scaleVelocity *= -1; }
                if (ellipse.scale < 1) { ellipse.scale = 1; ellipse.scaleVelocity *= -1; }

                // Convert percentages to pixel values
                const centerX = (ellipse.x / 100) * canvas.width;
                const centerY = (ellipse.y / 100) * canvas.height;
                const rx = (ellipse.radiusX / 100) * canvas.width * ellipse.scale;
                const ry = (ellipse.radiusY / 100) * canvas.height * ellipse.scale;
                const maxRadius = Math.max(rx, ry);

                // Create a radial gradient to simulate blur
                const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius + ellipse.blur);
                gradient.addColorStop(0, `${ellipse.color}${Math.round(ellipse.alpha * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(0.7, `${ellipse.color}${Math.round(ellipse.alpha * 0.5 * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, `${ellipse.color}00`); // Fully transparent

                // Draw the ellipse
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.globalCompositeOperation = 'source-over'; // Normal blending
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (targetElement) {
                const canvasElement = document.getElementById(canvasId);
                if (canvasElement) {
                    targetElement.removeChild(canvasElement);
                }
                targetElement.style.position = '';
                targetElement.style.overflow = '';
            }
        };
    }, [colors, targetElementId, animationDuration, variant]);
};

