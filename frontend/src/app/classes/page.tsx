import {Box, Button, Container, Typography} from "@mui/material";
import {ClassesList} from "@/app/classes/components/classesList";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import {teacherEntity} from "@/app/teachers/page";
import './page.css'
import React from "react";
import background from "../../../public/icons/gradients/classes/background-main.png";
import {BlocksContent} from "@strapi/blocks-react-renderer";

export type ClassEntity = {
    documentId: string
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
    Intensity?: string
    Information?: string
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
            <SectionWrapper className={'actions'} sx={{backgroundImage: `url(${background.src})`}}>
                <Box className={'actions-content'}>
                <Typography variant={'h3'} letterSpacing={'0.5px'}>
                    реєструйся та отримай 1 безкоштовний класс
                </Typography>
                <Button variant={'contained'}>
                    зареєструватися
                </Button>
                </Box>
            </SectionWrapper>
        </Container>
    )
}