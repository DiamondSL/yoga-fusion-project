'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import Link from 'next/link';
import { AppBar, Button, Container, Drawer, List, ListItem, Toolbar, Typography } from '@mui/material';
import YogaFusionLogo from '../Visual/SVGIcons/YogaFusionLogoIcon';
import useMediaQuery from '@mui/material/useMediaQuery';
import './navbar.css';

import { LanguageContext } from '@/app/ContextWrapper';
import {useRouter} from "next/navigation";

type LinkItem = {
    link: string;
    url: string | URL;
};

interface SiteNavigationParams {
    linkItems: LinkItem[];
}

const SiteNavigation = ({ linkItems }: SiteNavigationParams) => {
    const isDesktop = useMediaQuery('(min-width:1200px)');
    const isPhone = useMediaQuery('(max-width: 767px)');
    const isTablet = useMediaQuery('(min-width:768px) and (max-width:1024px)');
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [isClient, setIsClient] = useState(false);

    // Mark as client-side after mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Safely access context
    const languageContext = useContext(LanguageContext);
    const language = isClient ? languageContext?.language ?? 'en-US' : 'en-US';
    const setLanguage = languageContext?.setLanguage ?? (() => {});

    const LanguageComponent = ({ children }: { children?: React.ReactNode }) => {
        return (
            <Box
                className={'language-select'}
                onClick={() => setLanguage(language === 'uk-UA' ? 'en-US' : 'uk-UA')}
            >
                <Typography
                    variant="body2"
                    fontSize={isPhone ? '18px' : '14px'}
                    color={'textPrimary'}
                    sx={{
                        cursor: 'pointer',
                        textDecoration: 'none',
                        letterSpacing: '3%',
                    }}
                >
                    <span className={language.includes('en') ? 'active' : ''}>en</span> |{' '}
                    <span className={language.includes('uk') ? 'active' : ''}>ukr</span>
                </Typography>
                {children}
            </Box>
        );
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setMenuOpen(newOpen);
    };
    const router = useRouter();

    return (
        <AppBar
            component={'header'}
            sx={{
                height: '78px',
                backgroundColor: isPhone && menuOpen ? 'primary.main' : 'transparent',
                zIndex: 0,
                paddingLeft: isDesktop ? '0' : '24px',
                paddingRight: isDesktop ? '0' : '24px',
                paddingTop: isPhone ? '10px' : '12px',
                paddingBottom: isPhone ? '10px' : '14px',
                borderBottom: isPhone && menuOpen ? 'none' : '1px solid',
                color: 'primary.dark',
            }}
            position="absolute"
            variant={'outlined'}
        >
            <Container maxWidth={'xl'} sx={{ width: '100%', margin: '0 0 0 0', padding: '0 0 !important' }}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: isDesktop ? 'flex-start' : 'space-between',
                        margin: isDesktop ? '0 54px !important' : '0 0',
                        padding: '0 0px !important',
                        minHeight: '50px !important',
                        alignItems: 'flex-start',
                    }}
                >
                    <Box sx={{ marginRight: isDesktop ? 'auto' : '0', display: 'flex', cursor: 'pointer' }}>
                        <YogaFusionLogo onClick={() => router.push('/')} />
                    </Box>
                    <Box
                        component={'nav'}
                        sx={{
                            display: isPhone ? 'none' : isTablet ? 'none' : 'flex',
                            gap: isDesktop ? '36px' : '1em',
                            paddingTop: '14px',
                            marginRight: isDesktop ? '40px' : '0',
                        }}
                    >
                        {linkItems.map(({ link, url }) => (
                            <Typography
                                key={link}
                                variant="body2"
                                color={'textPrimary'}
                                onClick={() =>
                                {
                                    setMenuOpen(false);
                                    router.refresh();
                                }}
                                component={Link}
                                href={`/${url}`}
                                sx={{ textDecoration: 'none', letterSpacing: '3%' }}
                            >
                                {link}
                            </Typography>
                        ))}
                        {(!isPhone || !isTablet) && <LanguageComponent />}
                        <Box>
                            <Box
                                component={'img'}
                                sx={{ cursor: 'pointer' }}
                                src={'icons/navigation/header-user.svg'}
                            />
                        </Box>
                    </Box>
                    <Box className={'actions'}>
                        {(isPhone || isTablet) && (
                            <Button
                                className={menuOpen ? 'mobile-menu_button active' : 'mobile-menu_button'}
                                variant={'transparent'}
                                sx={{
                                    border: 'none',
                                    padding: '0',
                                    margin: '0',
                                    minWidth: 'auto',
                                    maxWidth: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                onClick={toggleDrawer(!menuOpen)}
                            />
                        )}
                        <Drawer
                            hideBackdrop={true}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        position: 'initial',
                                        zIndex: '0',
                                        top: '78px',
                                        height: '100%',
                                    },
                                },
                            }}
                            sx={{ zIndex: 0, top: '78px' }}
                            anchor={'top'}
                            open={menuOpen}
                            onClose={toggleDrawer(false)}
                        >
                            <Box
                                className={'dropdown-menu'}
                                sx={{ paddingTop: '74px', display: 'flex', flexDirection: 'column', gap: '80px' }}
                            >
                                <Box component={'nav'} className={'dropdown-nav'}>
                                    <List
                                        className={'nav-list'}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            gap: '34px',
                                            margin: '0',
                                            padding: '0',
                                        }}
                                    >
                                        {linkItems.map(({ link, url }) => (
                                            <ListItem
                                                sx={{ margin: '0', padding: '0', justifyContent: 'center' }}
                                                className={'list-item'}
                                                key={link}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    fontSize={'18px'}
                                                    color={'textPrimary'}
                                                    component={Link}
                                                    onClick={() =>
                                                    {
                                                        setMenuOpen(false);
                                                        router.refresh();
                                                    }}
                                                    href={`/${url}`}
                                                    sx={{ textDecoration: 'none', letterSpacing: '3%' }}
                                                >
                                                    {link}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                        <ListItem
                                            sx={{ margin: '0', padding: '0', justifyContent: 'center' }}
                                            className={'list-item'}
                                        >
                                            <Typography
                                                variant="body2"
                                                fontSize={'18px'}
                                                color={'textPrimary'}
                                                component={Link}
                                                href={'/login'}
                                                sx={{ textDecoration: 'none', letterSpacing: '3%' }}
                                            >
                                                вхід
                                            </Typography>
                                        </ListItem>
                                        <ListItem
                                            sx={{ margin: '0', padding: '0', justifyContent: 'center' }}
                                            className={'list-item'}
                                        >
                                            <LanguageComponent />
                                        </ListItem>
                                    </List>
                                </Box>
                                <Box className={'actions'}>
                                    <Button color={'primary'} sx={{ width: '330px' }}>
                                        зареєструватися
                                    </Button>
                                </Box>
                            </Box>
                        </Drawer>
                        {!isPhone && !isTablet && (
                            <Button color={'primary'}>book</Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default SiteNavigation;