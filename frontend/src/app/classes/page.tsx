import {Box, Container, Typography} from "@mui/material";
import {ClassesList} from "@/app/classes/components/classesList";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import {Discipline, teacherEntity} from "@/app/teachers/page";
import React from "react";
import background from "../../../public/icons/gradients/background-pink_bottom.png";
import {BlocksContent} from "@strapi/blocks-react-renderer";
import './page.css'
import RegisterActions from "@/Components/Actions/register_actions";

export type Intensity = 'low_1' | 'mid_2' | 'high_3'

export type ClassEntity = {
    documentId: string
    Duration?: number
    Name?: string
    Photo?: {
        url?: string
        width?: number | string
        height?: number | string
    }[]
    Description?: BlocksContent
    teachers?: teacherEntity[]
    Time?: {
        Beginning: Date
        Minutes: number
    }
    Intensity?: Intensity
    Information?: string
    disciplines?: Discipline[]
}

export default function Page() {
    return (
        <Container id={'classes-content'} maxWidth={false}>
            <SectionWrapper className={'classes'}>
                <Box className={'heading'}>
                    <Typography variant={'h1'} textAlign={'center'}>Our Classes</Typography>
                </Box>
                <ClassesList/>
            </SectionWrapper>
            <RegisterActions  sx={{backgroundImage: `url(${background.src})`}}/>
        </Container>
    )
}