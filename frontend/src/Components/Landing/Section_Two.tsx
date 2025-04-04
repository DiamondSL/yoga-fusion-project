import {Box} from "@mui/system";
import {CardMedia, Container, Typography} from "@mui/material";
import SectionWrapper from './SectionWrapper'
import {LandingSectionTwoContent, ListDescriptionItem} from "@/types/LandingPageTypes";


const IconListComponent = ({Icon, Description}: ListDescriptionItem) => {
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
                <CardMedia component={'img'} alt={Icon?.alt} src={Icon?.url?.includes('uploads') ? 'http://localhost:1337/' + Icon?.url : Icon?.url} sx={{width: Icon?.width, height: Icon?.height}}/>
            </Box>
            <Box sx={{maxWidth: '358px', width: '100%'}}>
                <Typography variant={'body2'}>{Description ? Description : 'Blank'}</Typography>
            </Box>
        </Container>
    )
}

const LandingSectionTwo = ({
                               Title,
                               ListDescription
                           }: LandingSectionTwoContent) => {
    return (
        <SectionWrapper id={'Landing-section-two'}>
            <Container maxWidth={false} sx={{
                padding: '80px 0 !important',
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
                    {ListDescription?.map((item) => {
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