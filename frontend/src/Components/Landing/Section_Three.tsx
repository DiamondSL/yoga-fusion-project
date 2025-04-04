import {LandingSectionThreeContent} from "@/types/LandingPageTypes";
import SectionWrapper from './SectionWrapper'
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {Box, Container, Typography, Button as ButtonEl} from "@mui/material";
import Link from "next/link";
import ImageSlider from "@/Components/Slider/Slider";

const LandingSectionThree = ({Title, Button, Description, Photos}:LandingSectionThreeContent) => {
    const RenderedButtons = Button && Button.map((item) => {
        return <ButtonEl key={item.Text} sx={{maxWidth: '239px', width: '100%'}}
                         variant={String(item.Variant) === "secondary" ? "secondary" : item.Variant === "primary" ? undefined : String(item.Variant) === "transparent" ? "transparent" : "secondary"}>{item.Text}</ButtonEl>
    })

    return (
        <SectionWrapper id={'Landing-section-three'}>
            <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                position: 'relative',
                gap: '40px',
                paddingTop: '60px',
                paddingBottom: '80px',
                paddingLeft: '0 !important',
                paddingRight: '0 !important'
            }}>
                <Box component={'article'} className={'section-three-article'} sx={{maxWidth: '575px', display: 'flex', position: 'relative', flexDirection: 'column'}}>
                    <Box
                        component="img"
                        src={'icons/shapes/Section_Three_Shape.svg'}
                        alt={'Section Three'}
                        sx={{
                            maxWidth: '575px',
                            width: 'max-content',
                            height: 'auto',
                            objectFit: 'contain',
                            left: '-21%',
                            position: 'absolute',
                            top: '17%',
                            transition: 'opacity 0.3s ease-in-out',
                        }}
                    />
                    <Box className={'title'} display={'flex'} sx={{marginBottom: '8px', justifyContent: 'center'}}>
                        {Title?.title && <Typography variant={'h1'}>{Title?.title}</Typography>}
                    </Box>
                    <Box className={'description'} sx={{display: 'flex', flexDirection: 'column', gap: '38px'}}>
                        <Container maxWidth={false} sx={{width: '100%', display: 'flex', maxWidth: '460px', flexDirection: 'column', gap: '38px', padding: '0 !important', justifyContent: 'flex-end', marginRight: '0 !important'}} >
                        {Title?.motto && <Typography variant={'body1'}>{Title?.motto}</Typography>}
                        {Description ? <BlocksRenderer
                            content={Description}
                            blocks={{
                                // You can use the default components to set class names...
                                paragraph: ({children}) => <Typography variant={'body1'}>{children}</Typography>,
                                // ...or point to a design system
                                heading: ({children, level}) => {
                                    switch (level) {
                                        case 1:
                                            return <Typography variant="h1">{children}</Typography>
                                        case 2:
                                            return <Typography variant="h2">{children}</Typography>
                                        case 3:
                                            return <Typography variant="h3">{children}</Typography>
                                        case 4:
                                            return <Typography variant="h4">{children}</Typography>
                                        case 5:
                                            return <Typography variant="h5">{children}</Typography>
                                        case 6:
                                            return <Typography variant="h6">{children}</Typography>
                                        default:
                                            return <Typography variant="h1">{children}</Typography>
                                    }
                                },
                                // For links, you may want to use the component from your router or framework
                                link: ({children, url}) => <Link href={url}>{children}</Link>,
                            }}
                            modifiers={{
                                bold: ({children}) => <strong>{children}</strong>,
                                italic: ({children}) => <span className="italic">{children}</span>,
                            }}
                        /> : <Box>
                            <Typography><Typography component={'strong'} variant={'body1'}>yoga fusion</Typography> – це  це більше, ніж йога-студія. ми балансуємо між місцем наповнення та сили: як фізично, так і ментально. для кожного та кожної, хто завітає до нас: раді стати місцем вашого спокою та перезавантаження. просто в самому серці києва!</Typography>
                        </Box>}
                        </Container>
                        <Container maxWidth={false} sx={{padding: '0 !important', display: 'flex', flexDirection: 'row', gap: '24px', justifyContent: 'end'}}>
                            {RenderedButtons && RenderedButtons.map((item) => item)}
                        </Container>
                    </Box>
                </Box>
                <Box>
                    {Photos && Photos.length > 0 && <ImageSlider style={{border: '1px solid', borderColor: 'primary.dark'}} images={Photos?.map((item) => 'http://localhost:1337'+item.url)} width={'700px'} height={'400px'} />}
                </Box>
            </Container>
        </SectionWrapper>
    )
}

export default LandingSectionThree