import { TypographyVariants,  TypographyVariantsOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        h7: React.CSSProperties;
        h8: React.CSSProperties;
        bodyXL: React.CSSProperties;
        bodyL: React.CSSProperties;
        bodyM: React.CSSProperties;
        bodyS: React.CSSProperties;

    }

    interface TypographyVariantsOptions {
        h7?: React.CSSProperties;
        h8?: React.CSSProperties;
        bodyXL?: React.CSSProperties;
        bodyL?: React.CSSProperties;
        bodyM?: React.CSSProperties;
        bodyS?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        h7: true;
        h8: true;
        bodyXL: true
        bodyL: true
        bodyM: true
        bodyS: true
    }
    }

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        transparent: true;
        secondary: true;
    }
}

