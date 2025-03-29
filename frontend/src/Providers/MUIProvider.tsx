'use client';
import {ThemeProvider} from '@mui/material/styles';
import OriginalTheme from '@/Theme/OriginalTheme';
import CssBaseline from '@mui/material/CssBaseline';
import React, {PropsWithChildren} from "react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const MUIProvider = ({children}:PropsWithChildren) => {
    return (
        <AppRouterCacheProvider>
                <ThemeProvider theme={OriginalTheme}>
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
        </AppRouterCacheProvider>
    )
}

export default MUIProvider