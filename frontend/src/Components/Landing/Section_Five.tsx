import {LandingSectionSixContent, RouteItem} from "@/types/LandingPageTypes";
import SectionWrapper from './SectionWrapper';
import {Box, Container, Typography, Button as ButtonEl} from "@mui/material";
import './sectionFive.css';
import {useRouter} from 'next/navigation';
import {BlocksContent} from "@strapi/blocks-react-renderer";
import renderBlocks from "@/Helpers/BlockRender";
import useMediaQuery from "@mui/material/useMediaQuery";

type SectionFiveContent = LandingSectionSixContent & {
    TitleSecond?: string;
    TitleSecondPlacement?: BlocksContent | string;
    Route?: RouteItem[];
}

const LandingSectionFive = ({
                                Title,
                                TitleSecond,
                                TitleSecondPlacement,
                                Route,
                                Button,
                                Description,
                                Gallery
                            }: SectionFiveContent) => {
    const router = useRouter()
    const appUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:1337'
    const isPhone = useMediaQuery('(max-width:767px)')
    const isSmallScreen = useMediaQuery('(max-width:425px)')


    return <SectionWrapper id={'Landing-section-five'}>
        <Container maxWidth={false} sx={{padding: '0 !important'}}>
            <Box className={'gallery'} sx={{display: 'flex', flexDirection: 'row'}}>
                {Gallery && Gallery.map((item, index) => <Box component={'img'}
                                                              src={process.env.NODE_ENV === 'development' ? 'http://localhost:1337' + item.url : `${appUrl}/cms` + item.url}
                                                              sx={isPhone ? {
                                                                  width: '50%',
                                                                  minHeight: '200px'
                                                              } : {flexBasis: '50%'}}
                                                              key={item.url + index.toString()}/>)}
            </Box>
            <Box className={'bar-description'}
                 sx={isSmallScreen ? {padding: '60px'} : isPhone ? {padding: '60px 30px'} : {}} component={'article'}>
                {Title && <Typography variant={isPhone ? 'h2' : 'h1'}>{Title?.Title}</Typography>}
                <Box className={'bar-description_controls'} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '46px',
                    paddingTop: isPhone ? '16px' : '46px'
                }}>
                    {Description && <Typography sx={{maxWidth: '560px', width: '100%', textAlign: 'center'}}
                                                variant={isPhone ? 'body2' : 'body1'}>{Description}</Typography>}
                    {Button && <ButtonEl sx={{maxWidth: isPhone ? '330px' : '210px', width: '100%'}}
                                         variant={Button.Variant === 'primary' ? 'contained' : 'transparent'}>{Button?.Text}</ButtonEl>}
                </Box>
            </Box>
            <Box className={'location'}>
                <Container className={'location-content'} maxWidth={false}>
                    <Box className={'title'}>
                        {TitleSecond && <Typography variant={isPhone ? 'h2' : 'h1'}
                                                    sx={{letterSpacing: '0.4px'}}>{TitleSecond}</Typography>}
                    </Box>
                    {isPhone &&
                        <Box className={'mobile-route'}>
                            {Route && Route.map(item => <Typography variant={'h6'}
                                                                    onClick={() => router.push(item.Link)}
                                                                    className={'location-link'}
                                                                    key={item.Title}>{item.Title}</Typography>)}
                            <Box className={'arrows'}>
                                <Box component={'img'} src={'icons/arrows/sectionSix_arrow2.svg'}></Box>
                                <Box component={'img'} src={'icons/arrows/sectionSix_arrow1.svg'}></Box>
                            </Box>
                        </Box>}
                    <Box className={'arrows'}>
                        <Box component={'img'} src={'icons/arrows/sectionSix_arrow2.svg'}></Box>
                        <Box component={'img'} src={'icons/arrows/sectionSix_arrow1.svg'}></Box>
                    </Box>
                    <Box className={'location-details'} sx={{ marginTop: isPhone ? '10px' : ''}}>
                        {Route && Route.map(item => <Typography variant={'h6'} onClick={() => router.push(item.Link)}
                                                                className={'location-link'}
                                                                key={item.Title}>{item.Title}</Typography>)}
                        {TitleSecondPlacement && typeof TitleSecondPlacement === 'object' ?
                            <Box>{renderBlocks({content: TitleSecondPlacement, style: {fontSize: isPhone ? '12px' : ''}})}</Box> : <><Typography
                                component={'span'} variant={'body2'} sx={{display: 'block'}}>Наш простір розташований
                                біля парку Т.Г. Шевченко</Typography><Typography component={'span'} variant={'body2'}
                                                                                 sx={{display: 'block'}}> Місто Київ,
                                вулиця Терещенківська, 21(сині двері, дзвінок зліва, -1 поверх)</Typography></>}
                    </Box>
                </Container>
            </Box>
        </Container>
    </SectionWrapper>
}

export default LandingSectionFive;