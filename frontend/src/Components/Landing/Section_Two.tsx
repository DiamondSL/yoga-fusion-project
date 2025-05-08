import {Box} from "@mui/system";
import {CardMedia, Container, Typography} from "@mui/material";
import SectionWrapper from './SectionWrapper'
import {LandingSectionTwoContent, ListDescriptionItem} from "@/types/LandingPageTypes";
import useMediaQuery from "@mui/material/useMediaQuery";
import {generateStrapiUrl} from "@/Components/Visual/StrapiIcons/StrapiIcon";
import blockRender from "@/Helpers/BlockRender";
import './section_two.css'

const IconListComponent = ({Icon, Description, className}: ListDescriptionItem) => {
    const isPhone = useMediaQuery('(max-width:767px)')
    const isSmallScreen = useMediaQuery('(max-width:425px)')
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
                           src={Icon?.url?.includes('uploads') ? generateStrapiUrl(Icon?.url) : Icon?.url}
                           sx={{
                               objectFit: 'contain',
                               maxWidth: isPhone ? '30px' : '100%',
                               width: isPhone ? '30px' : Icon?.width,
                               height: isPhone ? '30px' : Icon?.height
                           }}/>
            </Box>
            <Box sx={{maxWidth: isPhone ? '280px' : '358px', width: '100%'}}>
                {typeof Description === 'string' ?
                    <Typography className={className}
                                variant={'body2'}>{Description ? Description : 'Blank'}</Typography> :
                    typeof Description === 'object' &&
                    blockRender({content: Description, className: className})
                }
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
    const isTablet = useMediaQuery('(min-width:768px) and (max-width:1024px)')

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
                    padding: isPhone ? '0 30px 0 30px' : isTablet ? '0 30px 0 30px' : '',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: Title?.Placement === 'Center' ? 'center' : Title?.Placement === 'Left' ? 'flex=start' : Title?.Placement === 'Right' ? 'flex-end' : 'center'
                }}>
                    <Typography variant={isPhone ? 'h2' : 'h1'}>{Title?.Title}</Typography>
                </Box>
                <Box className={'Icon-description-list'} component={'ul'} sx={{
                    display: 'grid',
                    gridTemplateColumns: isSmallScreen ? '100%' : isPhone ? '1fr 1fr' : 'calc(50% - 50px) calc(50% - 50px)',
                    rowGap: isSmallScreen ? '22px' : '40px',
                    columnGap: isPhone ? '1em' : '50px',
                    justifyContent: 'space-between',
                    padding: (isPhone || isTablet) ? '0 30px' : '0',
                    margin: isPhone ? '16px 0 0 0 0' : '34px 0 0 0'
                }}>
                    {List_Description && List_Description.map((item) => {
                       return (
                            <IconListComponent key={typeof item?.Description === 'string' && true ? item?.Description : item?.Icon?.url} Icon={item?.Icon} className={'section-two-blocks'} Description={item?.Description}/>
                        )
                    })}
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionTwo