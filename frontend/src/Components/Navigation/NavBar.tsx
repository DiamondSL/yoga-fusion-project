'use client';
import React from "react";
import {Box} from "@mui/system";
import Link from "next/link";
import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import YogaFusionLogo from "../Visual/SVGIcons/YogaFusionLogoIcon";

type linkItems = {
    link: string;
    url: string | URL;
}

interface SiteNavigationParams {
    linkItems: linkItems[];
}

const SiteNavigation = ({linkItems}: SiteNavigationParams) => {
    return (
        <AppBar component={'header'} sx={{height: '78px', paddingTop: '16px', paddingBottom: '14px', borderBottom: "1px solid", color: '#282218'}}  position="static" variant={'outlined'}>
        <Container maxWidth={'xl'}
                   sx={{width: '100%', margin: '0 0 0 0', padding: '0 0 !important'}}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                margin: '0 54px !important',
                padding: '0 0px !important',
                minHeight: '56px !important',
                alignItems: 'flex-start',
            }}>
                <Box sx={{marginRight: 'auto'}}>
                    <YogaFusionLogo/>
                </Box>
                <Box component={'nav'} sx={{display: 'flex', gap: '36px', paddingTop: '14px', marginRight: '50px'}}>
                    {linkItems.map(({link, url}) => (
                        <Typography key={link} variant="body2" color={'textPrimary'}
                                    component={Link}
                                    href={`/${url}`}
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
    )
}

export default SiteNavigation