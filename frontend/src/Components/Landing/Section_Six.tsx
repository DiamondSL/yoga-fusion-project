import { LandingSectionEightContent } from "@/types/LandingPageTypes";
import SectionWrapper from './SectionWrapper'
import {Accordion, AccordionSummary, AccordionDetails, Box, Container, Typography} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import renderBlocks from "@/Helpers/BlockRender";
import './SectionSix.css'

const LandingSectionSix = ({Title, FAQ_elements}:LandingSectionEightContent) => {
    const isPhone = useMediaQuery('(max-width:767px)')

    return (
        <SectionWrapper id={'Landing-section-six'}>
            <Container maxWidth={false} sx={{display: 'flex', flexDirection: 'column', gap: isPhone ? '16px' : '34px', justifyContent:'center', alignItems: 'center', paddingLeft: isPhone ? '30px' : '0 !important', paddingRight: isPhone ? '30px' : '0 !important'}}>
                <Box className={'title-wrapper'} sx={{display: 'flex', flexDirection: 'column'}}>
                    {Title && <Typography variant={isPhone ? 'h2' : 'h1'} sx={{alignSelf: Title.Placement === 'Left' ? 'flex-start' : Title.Placement === 'Right' ? 'flex-end' : Title?.Placement === 'Center' ? 'center' : undefined}}>{Title?.Title}</Typography>}
                </Box>
                <Box className={'FAQ'} sx={{paddingBottom: '80px', maxWidth: '962px', width: '100%'}}>
                    {FAQ_elements && FAQ_elements?.length > 0 && FAQ_elements?.map((item, index) =>
                        <Accordion key={item.Title} slotProps={{ heading: { component: 'div' } }} id={`faq_item-${index+1}`} sx={{borderColor: 'primary.dark'}}  className={'FAQ-accordion'}>
                            <AccordionSummary
                                expandIcon={<AddOutlined height={14} width={14} sx={{color: 'primary.dark', width: '14px', height: '14px'}} />}
                                aria-controls="panel2-content"
                                id={`FAQ_header${index+1}`}
                            >
                                <Typography variant={isPhone? 'body2' : 'body1'} fontWeight={500}>
                                    {item?.Title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {item?.Description && renderBlocks({content: item?.Description, className: 'FAQ-content'})}
                            </AccordionDetails>
                        </Accordion>
                    )}
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionSix