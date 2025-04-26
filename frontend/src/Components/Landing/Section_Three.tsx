import {LandingSectionThreeContent} from "@/types/LandingPageTypes";
import SectionWrapper from './SectionWrapper'
import {Box, Container, Typography, Button as ButtonEl} from "@mui/material";
import ImageSlider from "@/Components/Slider/Slider";
import renderBlocks from "@/Helpers/BlockRender";
import useMediaQuery from "@mui/material/useMediaQuery";
import './section_three.css'
import {generateStrapiUrl} from "@/Components/Visual/StrapiIcons/StrapiIcon";

const LandingSectionThree = ({Title, Button, Description, Photos}: LandingSectionThreeContent) => {
    const isPhone = useMediaQuery('(max-width:767px)')
    const isTablet = useMediaQuery('(min-width:768px) and (max-width:1024px)')

    const RenderedButtons = Button && Button.map((item) => {
        return <ButtonEl key={item.Text} sx={{maxWidth: isPhone ? '330px' : '239px', width: '100%'}}
                         variant={String(item.Variant) === "secondary" ? "secondary" : item.Variant === "primary" ? undefined : String(item.Variant) === "transparent" ? "transparent" : "secondary"}>{item.Text}</ButtonEl>
    })

    return (
        <SectionWrapper id={'Landing-section-three'}>
            <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: (isPhone || isTablet) ? 'column' : 'row',
                justifyContent: 'flex-end',
                position: 'relative',
                gap: '40px',
                paddingTop: '60px',
                paddingBottom: isPhone ? '30px' : '80px',
                paddingLeft: '0 !important',
                paddingRight: '0 !important'
            }}>
                <Box component={'article'} className={'section-three-article'}
                     sx={{maxWidth: (isPhone || isTablet) ? '100%' : '575px', padding: (isPhone || isTablet) ? '0 30px' : '', display: 'flex', position: 'relative', flexDirection: 'column'}}>
                    <Box className={'title'} display={'flex'} sx={{marginBottom: isPhone? '16px' : '8px', justifyContent: 'flex-start'}}>
                        {Title?.title && <Typography variant={isPhone ? 'h3' : 'h1'}>{Title?.title}</Typography>}
                    </Box>
                    <Box className={'description'} sx={{display: 'flex', flexDirection: 'column', gap: isPhone ? '40px' : '38px'}}>
                        <Container maxWidth={false} sx={{
                            width: '100%',
                            display: 'flex',
                            maxWidth: isPhone ? '70vw' : '460px',
                            flexDirection: 'column',
                            gap: isPhone? '30px' : '38px',
                            padding: '0 !important',
                            justifyContent: 'flex-end',
                            marginRight: (isPhone || isTablet) ? '0' : '0',
                            marginLeft: (isPhone || isTablet) ? '0' : '',
                        }}>
                            {Title?.motto && <Typography fontSize={isPhone ? '14px' : '16px'} sx={isPhone ? {letterSpacing: '0', textWrap: 'nowrap'} : {}} variant={'body1'}>{Title?.motto}</Typography>}
                            {Description ? renderBlocks({content: Description, className: isPhone ? 'small' : '', style: isPhone? {fontSize: '14px', letterSpacing: '0'} : {}}) : <Box>
                                <Typography><Typography component={'strong'} variant={'body1'}>yoga
                                    fusion</Typography> – це це більше, ніж йога-студія. ми балансуємо між місцем
                                    наповнення та
                                    сили: як фізично, так і ментально. для кожного та кожної, хто завітає до нас: раді
                                    стати місцем
                                    вашого спокою та перезавантаження. просто в самому серці києва!</Typography>
                            </Box>}
                        </Container>
                        <Container maxWidth={false} sx={{
                            padding: '0 !important',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '24px',
                            justifyContent: isPhone ? 'center' : 'end',
                            marginTop: isPhone ? '10px' : ''
                        }}>
                            {RenderedButtons && RenderedButtons.map((item) => item)}
                        </Container>
                    </Box>
                </Box>
                <Box>
                    {Photos && Photos.length > 0 ?
                        <ImageSlider style={{border: '1px solid', borderColor: 'primary.dark'}}
                                     images={Photos?.map((item) => generateStrapiUrl(item.url))}
                                     width={(isPhone || isTablet) ? 'auto' : '700px'} height={isPhone ? '226px' : isTablet ? 'auto' : '400px'} />
                        : <Box component={'img'} src={'icons/Visuals/SectionThree/about_us.png'}></Box>
                    }
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionThree