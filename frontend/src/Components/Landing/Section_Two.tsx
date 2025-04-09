import {Box} from "@mui/system";
import {CardMedia, Container, Typography} from "@mui/material";
import SectionWrapper from './SectionWrapper'
import {LandingSectionTwoContent, ListDescriptionItem} from "@/types/LandingPageTypes";
import {useGradientCloudsBackground} from "@/Helpers/DynamicGradient";
import useMediaQuery from "@mui/material/useMediaQuery";

const IconListComponent = ({Icon, Description}: ListDescriptionItem) => {
    const appUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:1337'
    return (
        <Container component={'li'} maxWidth={false} sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '36px',
            padding: '0 !important',
            margin: '0 !important',
            flex: "50%"
        }}>
            <Box>
                <CardMedia component={'img'} alt={Icon?.alt}
                           src={process.env.NODE_ENV === 'development' && Icon?.url?.includes('uploads') ? 'http://localhost:1337' + Icon?.url : process.env.NODE_ENV === 'production' && Icon?.url?.includes('uploads') ? `${appUrl}/cms` + Icon?.url : Icon?.url}
                           sx={{objectFit: 'contain', width: Icon?.width, height: Icon?.height}}/>
            </Box>
            <Box sx={{maxWidth: '358px', width: '100%'}}>
                <Typography variant={'body2'}>{Description ? Description : 'Blank'}</Typography>
            </Box>
        </Container>
    )
}

const LandingSectionTwo = ({
                               Title,
                               List_Description
                           }: LandingSectionTwoContent) => {
    const isMobileMediumLikeWidth = useMediaQuery('(max-width:700px)')


    useGradientCloudsBackground({
        colors: ["#F7BE00", "#FE5347"],
        targetElementId: 'sections-gradient-container',
        animationDuration: 20,
        variant: 'roundGradient'
    });

    return (
        <SectionWrapper id={'Landing-section-two'}>
            <Container maxWidth={false} sx={{
                padding: isMobileMediumLikeWidth ? '0 60px 0 50px' : '80px 0 !important',
                maxWidth: '960px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box className={'title'} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: Title?.Placement === 'Center' ? 'center' : Title?.Placement === 'Left' ? 'flex=start' : Title?.Placement === 'Right' ? 'flex-end' : 'center'
                }}>
                    <Typography variant={'h1'}>{Title?.Title}</Typography>
                </Box>
                <Box className={'Icon-description-list'} component={'ul'} sx={{
                    display: 'grid',
                    gridTemplateColumns: 'calc(50% - 50px) calc(50% - 50px)',
                    rowGap: '40px',
                    columnGap: '50px',
                    justifyContent: 'space-between',
                    padding: '0 !important',
                    margin: '34px 0 0 0 !important'
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