'use client';
import React, { useState } from "react";
import { Box } from "@mui/system";
import Link from "next/link";
import {
    AppBar,
    Button,
    Container,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import YogaFusionLogo from "../Visual/SVGIcons/YogaFusionLogoIcon";
import useMediaQuery from '@mui/material/useMediaQuery';
import './navbar.css'

// Custom Burger Icon Component
const BurgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <Box>
    <svg width="22" height="14" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.57227 1H19.4294"
            stroke="#282218"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
                transform: isOpen ? 'translate(0, 4px) rotate(45deg)' : 'none',
                transformOrigin: 'center',
                transition: 'transform 0.3s ease'
            }}
        />
        <path
            d="M1.57227 9H19.4294"
            stroke="#282218"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
                transform: isOpen ? 'translate(0, -4px) rotate(-45deg)' : 'none',
                transformOrigin: 'center',
                transition: 'transform 0.3s ease'
            }}
        />
    </svg>
    </Box>
);

type linkItems = {
    link: string;
    url: string | URL;
}

interface SiteNavigationParams {
    linkItems: linkItems[];
}

const SiteNavigation = ({ linkItems }: SiteNavigationParams) => {
    const isPCLikeWidth = useMediaQuery('(min-width:1100px)');
    const isTabletLikeWidth = useMediaQuery('(min-width:900px)')
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box sx={{ width: '100%', p: 2 }}>
            <List>
                {linkItems.map(({ link, url }) => (
                    <ListItem
                        key={link}
                        component={Link}
                        href={`/${url}`}
                        onClick={handleDrawerToggle}
                        sx={{ textDecoration: 'none', color: '#282218' }}
                    >
                        <ListItemText primary={link} />
                    </ListItem>
                ))}
                <ListItem sx={{ mt: 1 }}>
                    <Typography
                        variant="body2"
                        color={'textPrimary'}
                        sx={{ cursor: 'pointer', textDecoration: 'none', letterSpacing: '3%' }}
                    >
                        <span>en</span> | <span className={'active'}>ukr</span>
                    </Typography>
                </ListItem>
                <ListItem sx={{ mt: 1 }}>
                    <Button
                        color="primary"
                        fullWidth
                        onClick={handleDrawerToggle}
                    >
                        book
                    </Button>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar
            component={'header'}
            sx={{
                height: '78px',
                paddingLeft: isPCLikeWidth ? '0' : '24px',
                paddingRight: isPCLikeWidth ? '0' : '24px',
                paddingTop: '16px',
                paddingBottom: '14px',
                borderBottom: "1px solid",
                color: '#282218'
            }}
            position="static"
            variant={'outlined'}
        >
            <Container
                maxWidth={'xl'}
                sx={{ width: '100%', margin: '0 0 0 0', padding: '0 0 !important' }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: isPCLikeWidth ? 'flex-start' : 'space-between',
                        margin: isPCLikeWidth ? '0 54px !important' : '0 0',
                        padding: '0 0px !important',
                        minHeight: '56px !important',
                        alignItems: 'flex-start',
                    }}
                >
                    <Box sx={{ marginRight: isPCLikeWidth ? 'auto' : '0' }}>
                        <YogaFusionLogo />
                    </Box>

                    {isTabletLikeWidth ? (
                        <>
                            <Box
                                component={'nav'}
                                sx={{
                                    display: 'flex',
                                    gap: isPCLikeWidth ? '36px' : '1em',
                                    paddingTop: '14px',
                                }}
                            >
                                {linkItems.map(({ link, url }) => (
                                    <Typography
                                        key={link}
                                        variant="body2"
                                        color={'textPrimary'}
                                        component={Link}
                                        href={`/${url}`}
                                        sx={{ textDecoration: 'none', letterSpacing: '3%' }}
                                    >
                                        {link}
                                    </Typography>
                                ))}
                                <Box className={'language-select'}>
                                    <Typography
                                        variant="body2"
                                        color={'textPrimary'}
                                        sx={{ cursor: 'pointer', textDecoration: 'none', letterSpacing: '3%' }}
                                    >
                                        <span>en</span> | <span className={'active'}>ukr</span>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box
                                        component={'img'}
                                        sx={{ cursor: 'pointer' }}
                                        src={'icons/navigation/header-user.svg'}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{marginLeft: isPCLikeWidth ? '50px' : '0'}}>
                                <Button color={"primary"}>book</Button>
                            </Box>
                        </>
                    ) : (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            sx={{ display: isPCLikeWidth ? 'none' : 'block', p: 0, zIndex: 1300 }}
                        >
                            <BurgerIcon isOpen={mobileOpen} />
                        </IconButton>
                    )}
                </Toolbar>
            </Container>

            <Drawer
                anchor="top"  // Changed from "right" to "top"
                open={mobileOpen}
                hideBackdrop={true}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '100%',  // Changed from fixed 250px to full width
                        top: '78px',   // Matches your AppBar height to appear below it
                        borderBottom: '1px solid #282218',
                        zIndex: '1',
                        height: 'calc(100vh - 78px)',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </AppBar>
    );
};

export default SiteNavigation;