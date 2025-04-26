'use client';
import React from "react";
import {useQuery} from "@apollo/client";
import {alpha, Button, CircularProgress, Container, Typography, useTheme} from "@mui/material";
import {classQuery} from "@/GraphQL/TSQueries/ClassesQueries";
import {Box} from "@mui/system";
import background from "../../../../public/icons/gradients/classes/background-slug.png";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import renderBlocks from "@/Helpers/BlockRender";
import BlueSlime from "@/Components/Visual/SVGIcons/BlueSlime";
import Marquee from "@/Components/Marquee/Marquee";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import './page.css'
import PinkStarVector from "@/Components/Visual/SVGIcons/PinkStar";
import {generateStrapiUrl} from "@/Components/Visual/StrapiIcons/StrapiIcon";
import ImageSlider from "@/Components/Slider/Slider";

export default function Page({
                                 params,
                             }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = React.use(params)
    const classData = useQuery(classQuery, {variables: {classId: slug}});
    const {loading, data} = classData
    const theme = useTheme()

    return (
        <Container id={'class-content'} sx={{
            display: 'flex',
            backgroundImage: `url(${background.src})`,
            justifyContent: 'center',
            flexDirection: 'column'
        }}
                   maxWidth={false}>
            <SectionWrapper className={loading ? 'class loading' : 'class'}>
                {loading ?
                    <CircularProgress size={'150px'} className={'loader'}
                                      sx={{
                                          justifySelf: 'center',
                                          alignSelf: 'center',
                                          color: theme.palette.primary.dark
                                      }}/> :
                    (
                        <Box className={'class-info'}>
                            <Box className={'title'}>
                                <Typography variant={'h1'}>{data?.class?.Name}</Typography>
                                <Box className={'details'} borderColor={theme.palette.primary.dark} bgcolor={alpha(`${theme.palette.secondary.dark}`, 0.6)}>
                                    <Box className={'time'}>
                                        <Box className={'time-vector'}>
                                            <BlueSlime width={'31px'} height={'29px'} />
                                        </Box>
                                        <Typography variant={'h5'} fontSize={'20px'} color={'#FFFFFF'} fontWeight={'500'} fontStyle={'normal'}>
                                            time / {data?.class?.Duration} min
                                        </Typography>
                                    </Box>
                                    <Box className={'intensity'}>
                                        <Typography variant={'h5'} fontSize={'20px'} color={'#FFFFFF'} fontWeight={'500'} fontStyle={'normal'}>
                                        intensity / power
                                        </Typography>
                                        <Box className={'intensity-vector'}>
                                            <PinkStarVector sx={{
                                                display: Number(data?.class?.Intensity) > 0 ? 'flex' : 'none',
                                                alignSelf: 'center'
                                            }} width={'33px'} height={'28px'}/>
                                            <PinkStarVector sx={{
                                                display: Number(data?.class?.Intensity) > 1 ? 'flex' : 'none',
                                                alignSelf: 'center'
                                            }} width={'33px'} height={'28px'}/>
                                            <PinkStarVector sx={{
                                                display: Number(data?.class?.Intensity) > 2 ? 'flex' : 'none',
                                                alignSelf: 'center'
                                            }} width={'33px'} height={'28px'}/>
                                        </Box>
                                    </Box>
                                    <Box className={'actions'}>
                                        <Button variant={'contained'}>book</Button>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={'description'}>
                                {data && data?.class && data?.class?.Description?.length > 0 && renderBlocks({
                                    content: data?.class?.Description,
                                    className: 'description-item'
                                })}
                            </Box>
                            <Box className={'photo'}>
                                {data?.class?.Photo && data?.class?.Photo?.length > 1 ? (
                                    <ImageSlider width={'100%'} height={'440px'} style={{border: '1px solid', borderColor: theme.palette.primary.dark, objectFit: 'cover'}} images={data?.class?.Photo.map((item: { url: string; }) => generateStrapiUrl(item.url))} />
                                ) :
                                <Box component={'img'} border={'1px solid'} borderColor={theme.palette.primary.dark} width={'100%'} height={'440px'} sx={{objectFit: 'cover'}}
                                     src={generateStrapiUrl(data?.class?.Photo?.[0]?.url)}/>
                                }
                            </Box>
                        </Box>
                    )}
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