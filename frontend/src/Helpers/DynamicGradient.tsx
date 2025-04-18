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
                const errorLog = `Error inserting CSS rules into stylesheet: ${e}`;
                console.error(errorLog);
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

// interface SvgElementOptions {
//     svgElements: JSX.Element[]; // Array of SVG React elements
//     targetElementId: string; // ID of the target element
//     animationDuration?: number; // Base duration in seconds (default: 20s)
// }

// export const useSvgElementBackground = ({
//                                             svgElements,
//                                             targetElementId,
//                                             animationDuration = 20,
//                                         }: SvgElementOptions) => {
//     useEffect(() => {
//         const applySvgElements = () => {
//             const targetElement = document.getElementById(targetElementId);
//             if (!targetElement || !svgElements.length) return;
//
//             targetElement.style.position = 'relative';
//             targetElement.style.overflow = 'hidden';
//
//             // Create background container
//             const backgroundElement = document.createElement('div');
//             const backgroundId = `svg-background-layer-${targetElementId}-${Date.now()}`;
//             backgroundElement.id = backgroundId;
//             backgroundElement.style.position = 'absolute';
//             backgroundElement.style.top = '0';
//             backgroundElement.style.left = '0';
//             backgroundElement.style.width = '100%';
//             backgroundElement.style.height = '100%';
//             backgroundElement.style.zIndex = '-1';
//             backgroundElement.style.pointerEvents = 'none';
//
//             // Append to target element
//             targetElement.appendChild(backgroundElement);
//
//             const styleSheet = document.styleSheets[0];
//
//             // Process each SVG element
//             svgElements.forEach((svgElement, index) => {
//                 // Convert JSX to DOM string (simplified; assumes static SVG structure)
//                 const svgString = `
//           <svg width="${svgElement.props.width}" height="${svgElement.props.height}" viewBox="${svgElement.props.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <g filter="url(#filter${index}-${backgroundId})">
//               <ellipse cx="${svgElement.props.children[0].props.children.props.cx}"
//                        cy="${svgElement.props.children[0].props.children.props.cy}"
//                        rx="${svgElement.props.children[0].props.children.props.rx}"
//                        ry="${svgElement.props.children[0].props.children.props.ry}"
//                        fill="${svgElement.props.children[0].props.children.props.fill}"/>
//             </g>
//             <defs>
//               <filter id="filter${index}-${backgroundId}"
//                       x="${svgElement.props.children[1].props.children.props.x}"
//                       y="${svgElement.props.children[1].props.children.props.y}"
//                       width="${svgElement.props.children[1].props.children.props.width}"
//                       height="${svgElement.props.children[1].props.children.props.height}"
//                       filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
//                 <feFlood flood-opacity="0" result="BackgroundImageFix"/>
//                 <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
//                 <feGaussianBlur stdDeviation="${30 + Math.random() * 70}" result="effect1_foregroundBlur_${index}"/>
//               </filter>
//             </defs>
//           </svg>
//         `;
//
//                 // Create SVG DOM element
//                 const parser = new DOMParser();
//                 const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
//                 const svgNode = svgDoc.documentElement;
//
//                 // Unique ID for this SVG
//                 const svgId = `svg-ellipse-${index}-${backgroundId}`;
//                 svgNode.id = svgId;
//
//                 // Style SVG for absolute positioning and animation
//                 svgNode.style.position = 'absolute';
//                 // Center SVG within container, adjusting for its size
//                 const offsetX = (parseFloat(svgElement.props.width) - targetElement.clientWidth) / 2;
//                 const offsetY = (parseFloat(svgElement.props.height) - targetElement.clientHeight) / 2;
//                 svgNode.style.left = `-${offsetX}px`;
//                 svgNode.style.top = `-${offsetY}px`;
//                 svgNode.style.width = svgElement.props.width + 'px';
//                 svgNode.style.height = svgElement.props.height + 'px';
//
//                 // Append SVG to background element
//                 backgroundElement.appendChild(svgNode);
//
//                 // Random animation
//                 const animationName = `svgShift${index}-${backgroundId}`;
//                 const maxMove = 10; // Max % movement relative to container
//                 const scaleRange = 0.1; // Max scale variation
//                 const cssRules = `
//           #${svgId} {
//             animation: ${animationName} ${animationDuration + index * 5}s ease infinite;
//           }
//           @keyframes ${animationName} {
//             0% {
//               transform: translate(0%, 0%) scale(1);
//               opacity: 1.0;
//             }
//             25% {
//               transform: translate(${Math.random() * maxMove - maxMove / 2}%, ${Math.random() * maxMove - maxMove / 2}%) scale(${1 + Math.random() * scaleRange});
//               opacity: 0.85;
//             }
//             50% {
//               transform: translate(${Math.random() * maxMove - maxMove / 2}%, ${Math.random() * maxMove - maxMove / 2}%) scale(${1 + Math.random() * scaleRange});
//               opacity: 0.95;
//             }
//             75% {
//               transform: translate(${Math.random() * maxMove - maxMove / 2}%, ${Math.random() * maxMove - maxMove / 2}%) scale(${1 + Math.random() * scaleRange});
//               opacity: 0.9;
//             }
//             100% {
//               transform: translate(0%, 0%) scale(1);
//               opacity: 1.0;
//             }
//           }
//         `;
//
//                 try {
//                     styleSheet.insertRule(cssRules.split('}')[0] + '}', styleSheet.cssRules.length);
//                     styleSheet.insertRule(cssRules.split('}')[1] + '}', styleSheet.cssRules.length);
//                 } catch (e) {
//                     const styleTag = document.createElement('style');
//                     styleTag.textContent = cssRules;
//                     document.head.appendChild(styleTag);
//                 }
//             });
//         };
//
//         applySvgElements();
//
//         return () => {
//             const targetElement = document.getElementById(targetElementId);
//             if (targetElement) {
//                 const backgroundIdMatch = Array.from(targetElement.children).find(child =>
//                     child.id.startsWith(`svg-background-layer-${targetElementId}-`)) as HTMLElement | undefined;
//                 if (backgroundIdMatch) {
//                     targetElement.removeChild(backgroundIdMatch);
//                 }
//                 const styleSheet = document.styleSheets[0];
//                 for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
//                     const rule = styleSheet.cssRules[i] as CSSStyleRule | CSSKeyframesRule;
//                     if ((rule as CSSStyleRule).selectorText?.includes(`svg-background-layer-${targetElementId}`) ||
//                         (rule as CSSKeyframesRule).name?.includes(`svgShift`)) {
//                         styleSheet.deleteRule(i);
//                     }
//                 }
//                 targetElement.style.position = '';
//                 targetElement.style.overflow = '';
//             }
//         };
//     }, [svgElements, targetElementId, animationDuration]);
// };
