'use client';
import { createTheme } from '@mui/material/styles';
import {FontsObjects, CustomFontsObject} from "@/Helpers/FontFamilyConverter";
import { returnFontFamily, calculateLetterSpacing } from "@/Helpers/FontFamilyConverter";


const customFonts: FontsObjects | CustomFontsObject = [
    {
        family: {
            Manrope: {
                '200': "Manrope-ExtraLight.ttf",
                '300': "Manrope-Light.ttf",
                '400': "Manrope-Regular.ttf",
                '500': "Manrope-Medium.ttf",
                '600': "Manrope-SemiBold.ttf",
                '700': "Manrope-Bold.ttf",
                '800': "Manrope-ExtraBold.ttf",
            }
        }
    },
    {
        family: {
            NyghtSerif: {
                '400': "NyghtSerif-Light.ttf",
                '700': "NyghtSerif-Dark.ttf",
                "400italic": "NyghtSerif-LightItalic.ttf",
                "700italic": "NyghtSerif-DarkItalic.ttf",
            }
        }
    }
]

const colors = {
    brand: {
        black: '#282218',
        beige: '#E2D9B5',
        fuschia80: '#FF81BE',
        yellow: '#F7BE00',
        red: '#FE4358',
        lime: '#D5F166'
    },
    neutrals: {
        grey1: '#C0C0C0',
        grey2: '#EEEEEE',
    },
    secondary: {
        brown: '#4A3E30',
        light_green: '#76A025',
        blue: '#64CDF5',
        orange: '#FE6914'
    }
}

const fonts = returnFontFamily(customFonts).map((font, index) => ({
    fontFamily: font.fontFamily,
    fontWeight: font.fontWeight,
    fontStyle: font.fontStyle,
    src: font.src
}))

console.log(fonts)

const headingsSizes = {
    h1: '60px',
    h2: '40px',
    h3: '36px',
    h4: '30px',
    h5: '26px',
    h6: '24px',
    h7: '22px',
    h8: '18px'
}

const bodySizes =  {
        BodyFontSizeXL: '28px',
        BodyFontSizeL: '18px',
        BodyFontSizeLRegular: '16px',
        BodyFontSizeM: '14px',
        BodyFontSizeS: '14px'
}

const OriginalTheme = createTheme(
    {
        breakpoints: {
            values: {
                xs: 390,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1440,
            }
        },
        palette: {
            primary: {
                main: colors.brand.beige,
                dark: colors.brand.black,
                light: '#EEEEEE',
                contrastText: '#FFFFFF'
            },
            secondary: {
                main: colors.brand.yellow,
                dark: colors.secondary.brown,
                light: colors.brand.lime,
                contrastText: colors.brand.black
            },
            error: {
                main: colors.brand.red
            },
            warning: {
                main: colors.secondary.orange
            },
            info: {
                main: colors.secondary.blue
            },
            success: {
                main: colors.secondary.light_green
            },
            grey: {
                100: '#E1E1E6',
                200: '#E2D9B5',
                300: '#C0C0C0'
            },
            background: {
                default: colors.brand.beige,
                paper: colors.brand.beige,
            },
            text: {
                primary: colors.brand.black,
                secondary: colors.secondary.brown
            }
        },
        typography: {
            fontFamily: ['Manrope, sans-serif', 'NyghtSerif'].join(','),
            h1: {
                fontFamily: "NyghtSerif",
                fontWeight: 700,
                fontStyle: 'italic',
                fontSize: headingsSizes.h1,
                lineHeight: '125%',
                letterSpacing: `${calculateLetterSpacing(headingsSizes.h1, 0.04)}px`
            },
            h2: {
                fontFamily: "NyghtSerif",
                fontWeight: 700,
                fontSize: headingsSizes.h2,
                fontStyle: 'italic',
                lineHeight: '150%',
                letterSpacing: `${calculateLetterSpacing(headingsSizes.h2,0.04)}px`
            },
            h3: {
                fontFamily: "NyghtSerif",
                fontWeight: 700,
                fontSize: headingsSizes.h3,
                fontStyle: 'italic',
                lineHeight: '125%',
                letterSpacing: `${calculateLetterSpacing(headingsSizes.h3,0.04)}px`
            },
            h4: {
                fontFamily: "NyghtSerif",
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: headingsSizes.h4,
                lineHeight: '125%',
                letterSpacing: `${calculateLetterSpacing(headingsSizes.h4,0.04)}px`

            },
            h5: {
                fontFamily: "NyghtSerif",
                fontWeight: 700,
                fontStyle: 'italic',
                fontSize: headingsSizes.h5,
                lineHeight: '125%',
                letterSpacing: `${calculateLetterSpacing(headingsSizes.h5,0.04)}px`
            },
            h6: {
                fontFamily: "NyghtSerif",
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: headingsSizes.h6,
                lineHeight: '125%',
                letterSpacing: `${calculateLetterSpacing(headingsSizes.h6,0.04)}px`
            },
            h7: {
                fontFamily: "NyghtSerif",
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: headingsSizes.h7,
                lineHeight: '125%',
                letterSpacing: `${calculateLetterSpacing(headingsSizes.h7,0.04)}px`
            },
            h8: {
                fontFamily: "NyghtSerif",
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: headingsSizes.h8,
                lineHeight: '125%',
                letterSpacing: `${calculateLetterSpacing(headingsSizes.h7,0.04)}px`
            },
            body1: {
                fontFamily: "Manrope",
                fontWeight: 500,
                fontSize: bodySizes.BodyFontSizeLRegular,
                lineHeight: '150%',
                letterSpacing: `${calculateLetterSpacing(bodySizes.BodyFontSizeLRegular,0.26)}px`
            },
            body2: {
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: bodySizes.BodyFontSizeM,
                lineHeight: '150%',
                letterSpacing: `${calculateLetterSpacing(bodySizes.BodyFontSizeM,0.26)}px`
            },
            bodyXL: {
                fontFamily: "Manrope",
                fontWeight: 500,
                fontSize: bodySizes.BodyFontSizeXL,
                lineHeight: '150%',
                letterSpacing: '0.84px'
            },
            bodyS: {
                fontFamily: "Manrope",
                fontWeight: 500,
                fontSize: bodySizes.BodyFontSizeXL,
                lineHeight: '150%',
                letterSpacing: '0.42px'
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    '@global': {
                        '@font-face': fonts
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        backgroundColor: colors.brand.lime,
                        fontFamily: "NyghtSerif",
                        fontWeight: '700',
                        fontSize: '20px',
                        fontStyle: 'italic',
                        textTransform: 'lowercase',
                        letterSpacing: '0.88px;',
                        padding: '9px 40px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        lineHeight: '28px',
                        border: `1px solid ${colors.brand.black}`,
                        transition: 'all 1s ease-in',
                        color: colors.brand.black,
                        ":hover": {
                            backgroundColor: colors.secondary.light_green
                        },
                        ":disabled": {
                            backgroundColor: colors.neutrals.grey2,
                            color: colors.neutrals.grey1,
                            borderColor: colors.neutrals.grey1,
                            cursor: 'not-allowed'
                        },
                    },
                },
                variants: [
                    {
                        props: {variant: 'secondary'},
                        style: {
                            backgroundColor: colors.brand.beige,
                            ":hover": {
                                backgroundColor: colors.brand.lime
                            },
                        }
                    },
                    {
                        props: {variant: 'transparent'},
                        style: {
                            background: 'transparent',
                            backgroundColor: 'transparent',
                            ":hover": {
                                backgroundColor: colors.brand.lime
                            },
                        }
                    }
                ],
            }
        }
    });

export default OriginalTheme;