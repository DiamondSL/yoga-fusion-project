'use client'
import {Box, Container, List, ListItem, Typography, useTheme} from "@mui/material";
import Link from "next/link";
import './footer.css'
import useMediaQuery from "@mui/material/useMediaQuery";

interface footerTypes {
    links?: {
        text: string
        to: string;
    }[]
    socialMedia?: {
        text: string
        to: string
    }[]
}


const Footer = ({links, socialMedia}: footerTypes) => {
    const theme = useTheme();
    const chunk1 = links && links.slice(0, links.length / 2);
    const chunk2 = links && links.slice(links.length / 2, links.length);
    const isPhone = useMediaQuery('(max-width:767px)')


    return (
        <Container className={'Footer'} component={'footer'} maxWidth={false}
                   sx={{paddingLeft: '0 !important', paddingRight: '0 !important', backgroundColor: 'secondary.dark'}}>
            <Box className={'links-box'}>
                <Box className={'links_left'}>
                    <List>
                        {
                            chunk1 && chunk1.length > 0 && chunk1?.map((item) =>
                                <ListItem key={item.text} sx={{color: 'secondary.light'}}>
                                    <Link className={'footer-link'}
                                          style={{color: theme.palette.secondary.light, textDecoration: 'none'}}
                                          href={item.to}>{item.text}</Link>
                                </ListItem>)
                        }
                    </List>
                    <List>
                        {
                            chunk2 && chunk2.length > 0 && chunk2?.map((item) =>
                                <ListItem key={item.text} sx={{color: 'secondary.light'}}>
                                    <Link className={'footer-link'}
                                          style={{color: theme.palette.secondary.light, textDecoration: 'none'}}
                                          href={item.to}>{item.text}</Link>
                                </ListItem>)
                        }
                    </List>
                </Box>
                <Box className={'links_right'}>
                    <List>
                        {socialMedia && socialMedia?.map((item) =>
                            <ListItem key={item.text}>
                                <Link className={'footer-link'}
                                      style={{color: theme.palette.secondary.light, textDecoration: 'none'}}
                                      href={item.to}>{item.text}</Link>
                            </ListItem>)
                        }
                    </List>
                    <Typography id={'branding'} color={'secondary.light'} fontWeight={200} variant={isPhone? 'body2' : 'body1'}>yoga fusion, 2025</Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default Footer