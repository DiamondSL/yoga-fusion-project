import {Box} from "@mui/system";
import {Container, Typography, Button} from "@mui/material";
import StarSvgIcon from "@/Components/Visual/SVGIcons/StarSvgIcon";
import SectionWrapper from './SectionWrapper'
import {LandingSectionOneContent} from "@/types/LandingPageTypes";
import './sectionOne.css'
import {useGradientCloudsBackground} from "@/Helpers/DynamicGradient";
import useMediaQuery from "@mui/material/useMediaQuery";

// const redGradient = <svg width="890" height="895" viewBox="0 0 890 895" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <g filter="url(#filter0_f_7801_10339)">
//         <ellipse cx="444.893" cy="447.578" rx="324.511" ry="326.813" fill="#FE4538"/>
//     </g>
//     <defs>
//         <filter id="filter0_f_7801_10339" x="0.382812" y="0.764923" width="889.021" height="893.626"
//                 filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
//             <feFlood flood-opacity="0" result="BackgroundImageFix"/>
//             <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
//             <feGaussianBlur stdDeviation="60" result="effect1_foregroundBlur_7801_10339"/>
//         </filter>
//     </defs>
// </svg>
//
// const yellowGradient = <svg width="719" height="725" viewBox="0 0 719 725" fill="none"
//                             xmlns="http://www.w3.org/2000/svg">
//     <g filter="url(#filter0_f_7801_10338)">
//         <ellipse cx="359.202" cy="362.743" rx="299.202" ry="301.891" fill="#F7BE01"/>
//     </g>
//     <defs>
//         <filter id="filter0_f_7801_10338" x="0" y="0.851868" width="718.404" height="723.782"
//                 filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
//             <feFlood flood-opacity="0" result="BackgroundImageFix"/>
//             <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
//             <feGaussianBlur stdDeviation="30" result="effect1_foregroundBlur_7801_10338"/>
//         </filter>
//     </defs>
// </svg>
//
// const pinkGradient = <svg width="1333" height="1340" viewBox="0 0 1333 1340" fill="none"
//                           xmlns="http://www.w3.org/2000/svg">
//     <g filter="url(#filter0_f_7801_10337)">
//         <ellipse cx="666.761" cy="669.546" rx="466.238" ry="469.546" fill="#FF81BE"/>
//     </g>
//     <defs>
//         <filter id="filter0_f_7801_10337" x="0.523438" y="0" width="1332.48" height="1339.09"
//                 filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
//             <feFlood flood-opacity="0" result="BackgroundImageFix"/>
//             <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
//             <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_7801_10337"/>
//         </filter>
//     </defs>
// </svg>
//

const LandingSectionOne = ({Title, Buttons}: LandingSectionOneContent) => {
    const gradientColors = ['#FF81BE', '#F7BE01', '#FE4538']
    const isDesktop = useMediaQuery('(min-width:1200px)')
    const isPhone = useMediaQuery('(max-width:767px)')


    useGradientCloudsBackground({
        colors: gradientColors,
        targetElementId: 'Landing-section-one',
        animationDuration: 20,
        variant: 'default'
    });


    return (
        <SectionWrapper id={'Landing-section-one'} sx={{
            minHeight: isDesktop ? '666px' :  'initial',
            marginTop: '78px'
        }}>
            <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1067px',
                width: isPhone ? '85vw' : '100%',
                padding: isPhone ? '38px 0 60px 0' : '82px 0 126px 0'
            }}>
                <Box className={'Upper-stars'}
                     sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: isPhone ? '19px' : ''}}>
                    <Box className={'left'} sx={{display: 'flex', flexDirection: 'row-reverse', gap: isPhone ? '30px' : '18px'}}>
                        <StarSvgIcon className={'upper'} style={{width: '22px', height: '29px'}}
                                     animated={true}/>
                        <StarSvgIcon className={'down'} style={{transform: 'translateY(22px)', width: '15.125px', height: '19.9375px'}}
                                     animated={true}/>
                    </Box>
                    <Box className={'right'} sx={{alignSelf: isPhone ? 'flex-start' : 'flex-end'}}>
                        <StarSvgIcon style={{width: '15.125px', height: '19.9375px '}} animated={true}/>
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
                         sx={{display: 'flex', order: isPhone ? '3' : 'initial', justifySelf: 'stretch', flexDirection: 'column', alignSelf: 'stretch'}}>
                        {Buttons && Buttons.length > 0 && Buttons.map((item) => {
                            return (
                                <Button key={item.Text}
                                        variant={String(item.Variant) === "secondary" ? "secondary" : item.Variant === "primary" ? undefined : String(item.Variant) === "transparent" ? "transparent" : "secondary"} sx={isPhone ? {maxWidth: '330px'} : {}}>{item.Text}</Button>
                            )
                        })}
                    </Box>
                    <Box className={isPhone ? 'upper-stars' : 'right'}
                         sx={{display: 'flex', alignSelf: 'flex-end', flexDirection: 'column-reverse', gap: '14px', marginBottom: '34px'}}>
                        <StarSvgIcon className={'upper'} style={{width: '15.125px', height: '19.9375px'}}
                                     animated={true}/>
                        <StarSvgIcon className={'down'} style={{width: '22px', height: '29px', marginLeft: '26px'}}
                                     animated={true}/>
                    </Box>
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionOne