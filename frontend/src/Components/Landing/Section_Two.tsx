'use client';
import {Box} from "@mui/system";
import {Container, Typography, Button, ButtonPropsVariantOverrides, CardMedia} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import StarSvgIcon from "@/Components/Visual/SVGIcons/StarSvgIcon";
import {gql, useQuery} from "@apollo/client";


type ListDescriptionItem = {
    Description?: string;
    Icon?: {
        url?: string;
        height?: string;
        width?: string;
    }
}

interface LandingSectionTwoContent {
    Title?: {
        Title?: string;
        Placement?: 'Left' | 'Right' | 'Center';
    }
    ListDescription?: ListDescriptionItem[]
}

const SectionTwoPlaceHolderValues = {
    Title: {Title: 'Why us?', Placement: 'Center'},
    ListDescription: [{Description: 'Placeholder', Icon: {
        url: '/', height: '60px', width: '60px' }}]
}

const SectionTwoContentQuery = gql`
    query LandingPage($status: PublicationStatus) {
        landingPage(status: $status) {
            createdAt
            documentId
            Section_Two {
                id
                Title {
                    Title
                    Placement
                }
                ListDescription {
                    Description
                    Icon {
                        url
                        height
                        width
                    }
                }
            }
        }
    }
`

const LandingSectionTwo: FC<LandingSectionTwoContent> = ({
                                                             Title = SectionTwoPlaceHolderValues.Title,
                                                             ListDescription = SectionTwoPlaceHolderValues.ListDescription
                                                         }) => {
    const {error, data} = useQuery(SectionTwoContentQuery);
    const [SectionTwo, setSectionTwoContent] = useState({Title, ListDescription});

    useEffect(() => {
        if (data?.landingPage?.Section_Two) {
            data?.landingPage?.Section_Two?.Title && setSectionTwoContent((prevState) => ({Title: data.landingPage.Section_Two.Title, ListDescription: prevState.ListDescription}))
            data?.landingPage?.Section_Two?.ListDescription.length > 0 && setSectionTwoContent((prevState) => ({Title: prevState.Title, ListDescription: data?.landingPage.Section_Two.ListDescription}))
        }
    }, [data]);

    if (error) {
        console.log(error)
    }

    const { Placement } = SectionTwo.Title

    const IconListComponent = ({Icon, Description}:ListDescriptionItem) => {

        return (
            <Box></Box>
        )
    }




    return (
        <Box component={"section"} id={'Landing-section-two'} sx={{width: '100vw', margin: '0 0 0 0', padding: '0 0 0 0'}}>
            <Container maxWidth={false} sx={{maxWidth: '960px', width: '100%', display: 'flex', flexDirection: 'column', padding: '0 !important'}}>
                <Box className={'title'} sx={{paddingTop: '80px', display: 'flex', flexDirection: 'row', justifyContent: Placement === 'Center' ? 'center' : Placement === 'Left' ? 'flex=start' : Placement === 'Right' ? 'flex-end' :'center'}}>
                    <Typography variant={'h1'}>{SectionTwo.Title.Title}</Typography>
                </Box>
                <Box className={'Icon-description-list'}>

                </Box>
            </Container>
        </Box>
    )
}

export default LandingSectionTwo