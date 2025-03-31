import { LandingSectionEightContent } from "@/types/LandingPageTypes";
import SectionWrapper from './SectionWrapper'
import {Accordion, AccordionSummary, AccordionDetails, Box, Container, Typography} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import './SectionSix.css'

const LandingSectionSix = ({Title, FAQ_elements}:LandingSectionEightContent) => {
    console.log(FAQ_elements)


    return (
        <SectionWrapper id={'Landing-section-six'}>
            <Container maxWidth={false} sx={{display: 'flex', flexDirection: 'column', gap: '34px', justifyContent:'center', alignItems: 'center', paddingLeft: '0 !important', paddingRight: '0 !important'}}>
                <Box className={'title-wrapper'} sx={{display: 'flex', flexDirection: 'column'}}>
                    {Title && <Typography variant={'h1'} sx={{alignSelf: Title.Placement === 'Left' ? 'flex-start' : Title.Placement === 'Right' ? 'flex-end' : Title?.Placement === 'Center' ? 'center' : undefined}}>{Title?.Title}</Typography>}
                </Box>
                <Box className={'FAQ'} sx={{paddingBottom: '80px', maxWidth: '962px', width: '100%'}}>
                    {FAQ_elements && FAQ_elements.length > 0 && FAQ_elements.map((item, index) =>
                        <Accordion key={item.Title} slotProps={{ heading: { component: 'div' } }} id={`faq_item-${index+1}`} sx={{borderColor: 'primary.dark'}}  className={'FAQ-accordion'}>
                            <AccordionSummary
                                expandIcon={<AddOutlined />}
                                aria-controls="panel2-content"
                                id={`FAQ_header${index+1}`}
                            >
                                <Typography variant={'body1'} fontWeight={500}>
                                    {item.Title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Typography variant={'body1'} fontWeight={200}>
                                    {item.Description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionSix