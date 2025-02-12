'use client';
import { createTheme } from '@mui/material/styles';
import {FontsObjects, CustomFontsObject} from "@/Helpers/FontFamilyConverter";
import returnFontFamily from "@/Helpers/FontFamilyConverter";

const customFonts:FontsObjects|CustomFontsObject = [
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

const OriginalTheme = createTheme(
    {
    palette: {
        primary: {
            main: colors.brand.beige,
            dark: colors.brand.black,
            light: '#EEEEEE',
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#F7BE00',
            dark: '#4A3E30',
            light: '#D5F166',
            contrastText: '#282218'
        },
        error: {
            main: colors.brand.red
        },
        warning: {
            main: '#FE6914'
        },
        info: {
            main: '#64CDF5'
        },
        success: {
            main: '#76A025'
        },
        grey: {
            100: '#E1E1E6',
            200: '#E2D9B5',
            300: '#C0C0C0'
        },
        background: {
            default: '#FFFEFF',
            paper: '#FFFFFF'
        },
        text: {
            primary: '#282218',
            secondary: '#4A3E30'
        }
    },
    typography: {
        fontFamily: ['Manrope, sans-serif', 'NyghtSerif'].join(','),
        h1: {
            fontFamily: "NyghtSerif",
            fontWeight: 700,
            fontStyle: 'italic'
        },
        h2: {
            fontFamily: "NyghtSerif",
            fontWeight: 700,
        },
        h3: {
            fontFamily: "NyghtSerif",
            fontWeight: 700,
        },
        h4: {
            fontFamily: "NyghtSerif",
            fontWeight: 400,
        },
        h5: {
            fontFamily: "NyghtSerif",
            fontWeight: 700,
        },
        h6: {
            fontFamily: "NyghtSerif",
            fontWeight: 400,
        },
        h7: {
            fontFamily: "NyghtSerif",
            fontWeight: 500,
        },
        h8: {
            fontFamily: "NyghtSerif",
            fontWeight: 400,
        },
        body1: {
            fontFamily: "Manrope",
            fontWeight: 500,
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@global': {
                    '@font-face': returnFontFamily(customFonts).map(font => ({
                        fontFamily: font.fontFamily,
                        fontWeight: font.fontWeight,
                        fontStyle: font.fontStyle,
                        src: font.src}))
                },
                        MuiButton: {
                            styleOverrides: {
                                root: {
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    boxShadow: 'none'
                                },
                                containedPrimary: {
                                    backgroundColor: colors.secondary.light_green,
                                    color: '#FFFEFF',
                                    '&:hover': {
                                        backgroundColor: '#9747FF'
                                    }
                                },
                                containedSecondary: {
                                    backgroundColor: colors.secondary.brown,
                                    color: colors.brand.lime,
                                    '&:hover': {
                                        backgroundColor: colors.neutrals.grey1
                                    }
                                },
                                outlinedPrimary: {
                                    borderColor: '#76A025',
                                    color: '#76A025',
                                    '&:hover': {
                                        borderColor: '#9747FF',
                                        color: '#9747FF',
                                        backgroundColor: 'rgba(151, 71, 255, 0.08)'
                                    }
                                },
                                outlinedSecondary: {
                                    borderColor: '#282218',
                                    color: '#282218',
                                    '&:hover': {
                                        borderColor: '#',
                                        color: '#C0C0C0',
                                        backgroundColor: 'rgba(192, 192, 192, 0.08)'
                                    }
                                },
                                textPrimary: {
                                    color: colors.secondary.light_green,
                                    '&:hover': {
                                        backgroundColor: 'rgba(118, 160, 37, 0.08)'
                                    }
                                },
                                textSecondary: {
                                    color: colors.secondary.brown,
                                    '&:hover': {
                                        backgroundColor: 'rgba(40, 34, 24, 0.08)'
                                    }
                                },
                            }
                        }
                    }
                }
            }
    });

export default OriginalTheme;