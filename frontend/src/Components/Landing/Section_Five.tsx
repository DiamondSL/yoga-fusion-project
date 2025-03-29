import {FC} from "react";
import {
    LandingSectionSixContent, RouteItem
} from "@/types/LandingPageTypes";
import SectionWrapper from './SectionWrapper'
import {Box, Container, Typography, Button as ButtonEl} from "@mui/material";
import './sectionFive.css'
import { useRouter } from 'next/navigation';

type SectionFiveContent = LandingSectionSixContent & {  TitleSecond?: string; TitleSecondPlacement?: 'Left' | 'Right' | 'Center'; Route?: RouteItem[];}


const LandingSectionFive:FC<SectionFiveContent> = ({Title, TitleSecond, TitleSecondPlacement, Route, Button, Description, Gallery}) => {
    const router = useRouter();
    console.log('Route:', Route)

    return (
        <SectionWrapper id={'Landing-section-five'}>
            <Container maxWidth={false} sx={{padding: '0 !important'}}>
                <Box className={'gallery'} sx={{display: 'flex', flexDirection: 'row'}}>
                    {Gallery && Gallery.map((item) => <Box component={'img'} src={'http://localhost:1337'+item.url} sx={{flexBasis: '50%'}} key={item.url} />)}
                </Box>
                <Box className={'bar-description'} component={'article'}>
                    {Title && <Typography variant={'h1'}>{Title?.Title}</Typography>}
                    <Box className={'bar-description_controls'} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '46px', paddingTop: '46px'}}>
                        {Description && <Typography sx={{maxWidth: '560px', width: '100%', textAlign: 'center'}} variant={'body1'}>{Description}</Typography>}
                        {Button && <ButtonEl sx={{maxWidth: '210px', width: '100%'}} variant={Button.Variant === 'primary' ? 'contained' : 'transparent'}>{Button?.Text}</ButtonEl>}
                    </Box>
                </Box>
                <Box className={'location'}>
                    <Container className={'location-content'} maxWidth={false}>
                    <Box className={'title'}>
                        {TitleSecond && <Typography variant={'h1'} sx={{letterSpacing: '0.4px'}}>{TitleSecond}</Typography>}
                    </Box>
                    <Box className={'arrows'}>
                        <Box component={'img'} src={'icons/arrows/sectionSix_arrow2.svg'}></Box>
                        <Box component={'img'} src={'icons/arrows/sectionSix_arrow1.svg'}></Box>
                    </Box>
                    <Box className={'location-details'}>
                        {Route && Route.map(item => <Typography variant={'h6'} onClick={() => router.replace(item.Link)} className={'location-link'} key={item.Title}>{item.Title}</Typography>)}
                        {TitleSecondPlacement && <Typography variant={'body2'}>{TitleSecondPlacement}</Typography>}
                    </Box>
                    </Container>
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionFive