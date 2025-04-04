import {LandingSectionFourContent, ButtonItem} from "@/types/LandingPageTypes";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import {Box, Container, Typography, Button as ButtonEl} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './sectionFour.css'
import Marquee from "@/Components/Marquee/Marquee";
import { useRouter } from 'next/navigation';



type LandingConnector = LandingSectionFourContent & {titleSecond?: string, Button?: ButtonItem};


const LandingSectionFour = ({Title, Shape_Titles, titleSecond, Button }:LandingConnector) => {
    const router = useRouter()
    const onMarqueeClick = () => {
        return router.refresh()
    }

    return (
        <SectionWrapper id={'Landing-section-four'}>
            <Container maxWidth={false} sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '36px',
                flexDirection: 'column',
                paddingTop: '80px',
                paddingBottom: '80px',
                paddingLeft: '0 !important',
                paddingRight: '0 !important'
            }}>
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    {Title && <Typography variant={'h1'}>{Title?.Title}</Typography>}
                </Box>
                <Box sx={{
                    maxWidth: '1050px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '30px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {Shape_Titles && Shape_Titles.map((item) => {
                        return (
                            <Box sx={{
                                maxHeight: '134px',
                                height: '100%',
                                maxWidth: '330px',
                                width: '100%',
                                position: 'relative', // Allows absolute positioning of child elements
                                display: 'block', // Keeps the box size to the image
                            }} key={item.Title}>
                                <Box component={'img'} sx={{
                                    width: '100%', // Adjust size as needed
                                    height: 'auto',
                                    display: 'block',
                                }} src={process.env.NODE_ENV === 'development' && item.Shape.url.includes('uploads') ? 'http://localhost:1337' + item.Shape.url : item.Shape.url}/>
                                <Typography
                                    variant={'bodyXL'}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%', // Vertically center
                                        left: '50%', // Horizontally center
                                        transform: 'translate(-50%, -50%)', // Offset by half of text size
                                        color: 'primary.dark', // Ensure text is visible (adjust as needed)
                                        padding: '0', // Optional: padding for readability
                                        textAlign: 'center',
                                        textWrap: 'nowrap'
                                    }}
                                >{item.Title}</Typography>
                            </Box>
                        )
                    })}
                </Box>
            </Container>
            <Container maxWidth={false} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '136px',
                paddingBottom: '60px',
                paddingLeft: '0 !important',
                paddingRight: '0 !important'
            }} className={'section-five'}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    maxWidth: '960px',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <Typography variant={'h3'}>{titleSecond}</Typography>
                    <ButtonEl sx={{maxWidth: '273px', width: '100%', height: '51px', alignSelf: 'center'}}
                              variant={Button?.Variant === "primary" ? 'contained' : 'outlined'}>{Button?.Text}</ButtonEl>
                </Box>
            </Container>
                <Marquee style={{backgroundColor: 'secondary.light'}} onClick={onMarqueeClick}>
                    <Box className={'marquee-item'}>
                        <Typography variant={'body2'}>book now</Typography>
                        <ArrowRightAltIcon />
                    </Box>
                    <Box className={'marquee-item'}>
                        <Typography variant={'body2'}>book now</Typography>
                        <ArrowRightAltIcon />
                    </Box>
                    <Box className={'marquee-item'}>
                        <Typography variant={'body2'}>book now</Typography>
                        <ArrowRightAltIcon />
                    </Box>
                    <Box className={'marquee-item'}>
                        <Typography variant={'body2'}>book now</Typography>
                        <ArrowRightAltIcon />
                    </Box>
                    <Box className={'marquee-item'}>
                        <Typography variant={'body2'}>book now</Typography>
                        <ArrowRightAltIcon />
                    </Box>
                    <Box className={'marquee-item'}>
                        <Typography variant={'body2'}>book now</Typography>
                        <ArrowRightAltIcon />
                    </Box>
                    <Box className={'marquee-item'}>
                        <Typography variant={'body2'}>book now</Typography>
                        <ArrowRightAltIcon />
                    </Box>
                </Marquee>
        </SectionWrapper>
)
}

export default LandingSectionFour