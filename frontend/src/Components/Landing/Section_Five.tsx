import {
    LandingSectionSixContent, RouteItem
} from "@/types/LandingPageTypes";
import SectionWrapper from './SectionWrapper'
import {Box, Container, Typography, Button as ButtonEl} from "@mui/material";
import './sectionFive.css'
import { useRouter } from 'next/navigation';

type SectionFiveContent = LandingSectionSixContent & {  TitleSecond?: string; TitleSecondPlacement?: 'Left' | 'Right' | 'Center'; Route?: RouteItem[];}


const LandingSectionFive = ({Title, TitleSecond, TitleSecondPlacement, Route, Button, Description, Gallery}:SectionFiveContent) => {
    const router = useRouter();
    return (
        <SectionWrapper id={'Landing-section-five'}>
            <Container maxWidth={false} sx={{padding: '0 !important'}}>
                <Box className={'gallery'} sx={{display: 'flex', flexDirection: 'row'}}>
                    {Gallery && Gallery.map((item, index) => <Box component={'img'} src={item.url.includes('uploads') ? 'http://localhost:1337'+item.url : item.url} sx={{flexBasis: '50%'}} key={item.url+index.toString()} />)}
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
                        {Route && Route.map(item => <Typography variant={'h6'} onClick={() => router.push(item.Link)} className={'location-link'} key={item.Title}>{item.Title}</Typography>)}
                        {<Typography variant={'body2'}>{TitleSecondPlacement ? TitleSecondPlacement : <><Typography component={'span'} variant={'body2'} sx={{display: 'block'}}>Наш простір розташований біля парку Т.Г. Шевченко</Typography><Typography component={'span'} variant={'body2'} sx={{display: 'block'}}> Місто Київ, вулиця Терещенківська, 21(сині двері, дзвінок зліва, -1 поверх)</Typography></>}</Typography>}
                    </Box>
                    </Container>
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionFive