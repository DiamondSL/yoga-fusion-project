import { CSSProperties } from '@mui/material/styles/createTypography';

// Extend CSSProperties to include custom font weights
interface CustomCSSProperties extends CSSProperties {
    fontWeight?: CSSProperties['fontWeight'] | '400italic' | '700italic';
}

// Define FontsObject type
type FontsObjects = {
    family: {
        [fontName: string]: {
            [weight in NonNullable<CustomCSSProperties['fontWeight']>]?: string;
        };
    };
} | {
    family: {
        [fontName: string]: {
            [weight in NonNullable<CustomCSSProperties['fontWeight']>]?: string;
        };
    };
}[];

type CustomFontsObject = {
    family: {
        [fontName: string]: {
            [weight in NonNullable<CustomCSSProperties['fontWeight']>]?: string;
        };
    };
} | {
    family: {
        [fontName: string]: {
            [weight in NonNullable<CustomCSSProperties['fontWeight']>]?: string;
        };
    };
}[];

// Extend CSSProperties to include custom font weights
interface CustomCSSProperties extends CSSProperties {
    fontWeight?: CSSProperties['fontWeight'] | '400italic' | '700italic';
}

const calculateLetterSpacing = (originalSize:string|number, neededPercent:number) => {
    let formattedSize = (typeof originalSize === 'string' ? (originalSize.includes('px') ? Number(originalSize.replace('px', '')) : Number(originalSize)) : originalSize);
    console.log(formattedSize * neededPercent)

    return formattedSize * neededPercent
}

const formats = [
    {ext: 'woff2', format: 'woff2'},
    {ext: 'woff', format: 'woff'},
    {ext: 'ttf', format: 'truetype'},
    {ext: 'otf', format: 'opentype'},
    {ext: 'svg', format: 'svg'},
    {ext: 'eot', format: 'embedded-opentype'}
];


// Updated helper to return a TypeScript object
const returnFontFamily = (fonts: FontsObjects) => {
    if (!fonts) return [];

    const fontArray = Array.isArray(fonts) ? fonts : [fonts];

    return fontArray.flatMap((fontObj) =>
            Object.entries(fontObj.family).flatMap(([familyName, weights]) =>
                Object.entries(weights as Record<string, string>).map(([weight, file], index) => {
                    const fileBaseName = file.split('.')[0];
                    const fileFormat = file.split('.')[1];
                    const srcSet = `url("/fonts/${familyName}/${fileBaseName}.${fileFormat} format('truetype')")`

                    return {
                        fontFamily: familyName,
                        fontWeight: weight.includes('italic') ? weight.replace('italic', '') : weight,
                        fontStyle: weight.includes('italic') ? 'italic' : 'normal',
                        src: srcSet
                    };
                })
            )
        );
};

export { returnFontFamily, calculateLetterSpacing };
export type { FontsObjects, CustomFontsObject };