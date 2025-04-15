'use client';
import React, {useContext} from "react";
import {Box} from "@mui/system";
import Link from "next/link";
import {AppBar, Button, Container, Drawer, List, ListItem, Toolbar, Typography} from "@mui/material";
import YogaFusionLogo from "../Visual/SVGIcons/YogaFusionLogoIcon";
import useMediaQuery from '@mui/material/useMediaQuery';
import './navbar.css'
import { LanguageContext } from "@/app/ContextWrapper";

type linkItems = {
    link: string;
    url: string | URL;
}

interface SiteNavigationParams {
    linkItems: linkItems[];
}



const SiteNavigation = ({linkItems}: SiteNavigationParams) => {
    const isDesktop = useMediaQuery('(min-width:1200px)');
    const isPhone = useMediaQuery('(max-width: 767px)')
    const [menuOpen, setMenuOpen] = React.useState(false);
    const lang = useContext(LanguageContext);

    const LanguageComponent = ({language, children}: {language: "uk-UA" | 'ru-RU' | 'en-US' | null, children?: React.ReactNode}) => {
        return (<Box className={'language-select'}>
            <Typography variant="body2" fontSize={isPhone ? '18px' : '14px'} color={'textPrimary'}
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            letterSpacing: '3%'
                        }}>
                <span className={language?.includes('en') ? 'active' : ''}>en</span> | <span className={language?.includes('UA') ? 'active' : ''}>ukr</span>
            </Typography>
            {children}
        </Box>)
    }


    const toggleDrawer = (newOpen: boolean) => () => {
        setMenuOpen(newOpen);
    };


    return (
        <AppBar component={'header'} sx={{
            height: '78px',
            backgroundColor: isPhone && menuOpen ? 'primary.main' : 'transparent',
            zIndex: 0,
            paddingLeft: isDesktop ? '0' : '24px',
            paddingRight: isDesktop ? '0' : '24px',
            paddingTop: isPhone ? '10px' : '16px',
            paddingBottom: isPhone ? '10px' : '14px',
            borderBottom: isPhone && menuOpen ? "none" : "1px solid",
            color: 'primary.dark'
        }} position="absolute" variant={'outlined'}>
            <Container maxWidth={'xl'}
                       sx={{width: '100%', margin: '0 0 0 0', padding: '0 0 !important'}}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: isDesktop ? 'flex-start' : 'space-between',
                    margin: isDesktop ? '0 54px !important' : '0 0',
                    padding: '0 0px !important',
                    minHeight: '56px !important',
                    alignItems: 'flex-start',
                }}>
                    <Box sx={{marginRight: isDesktop ? 'auto' : '0'}}>
                        <YogaFusionLogo/>
                    </Box>
                    <Box component={'nav'} sx={{
                        display: isPhone ? 'none' : 'flex',
                        gap: isDesktop ? '36px' : '1em',
                        paddingTop: '14px',
                        marginRight: isDesktop ? '50px' : '0'
                    }}>
                        {linkItems.map(({link, url}) => (
                            <Typography key={link} variant="body2" color={'textPrimary'}
                                        component={Link}
                                        href={`/${url}`}
                                        sx={{textDecoration: 'none', letterSpacing: '3%'}}>
                                {link}
                            </Typography>
                        ))}
                        {!isPhone && <LanguageComponent language={lang}></LanguageComponent>}
                        <Box>
                            <Box component={'img'} sx={{cursor: 'pointer'}}
                                 src={'icons/navigation/header-user.svg'}></Box>
                        </Box>
                    </Box>
                    <Box className={'actions'}>
                        {isPhone &&
                            <Button className={menuOpen ? 'mobile-menu_button active' : 'mobile-menu_button'}
                                    variant={"transparent"} sx={{
                                border: 'none',
                                padding: '0',
                                margin: '0',
                                minWidth: 'auto',
                                maxWidth: 'auto',
                                display: 'flex',
                                flexDirection: 'column'
                            }} onClick={toggleDrawer(!menuOpen)}>
                            </Button>}
                        <Drawer hideBackdrop={true} slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    position: 'initial',
                                    zIndex: '0',
                                    top: '78px',
                                    height: '100%'
                                }
                            }
                        }
                        } sx={{zIndex: 0, top: '78px'}} anchor={"top"} open={menuOpen} onClose={toggleDrawer(false)}>
                            <Box className={'dropdown-menu'} sx={{paddingTop: '74px', display: 'flex', flexDirection: 'column', gap: '80px'}}>
                                <Box component={'nav'} className={'dropdown-nav'}>
                                    <List className={'nav-list'} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        gap: '34px',
                                        margin: '0',
                                        padding: '0'
                                    }}>
                                        {linkItems.map(({link, url}) => (
                                            <ListItem sx={{margin: '0', padding: '0', justifyContent: 'center'}}
                                                      className={'list-item'} key={link}>
                                                <Typography variant="body2" fontSize={'18px'} color={'textPrimary'}
                                                            component={Link}
                                                            href={`/${url}`}
                                                            sx={{textDecoration: 'none', letterSpacing: '3%'}}>
                                                    {link}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                        <ListItem sx={{margin: '0', padding: '0', justifyContent: 'center'}}
                                                  className={'list-item'}>
                                            <Typography variant="body2" fontSize={'18px'} color={'textPrimary'}
                                                        component={Link}
                                                        href={'/login'}
                                                        sx={{textDecoration: 'none', letterSpacing: '3%'}}>
                                                вхід
                                            </Typography>
                                        </ListItem>
                                        <ListItem sx={{margin: '0', padding: '0', justifyContent: 'center'}}
                                                  className={'list-item'}>
                                        <LanguageComponent language={lang} />
                                        </ListItem>
                                    </List>
                                </Box>
                                <Box className={'actions'}>
                                    <Button color={"primary"} sx={{width: '330px'}}>зареєструватися</Button>
                                </Box>
                            </Box>
                        </Drawer>
                        {
                            !isPhone && <Button color={"primary"}>book</Button>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default SiteNavigation