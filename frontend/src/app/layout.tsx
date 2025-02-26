'use client';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {ThemeProvider} from '@mui/material/styles';
import OriginalTheme from '@/Theme/OriginalTheme';
import CssBaseline from '@mui/material/CssBaseline';
import React from "react";
import {ApolloProvider} from '@apollo/client';
import client from '../lib/Apollo/ApolloClient';
import {AppBar, Button, Container, SvgIcon, Toolbar, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Logo from './logo.svg'
import Link from "next/link";

const YogaFusionLogo = () => {
    return (
        <SvgIcon component={Logo} inheritViewBox={true} sx={{width: 'initial', height: 'initial'}} color={'primary'}/>
    );
}

const linksItems = ['наш простір', 'розклад', 'вчителі', 'тренування', 'ціни', 'контакти', 'вхід', 'ukr'];
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"use-credentials"}/>
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
                      rel="stylesheet"/>
                <title>Yoga Fusion</title>
            </head>
            <html lang="en">
            <body>
            <ApolloProvider client={client}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={OriginalTheme}>
                        <CssBaseline/>
                        <AppBar sx={{height: '78px', paddingTop: '16px', paddingBottom: '14px', borderBottom: `1px solid ${OriginalTheme.palette.text.primary}`}} position="static"
                                variant={'outlined'}>
                            <Container maxWidth={'xl'}
                                       sx={{width: '100%', margin: '0 0 0 0', padding: '0 0 !important'}}>
                                <Toolbar sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    margin: '0 54px !important',
                                    padding: '0 0px !important',
                                    minHeight: '56px !important',
                                    alignItems: 'flex-start'
                                }}>
                                    <Box sx={{marginRight: 'auto'}}>
                                        <YogaFusionLogo/>
                                    </Box>
                                    <Box sx={{display: 'flex', gap: '36px', paddingTop: '14px', marginRight: '50px'}}>
                                        {linksItems.map((link) => (
                                            <Typography key={link} variant="body2" color={'textPrimary'}
                                                        component={Link}
                                                        href={`/${link}`}
                                                        sx={{textDecoration: 'none', letterSpacing: '3%'}}>
                                                {link}
                                            </Typography>
                                        ))}
                                    </Box>
                                    <Box>
                                        <Button color={"primary"}>book</Button>
                                    </Box>
                                </Toolbar>
                            </Container>
                        </AppBar>
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </ApolloProvider>
            </body>
            </html>
        </>
    )
}
