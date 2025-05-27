'use client';
import {useQuery} from "@apollo/client";
import {teacherQuery} from "@/GraphQL/TSQueries/TeachersQueries";
import React, {useState} from "react";
import {alpha, Box, CardMedia, CircularProgress, Container, Typography, useTheme} from "@mui/material";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import Marquee from "@/Components/Marquee/Marquee";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import './page.css'
import renderBlocks from "@/Helpers/BlockRender";
import background from "../../../../public/icons/gradients/teachers/background_slug.png";
import {Discipline} from "@/app/teachers/page";
import {generateStrapiUrl, StrapiIcon} from "@/Components/Visual/StrapiIcons/StrapiIcon";


export default function Page({
                                 params,
                             }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = React.use(params)
    const teacherData = useQuery(teacherQuery, {variables: {teacherId: slug}});
    const {loading, data} = teacherData
    const [imgSrc] = useState(generateStrapiUrl(data?.teacher?.Photo?.url))
    const theme = useTheme()


    return (
        <Container id={'teacher-content'} sx={{
            display: 'flex',
            backgroundImage: `url(${background.src})`,
            justifyContent: 'center',
            flexDirection: 'column'
        }}
                   maxWidth={false}>
            <SectionWrapper className={loading ? 'teacher loading' : 'teacher'}>
                {loading ? <CircularProgress size={'150px'} className={'loader'}
                                             sx={{
                                                 justifySelf: 'center',
                                                 alignSelf: 'center',
                                                 color: theme.palette.primary.dark
                                             }}/> :
                    (
                        <Box className={'teacher-info'}>
                            <Box className={'photo'}>
                                <CardMedia component={'img'}
                                           src={imgSrc}/>
                            </Box>
                            <Box className={'title'}>
                                <Typography variant={'h1'}>{data?.teacher?.Name}</Typography>
                            </Box>
                            <Box className={'description'}>
                                {data && data?.teacher && renderBlocks({
                                    content: data?.teacher?.Description,
                                    className: 'description-item'
                                })}
                            </Box>
                        </Box>
                    )}
                {!loading && data?.teacher?.disciplines?.length > 0 && (<Box className={'teacher-skills'} borderColor={theme.palette.primary.dark}
                                  bgcolor={alpha(`${theme.palette.secondary.dark}`, 0.6)}>
                    {data?.teacher?.disciplines?.map((item: Discipline) =>
                        <Box key={item?.Name} className={'skill-item'}>
                            <Box width={'34px'} height={'34px'}>
                                {item?.Icon?.url && (
                                    <StrapiIcon url={item?.Icon?.url} sx={{maxWidth: '100%', position: 'relative'}} />
                                )}
                            </Box>
                            <Typography className={'skill-title'}
                                        variant={'h6'}>{item?.Name}</Typography>
                        </Box>
                    )}
                </Box>)
                }
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
        </Container>
    )
}