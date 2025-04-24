'use client';
import {useQuery} from "@apollo/client";
import {teacherQuery} from "@/GraphQL/TSQueries/TeachersQueries";
import React from "react";
import {alpha, Box, CardMedia, CircularProgress, Container, Typography, useTheme} from "@mui/material";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import Marquee from "@/Components/Marquee/Marquee";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import './page.css'
import renderBlocks from "@/Helpers/BlockRender";
import background from "../../../../public/icons/gradients/teachers/background_slug.png";
import RedStar from "@/Components/Visual/SVGIcons/RedStar";
import BlueSlime from "@/Components/Visual/SVGIcons/BlueSlime";
import GreenSlime from "@/Components/Visual/SVGIcons/GreenSlime";
import LimeSlime from "@/Components/Visual/SVGIcons/LimeSlime";

type DiscipLine = {
    Experience?: string
    Active?: boolean
    Name?: string
}

export default function Page({
                                 params,
                             }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = React.use(params)
    const teacherData = useQuery(teacherQuery, {variables: {teacherId: slug}});
    const {loading, data} = teacherData
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
                                           src={process?.env?.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_URL}/cms${data?.teacher?.Photo?.url}` : `http://localhost:1337${data?.teacher?.Photo?.url}`}/>
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
                {!loading && <Box className={'teacher-skills'} borderColor={theme.palette.primary.dark}
                                  bgcolor={alpha(`${theme.palette.secondary.dark}`, 0.6)}>
                    {data?.teacher?.Disciplines.filter((item: DiscipLine) => {
                        return item?.Active === true
                    }).map((item: DiscipLine) =>
                        <Box key={item?.Name} className={'skill-item'}>
                            <Box width={'34px'} height={'34px'}>
                                {item?.Name?.includes('Hatha') ?
                                    <GreenSlime width={'34px'} height={'34px'}/> : item?.Name?.includes('Power') ?
                                        <RedStar width={'34px'} height={'34px'}/> : item?.Name?.includes('Vinyasa') ?
                                            <BlueSlime width={'34px'}
                                                       height={'34px'}/> : item?.Name?.includes('Stretching') ?
                                                <LimeSlime sx={{transform: 'scale(1)'}}/> :
                                                <LimeSlime sx={{transform: 'scale(1)'}}/>}
                            </Box>
                            <Typography className={'skill-title'}
                                        variant={'h6'}>{item?.Name?.replace('_', ' ')}</Typography>
                        </Box>
                    )}
                </Box>
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