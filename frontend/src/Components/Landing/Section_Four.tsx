import {LandingSectionFourContent, ButtonItem} from "@/types/LandingPageTypes";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import {Box, Container, Typography, Button as ButtonEl} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './sectionFour.css'
import Marquee from "@/Components/Marquee/Marquee";
import {useRouter} from 'next/navigation';
import useMediaQuery from "@mui/material/useMediaQuery";
import {generateStrapiUrl} from "@/Components/Visual/StrapiIcons/StrapiIcon";
import {BlocksContent} from "@strapi/blocks-react-renderer";
import renderBlocks from "@/Helpers/BlockRender";


type LandingConnector = LandingSectionFourContent & { titleSecond?: BlocksContent, Button?: ButtonItem };


const LandingSectionFour = ({Title, Shape_Titles, titleSecond, Button}: LandingConnector) => {
    const router = useRouter()
    const onMarqueeClick = () => {
        return router.refresh()
    }
    const isPhone = useMediaQuery('(max-width:767px)')

    return (
        <SectionWrapper id={'Landing-section-four'}>
            <Container maxWidth={false} sx={{
                display: 'flex',
                alignItems: 'center',
                gap: isPhone ? '30px' : '36px',
                flexDirection: 'column',
                paddingTop: isPhone ? '30px' : '80px',
                paddingBottom: isPhone ? '60px' : '80px',
                paddingLeft: '0 !important',
                paddingRight: '0 !important'
            }}>
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    {Title && <Typography variant={isPhone ? 'h2' : 'h1'}>{Title?.Title}</Typography>}
                </Box>
                <Box sx={{
                    maxWidth: '1050px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: isPhone ? '22px' : '30px',
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
                                }}
                                     src={item.Shape.url.includes('uploads') ? generateStrapiUrl(item.Shape.url) : item.Shape.url}/>
                                <Typography
                                    variant={'bodyXL'}
                                    fontSize={isPhone ? '18px' : '28px'}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%', // Vertically center
                                        left: '50%', // Horizontally center
                                        transform: 'translate(-50%, -50%)', // Offset by half of text size
                                        color: 'primary.dark', // Ensure text is visible (adjust as needed)
                                        padding: '0', // Optional: padding for readability
                                        textAlign: 'center',
                                        textWrap: 'nowrap',
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
                paddingTop: isPhone ? '60px' : '136px',
                paddingBottom: isPhone ? '80px' : '60px',
                paddingLeft: '0 !important',
                paddingRight: '0 !important'
            }} className={'section-five'}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: isPhone ? 'column' : 'row',
                    maxWidth: '960px',
                    width: '100%',
                    justifyContent: isPhone ? 'center' : 'space-between',
                    alignItems: isPhone ? 'center' : '',
                }}>
                    {titleSecond && titleSecond?.length > 0 && renderBlocks({content: titleSecond, className: 'section-five-blocks', style: isPhone ? {textAlign: 'center'} : {maxWidth: '576px'}})}
                    <ButtonEl sx={{maxWidth: '273px', width: '100%', marginTop: isPhone ? '40px' : '', height: '51px', alignSelf: 'center'}}
                              variant={Button?.Variant === "primary" ? 'contained' : 'outlined'}>{Button?.Text}</ButtonEl>
                </Box>
            </Container>
            <Marquee content={
                <Box className={'marquee-item'}>
                    <Typography variant={'body2'}>book now</Typography>
                    <ArrowRightAltIcon/>
                </Box>
            } style={{backgroundColor: 'secondary.light', display: 'flex', animationComposition: 'add'}}
                     onClick={onMarqueeClick} speed={60}/>
        </SectionWrapper>
    )
}

export default LandingSectionFour