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

// Updated helper to return a TypeScript object
const returnFontFamily = (fonts: FontsObjects) => {
    if (!fonts) return [];

    const fontArray = Array.isArray(fonts) ? fonts : [fonts];

    return fontArray.flatMap((fontObj) =>
            Object.entries(fontObj.family).flatMap(([familyName, weights]) =>
                Object.entries(weights as Record<string, string>).map(([weight, file]) => {
                    const fileBaseName = file.split('.')[0];
                    const formats = [
                        {ext: 'woff2', format: 'woff2'},
                        {ext: 'woff', format: 'woff'},
                        {ext: 'ttf', format: 'truetype'},
                        {ext: 'otf', format: 'opentype'},
                        {ext: 'svg', format: 'svg'},
                        {ext: 'eot', format: 'embedded-opentype'}
                    ];

                    const srcSet = formats
                        .map(
                            ({ ext, format }) =>
                                `url('/fonts/${familyName}/${fileBaseName}.${ext}') format('${format}')`
                        )
                        .join(', ');

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

export default returnFontFamily;
export type { FontsObjects, CustomFontsObject };