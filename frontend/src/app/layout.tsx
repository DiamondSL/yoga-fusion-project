'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import OriginalTheme  from '@/Theme/OriginalTheme';
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";
import { ApolloProvider } from '@apollo/client';
import client from '../lib/Apollo/ApolloClient';
import {AppBar, Button, SvgIcon} from "@mui/material";
import Logo from './logo.svg'
import {Box} from "@mui/system";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
      <ApolloProvider client={client}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={OriginalTheme}>
            <CssBaseline />
                <AppBar style={{height: '78px'}} position="static">
                    <Box>
                        <SvgIcon path={Logo} inheritViewBox></SvgIcon>
                    </Box>
                    <Button className={'MuiButton'}>book</Button>
                </AppBar>
            {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
      </ApolloProvider>
      </body>
      </html>
  );
}
