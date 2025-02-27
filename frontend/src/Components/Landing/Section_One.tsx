'use client';
import {Box} from "@mui/system";
import {Container, Typography, Button, ButtonPropsVariantOverrides, CardMedia} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import StarSvgIcon from "@/Components/Visual/SVGIcons/StarSvgIcon";
import {gql, useQuery} from "@apollo/client";


type SectionOneButton = {
    Text?: string
    Variant?: 'primary' | ButtonPropsVariantOverrides | undefined
    Action?: Function | string | undefined
}

interface LandingSectionOneContent {
    Title?: {
        Title?: string;
        Placement?: 'Left' | 'Right' | 'Center';
    }[]
    Buttons?: SectionOneButton[]
}

const SectionOnePlaceHolderValues = {
    Title: [{Title: 'Be your own fusion.', Placement: 'Left'}, {Title: 'Join the community.', Placement: 'Right'}, {Title: 'Transform yourself.', Placement: 'Center'}],
    Button: [{ Text: 'fusion me, now', Variant: 'secondary', Action: undefined}]
}

const SectionOneContentQuery = gql`
    query LandingPage($status: PublicationStatus) {
        landingPage(status: $status) {
            createdAt
            documentId
            Section_One {
                Title {
                    Title
                    Placement
                }
                Buttons {
                    Text
                    Variant
                }
            }
        }
    }
`

const LandingSectionOne:FC<LandingSectionOneContent> = ({Title = SectionOnePlaceHolderValues.Title, Buttons = SectionOnePlaceHolderValues.Button}) => {
    const { error, data } = useQuery(SectionOneContentQuery);
    const [sectionOneContent, setSectionOneContent] = useState({Title, Buttons});

    useEffect(() => {
        if (data?.landingPage?.Section_One) {
            data?.landingPage?.Section_One.Title.length > 0 && setSectionOneContent((prevState) => ({Buttons: prevState.Buttons, Title: data.landingPage.Section_One.Title}))
            data?.landingPage?.Section_One.Buttons.length > 0 && setSectionOneContent((prevState) => ({Title: prevState.Title, Buttons: data.landingPage.Section_One.Buttons}))
        }
    }, [data]);

    if (error) {
        console.log(error)
    }

    return (
        <Box component={"section"} id={'Landing-section-one'} sx={{width: '100vw', margin: '0 0 0 0', padding: '0 0 0 0'}}  >
            <Container className={'Gradients'} maxWidth={false} sx={{opacity: '0%', overflow: 'hidden', position: "absolute", width: '100vw', maxHeight: '587px', height: '100%', display: 'inline-flex', justifyContent: 'space-between', padding: '0 !important', zIndex: '-1'}}>
                <CardMedia sx={{width: '598.4041748046875px', height: '603.7822875976562px', objectFit: 'contain'}}  component="img" src={'icons/gradients/Desktop/Landing_Section_One_Yellow_Elipse.svg'} />
                <CardMedia sx={{width: '649.0210571289062px', height: '653.6255493164062px', objectFit: 'contain'}} component="img" src={'icons/gradients/Desktop/Landing_Section_One_Red_Elipse.svg'} />
                <CardMedia sx={{width: '932.4757080078125px', height: '939.091064453125px', objectFit: 'contain'}} component="img" src={'icons/gradients/Desktop/Landing_Section_One_Pink.svg'} />
            </Container>
            <Container maxWidth={false} sx={{display: 'flex', flexDirection: 'column', maxWidth: '1067px', width: '100%', padding: '82px 0 0 0 !important'}}>
                <Box className={'Upper-stars'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Box className={'left'} sx={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
                    <StarSvgIcon className={'upper'} style={{width: '22px', height: '29px', marginLeft: '26px'}}  />
                    <StarSvgIcon className={'down'} style={{width: '15.125px', height: '19.9375px'}}/>
                    </Box>
                    <Box className={'right'} sx={{alignSelf: 'flex-end', marginRight: '230px'}}>
                        <StarSvgIcon style={{width: '15.125px', height: '19.9375px'}}/>
                    </Box>
                </Box>
                <Box className={'Title'} sx={{display: 'flex', flexDirection: 'column', alignSelf:'center', maxWidth: '867px', width: '100%'}}>
                    {sectionOneContent?.Title?.map((item) => {
                        const AlignSelfProperty = item.Placement === 'Left' ? {alignSelf: 'flex-start'} : item.Placement === 'Right' ? {alignSelf: 'flex-end'} : item?.Placement === 'Center' ? {alignSelf: 'center'} : undefined
                        return (
                        <Typography key={item.Title} variant={'h1'} sx={{...AlignSelfProperty}}>{item.Title}</Typography>
                        )
                    })}
                </Box>
                <Box className={'Action-Content'} sx={{display: 'flex', maxWidth: '867px', width: '100%', alignSelf: 'center', justifyContent: 'space-between', marginTop: '58px'}}>
                    <Box className={'Down-stars'}>
                        <Box className={'left'} sx={{alignSelf: 'flex-start' }}>
                            <StarSvgIcon style={{width: '15.125px', height: '19.9375px'}}/>
                        </Box>
                    </Box>
                        <Box className={'actions'} sx={{display: 'flex', justifySelf: 'stretch', flexDirection: 'column', alignSelf: 'stretch'}}>
                            {sectionOneContent.Buttons.length > 0 && sectionOneContent.Buttons.map((item) => {
                                return (
                                    <Button key={item.Text} variant={item.Variant === "secondary" ? "secondary" : item.Variant === "primary" ? undefined : item.Variant === "transparent" ? "transparent" : "secondary"}>{item.Text}</Button>
                                )
                            })}
                        </Box>
                        <Box className={'right'} sx={{display: 'flex', alignSelf: 'flex-end', flexDirection: 'column', gap: '14px'}}>
                            <StarSvgIcon className={'upper'} style={{width: '15.125px', height: '19.9375px'}}/>
                            <StarSvgIcon className={'down'} style={{width: '22px', height: '29px', marginLeft: '26px'}}  />
                        </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default LandingSectionOne