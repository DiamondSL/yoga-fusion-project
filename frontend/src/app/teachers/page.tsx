import {Box, Button, Container, Typography} from "@mui/material";
import Marquee from "@/Components/Marquee/Marquee";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import './page.css'
import background from '../../../public/icons/gradients/teachers/background_main.png'
import React from "react";
import {BlocksContent} from "@strapi/blocks-react-renderer";
import {TeachersList} from "@/app/teachers/components/teachersList";

export type Discipline = {
    Name?: string
    documentId?: string
    Icon?: {
        url?: string
        width?: number | string
        height?: number | string
    }
}


export type teacherEntity = {
    Active?: boolean
    Description?: BlocksContent
    disciplines?: Discipline[]
    Rating?: number
    Name?: string
    documentId: string
    Photo?: {
        url?: string
        width?: number | string
        height?: number | string
    }
}

const Teachers = () => {

    return (
        <Container id={'teachers-content'} maxWidth={false}
                   sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundImage: `url(${background.src})`}}>
            <SectionWrapper className={'cards'}>
               <TeachersList />
            </SectionWrapper>
            <Marquee
                content={
                <Box className={'marquee-item'}>
                    <Typography variant={'body2'}>book now</Typography>
                    <ArrowRightAltIcon/>
                </Box>
            } style={{
                borderTop: '1px solid black',
                borderBottom: '1px solid black',
                backgroundColor: 'secondary.light',
                display: 'flex',
                animationComposition: 'add',
                animationDirection: 'reverse'
            }} speed={60}/>
            <SectionWrapper className={'actions'}>
                <Typography variant={'h3'} letterSpacing={'0.5px'}>
                    реєструйся та отримай 1 безкоштовний класс
                </Typography>
                <Button variant={'contained'}>
                    зареєструватися
                </Button>
            </SectionWrapper>
        </Container>
    )
}

export default Teachers;
