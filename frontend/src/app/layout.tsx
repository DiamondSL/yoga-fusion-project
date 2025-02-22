'use client';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import {ThemeProvider} from '@mui/material/styles';
import OriginalTheme from '@/Theme/OriginalTheme';
import CssBaseline from '@mui/material/CssBaseline';
import React  from "react";
import {ApolloProvider} from '@apollo/client';
import client from '../lib/Apollo/ApolloClient';
import {AppBar, Button, Container, ListItemText, Menu, MenuItem, SvgIcon, Toolbar, Typography} from "@mui/material";
import {Box} from "@mui/system";
import Logo from './logo.svg'
import Link from "next/link";

const YogaFusionLogo = () => {
    return (
        <SvgIcon component={Logo} inheritViewBox={true} sx={{width: 'initial', height: 'initial'}} color={'primary'}/>
    );
}

const linksItems = ['наш простір', 'розклад', 'вчителі', 'тренування', 'ціни', 'контакти'];
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
                    <CssBaseline/>
                    <AppBar sx={{height: '78px', paddingTop: '16px', paddingBottom: '14px'}} position="static" variant={'outlined'}>
                        <Container maxWidth={'xl'} sx={{width: '100%', margin: '0 0 0 0', padding: '0 0 0 0 !important'}}>
                            <Toolbar sx={{ display: 'flex', justifyContent: 'center', margin: '0 0 0 0', padding: '0 0 0 0 !important'}}>
                        <Box sx={{marginLeft: '56px'}}>
                            <YogaFusionLogo />
                        </Box>
                                <Box sx={{ display: 'flex', gap: '36px' }}>
                                    {linksItems.map((link) => (
                                        <Typography key={link} variant="body2" color={'textPrimary'} component={Link} href={`/${link}`} sx={{ textDecoration: 'none', letterSpacing: '3%'}}>
                                            {link}
                                        </Typography>
                                    ))}
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
    )}
