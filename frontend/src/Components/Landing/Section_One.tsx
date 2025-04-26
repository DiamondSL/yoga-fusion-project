import {Box} from "@mui/system";
import {Container, Typography, Button} from "@mui/material";
import StarSvgIcon from "@/Components/Visual/SVGIcons/StarSvgIcon";
import SectionWrapper from './SectionWrapper'
import {LandingSectionOneContent} from "@/types/LandingPageTypes";
import './sectionOne.css'
import {useDynamicSvgGradientBackground} from "@/Helpers/DynamicGradient";
import useMediaQuery from "@mui/material/useMediaQuery";

const LandingSectionOne = ({Title, Buttons}: LandingSectionOneContent) => {
    const gradientColors = ['#FF81BE', '#F7BE01', '#FE4538']
    const isPhone = useMediaQuery('(max-width:767px)')


    useDynamicSvgGradientBackground({
        colors: gradientColors,
        targetElementId: 'Landing-section-one',
        animationDuration: 20,
        positioning: {
            top: '-78px'
        }
    });


    return (
        <SectionWrapper id={'Landing-section-one'} sx={{
            minHeight: 'calc(666px - 78px)',
            marginTop: '78px'
        }}>
            <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1067px',
                width: isPhone ? '85vw' : '100%',
                paddingLeft: '0 !important',
                paddingRight: '0 !important',
                padding: isPhone ? '38px 0 60px 0' : '82px 0 0 0'
            }}>
                <Box className={'Upper-stars'}
                     sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: isPhone ? '19px' : ''}}>
                    <Box className={'left'} sx={{display: 'flex', flexDirection: 'row-reverse', gap: isPhone ? '30px' : '18px'}}>
                        <StarSvgIcon className={'upper'} style={{width: '22px', height: '29px'}}
                                     animated={!isPhone}/>
                        <StarSvgIcon className={'down'} style={{transform: 'translateY(22px)', width: '15.125px', height: '19.9375px'}}
                                     animated={!isPhone}/>
                    </Box>
                    <Box className={'right'} sx={{alignSelf: isPhone ? 'flex-start' : 'flex-end'}}>
                        <StarSvgIcon style={{width: '15.125px', height: '19.9375px '}} animated={!isPhone}/>
                    </Box>
                </Box>
                <Box className={'Title'} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'center',
                    maxWidth: '867px',
                    width: '100%'
                }}>
                    {Title?.map((item) => {
                        const AlignSelfProperty = item.Placement === 'Left' ? {alignSelf: 'flex-start'} : item.Placement === 'Right' ? {alignSelf: 'flex-end'} : item?.Placement === 'Center' ? {alignSelf: 'center'} : undefined
                        return (
                            <Typography key={item.Title}
                                        variant={isPhone ? 'h4' : 'h1'}
                                        sx={{
                                            ...AlignSelfProperty,
                                            fontWeight: isPhone ? '700' : ''
                                        }}>{item.Title}</Typography>
                        )
                    })}
                </Box>
                <Box className={'Action-Content'} sx={{
                    display: 'flex',
                    width: '100%',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    flexDirection: isPhone ? 'column' : 'row',
                    marginTop: isPhone ? '24px' : '58px'
                }}>
                    {!isPhone &&
                    <Box className={'Down-stars'}>
                        <Box className={'left'} sx={{alignSelf: 'flex-start', transform: isPhone ? 'none' : 'translateX(100px)'}}>
                                <StarSvgIcon style={{width: '15.125px', height: '19.9375px'}} animated={true}/>
                        </Box>
                    </Box>
                    }
                    <Box className={'actions'}
                         sx={{display: 'flex', order: isPhone ? '3' : 'initial', width: isPhone ? '100%' : 'initial', justifySelf: 'stretch', flexDirection: 'column', alignSelf: isPhone ? 'center' : 'stretch'}}>
                        {Buttons && Buttons.length > 0 && Buttons.map((item) => {
                            return (
                                <Button key={item.Text}
                                        variant={String(item.Variant) === "secondary" ? "secondary" : item.Variant === "primary" ? undefined : String(item.Variant) === "transparent" ? "transparent" : "secondary"} sx={isPhone ? {maxWidth: '330px', width: '100%', alignSelf: 'center'} : {maxWidth: '234px'}}>{item.Text}</Button>
                            )
                        })}
                    </Box>
                    <Box className={isPhone ? 'upper-stars' : 'right'}
                         sx={{display: 'flex', alignSelf: 'flex-end', flexDirection: 'column-reverse', gap: '14px'}}>
                        <StarSvgIcon className={'upper'} style={{width: '15.125px', height: '19.9375px'}}
                                     animated={!isPhone}/>
                        <StarSvgIcon className={'down'} style={{width: '22px', height: '29px', marginLeft: '26px'}}
                                     animated={!isPhone}/>
                    </Box>
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionOne