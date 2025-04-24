'use client';
import {Box, Button, CircularProgress, Container, Typography, TypographyVariant} from "@mui/material";
import Marquee from "@/Components/Marquee/Marquee";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import './page.css'
import {CardElement} from "@/Components/Card/Card";
import {teachersQuery} from "@/GraphQL/TSQueries/TeachersQueries";
import {useQuery} from "@apollo/client";
import background from '../../../public/icons/gradients/teachers/background_main.png'
import {useRouter} from "next/navigation";
import React from "react";
import RatingIcon from "@/Components/Visual/SVGIcons/Rating";
import {BlocksContent} from "@strapi/blocks-react-renderer";


export type teacherEntity = {
    Active?: boolean
    Description?: BlocksContent
    Disciplines?: {
        Name?: string
        Active?: boolean
        Experience: string
    }[]
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
    const teachers = useQuery(teachersQuery);
    const {data, loading} = teachers
    const router = useRouter();

    return (
        <Container id={'teachers-content'} maxWidth={false}
                   sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundImage: `url(${background.src})`}}>
            <SectionWrapper className={'cards'}>
                {!loading ? data?.teachers?.filter((item: teacherEntity) => item?.Active === true)?.map(
                    (item: teacherEntity) => (
                        <CardElement className={'teacher-card'} onClick={() => router.push(`teachers/${item?.documentId}`)} image={{src: item?.Photo?.url as string, background: true}} key={item?.Name} sx={{
                            backgroundColor: 'rgba(74, 62, 48, 0.6)',
                            border: '1px solid',
                            borderColor: 'primary.dark',
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '300px',
                            width: '100%',
                            height: '300px',
                            position: 'relative',
                            cursor: 'pointer'
                        }} title={'Anastasiia Flora'}
                                     backdrop={false}>
                            {item.Rating && item?.Rating > 4.5 && (
                                <Box className={'rating'}>
                                    <Box className={'rating-content'}>
                                        <RatingIcon width={'96px'} height={'auto'} />
                                        <Typography
                                            variant={'BodyFontSizeLRegular' as TypographyVariant} className={'rating-text'}>TOP</Typography>
                                    </Box>
                                </Box>
                            )}
                        </CardElement>
                    )) : (
                        <Box className={'loader'}>
                            <CircularProgress size={'150px'} className={'loader'} sx={{justifySelf: 'center', alignSelf: 'center', color: 'primary.dark'}}/>
                        </Box>)}
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
