'use client';
import {ThemeProvider} from '@mui/material/styles';
import OriginalTheme from '@/Theme/OriginalTheme';
import CssBaseline from '@mui/material/CssBaseline';
import React, {PropsWithChildren} from "react";

const MUIProvider = ({children}:PropsWithChildren) => {
    return (
                <ThemeProvider theme={OriginalTheme}>
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
    )
}

export default MUIProvider