import {Box} from "@mui/system";
import {Container, Typography, Button} from "@mui/material";
import StarSvgIcon from "@/Components/Visual/SVGIcons/StarSvgIcon";
import SectionWrapper from './SectionWrapper'
import {LandingSectionOneContent} from "@/types/LandingPageTypes";
import './sectionOne.css'
import {useGradientCloudsBackground} from "@/Helpers/DynamicGradient";
import useMediaQuery from "@mui/material/useMediaQuery";


const LandingSectionOne = ({Title, Buttons}:LandingSectionOneContent) => {
    const gradientColors = ['#FF81BE', '#F7BE01', '#FE4538']

    const isPClikeWidth = useMediaQuery('(min-width:1200px)')
    const isTabletLikeWidth = useMediaQuery('(min-width:900px) and (max-width: 1200px)')
    const isMobileLargeLikeWidth = useMediaQuery('min-width:701px) and (max-width:900px)')
    const isMobileMediumLikeWidth = useMediaQuery('(max-width:700px)')


    useGradientCloudsBackground({
        colors: gradientColors,
        targetElementId: 'Landing-section-one',
        animationDuration: 20,
        variant: 'default'
    });


    return (
        <SectionWrapper id={'Landing-section-one'}>
            <Container maxWidth={false} sx={{display: 'flex', height: isPClikeWidth ? 'calc(100vh - 78px)' : (isMobileLargeLikeWidth || isMobileMediumLikeWidth) ? 'initial' : 'auto',  flexDirection: 'column', maxWidth: '1067px', width: isMobileLargeLikeWidth ? '90vw' : isMobileMediumLikeWidth ? '85vw' : '100%', padding: isMobileLargeLikeWidth || isTabletLikeWidth ? '82px 24px 126px 24px' : isMobileMediumLikeWidth ? '50px 0 70px 0' : '82px 0 126px 0'}}>
                <Box className={'Upper-stars'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Box className={'left'} sx={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
                    <StarSvgIcon className={'upper'} style={{width: '22px', height: '29px', marginLeft: '26px'}} animated={true}  />
                    <StarSvgIcon className={'down'} style={{width: '15.125px', height: '19.9375px'}} animated={true}/>
                    </Box>
                    <Box className={'right'} sx={{alignSelf: 'flex-end', marginRight: '230px'}}>
                        <StarSvgIcon style={{width: '15.125px', height: '19.9375px'}} animated={true}/>
                    </Box>
                </Box>
                <Box className={'Title'} sx={{display: 'flex', flexDirection: 'column', alignSelf:'center', maxWidth: '867px', width: '100%'}}>
                    {Title?.map((item) => {
                        const AlignSelfProperty = item.Placement === 'Left' ? {alignSelf: 'flex-start'} : item.Placement === 'Right' ? {alignSelf: 'flex-end'} : item?.Placement === 'Center' ? {alignSelf: 'center'} : undefined
                        return (
                        <Typography key={item.Title} variant={isMobileLargeLikeWidth ? 'h2' : isMobileMediumLikeWidth ? 'h3' : 'h1'} sx={{...AlignSelfProperty, fontWeight: isMobileLargeLikeWidth ? '700' : ''}}>{item.Title}</Typography>
                        )
                    })}
                </Box>
                <Box className={'Action-Content'} sx={{display: 'flex', maxWidth: '867px', width: '100%', alignSelf: 'center', justifyContent: 'space-between', marginTop: '58px'}}>
                    <Box className={'Down-stars'}>
                        <Box className={'left'} sx={{alignSelf: 'flex-start' }}>
                            {!isMobileLargeLikeWidth && <StarSvgIcon style={{width: '15.125px', height: '19.9375px'}} animated={true}/>}
                        </Box>
                    </Box>
                        <Box className={'actions'} sx={{display: 'flex', justifySelf: 'stretch', flexDirection: 'column', alignSelf: 'stretch'}}>
                            {Buttons && Buttons.length > 0 && Buttons.map((item) => {
                                return (
                                    <Button key={item.Text} variant={String(item.Variant) === "secondary" ? "secondary" : item.Variant === "primary" ? undefined : String(item.Variant) === "transparent" ? "transparent" : "secondary"}>{item.Text}</Button>
                                )
                            })}
                        </Box>
                        <Box className={'right'} sx={{display: 'flex', alignSelf: 'flex-end', flexDirection: 'column', gap: '14px'}}>
                            <StarSvgIcon className={'upper'} style={{width: '15.125px', height: '19.9375px'}} animated={true}/>
                            <StarSvgIcon className={'down'} style={{width: '22px', height: '29px', marginLeft: '26px'}} animated={true}  />
                        </Box>
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionOne