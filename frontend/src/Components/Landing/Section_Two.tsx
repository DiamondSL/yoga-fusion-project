import {Box} from "@mui/system";
import {CardMedia, Container, Typography} from "@mui/material";
import SectionWrapper from './SectionWrapper'
import {LandingSectionTwoContent, ListDescriptionItem} from "@/types/LandingPageTypes";
import {useGradientCloudsBackground} from "@/Helpers/DynamicGradient";
import useMediaQuery from "@mui/material/useMediaQuery";

const IconListComponent = ({Icon, Description}: ListDescriptionItem) => {
    const isPhone = useMediaQuery('(max-width:767px)')
    const isSmallScreen = useMediaQuery('(max-width:425px)')
    const appUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:1337'
    return (
        <Container component={'li'} maxWidth={false} sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: isPhone ? '15px' : '36px',
            padding: '0 !important',
            margin: '0 !important',
            flex: isSmallScreen ? '100%' : '50%',
        }}>
            <Box>
                <CardMedia component={'img'} alt={Icon?.alt}
                           src={process.env.NODE_ENV === 'development' && Icon?.url?.includes('uploads') ? 'http://localhost:1337' + Icon?.url : process.env.NODE_ENV === 'production' && Icon?.url?.includes('uploads') ? `${appUrl}/cms` + Icon?.url : Icon?.url}
                           sx={{objectFit: 'contain', maxWidth: isPhone? '30px' : '100%', width: isPhone ? 'auto' : Icon?.width, height: isPhone ? 'auto' : Icon?.height}}/>
            </Box>
            <Box sx={{maxWidth: isPhone ? '280px' : '358px', width: '100%'}}>
                <Typography variant={'body2'}>{Description ? Description : 'Blank'}</Typography>
            </Box>
        </Container>
    )
}

const LandingSectionTwo = ({
                               Title,
                               List_Description
                           }: LandingSectionTwoContent) => {

    const isPhone = useMediaQuery('(max-width:767px)')
    const isSmallScreen = useMediaQuery('(max-width:425px)')
    useGradientCloudsBackground({
        colors: ["#F7BE00", "#FE5347"],
        targetElementId: 'sections-gradient-container',
        animationDuration: 20,
        variant: 'roundGradient'
    });

    return (
        <SectionWrapper id={'Landing-section-two'}>
            <Container maxWidth={false} sx={{
                padding: isPhone ? '60px 0 50px 0' : '80px 0 !important',
                maxWidth: '960px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box className={'title'} sx={{
                    padding: isPhone ? '0 30px 0 30px' : '',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: Title?.Placement === 'Center' ? 'center' : Title?.Placement === 'Left' ? 'flex=start' : Title?.Placement === 'Right' ? 'flex-end' : 'center'
                }}>
                    <Typography variant={isPhone ? 'h2' : 'h1'}>{Title?.Title}</Typography>
                </Box>
                <Box className={'Icon-description-list'} component={'ul'} sx={{
                    display: 'grid',
                    gridTemplateColumns: isSmallScreen ? '100%' : isPhone ? '50% 50%' : 'calc(50% - 50px) calc(50% - 50px)',
                    rowGap: isSmallScreen ? '22px' : '40px',
                    columnGap: isPhone ? '1em' : '50px',
                    justifyContent: 'space-between',
                    padding: isPhone ? '0 30px' : '0',
                    margin: isPhone ? '16px 0 0 0 0' : '34px 0 0 0'
                }}>
                    {List_Description?.map((item) => {
                        return (
                            <IconListComponent key={item.Description} Icon={item.Icon} Description={item.Description}/>
                        )
                    })}
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionTwo