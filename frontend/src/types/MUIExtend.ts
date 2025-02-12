import { TypographyVariants, TypographyVariantsOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        h7: React.CSSProperties;
        h8: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        h7?: React.CSSProperties;
        h8?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        h7: true;
        h8: true;
    }
    }