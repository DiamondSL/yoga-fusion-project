'use client';
import {useQuery} from "@apollo/client";
import {classesQuery} from "@/GraphQL/TSQueries/ClassesQueries";
import {alpha, Box, Typography, useTheme} from "@mui/material";
import {CardElement} from "@/Components/Card/Card";
import {ClassEntity} from "@/app/classes/page";
import {useRouter} from "next/navigation";
import PinkStarVector from "@/Components/Visual/SVGIcons/PinkStar";
import LoaderElement from "@/Components/Loader";
import placeholder from '../../../../public/icons/classes/class-placeholder.jpg'

export const ClassesList = () => {
    const classes = useQuery(classesQuery)
    const {data, loading} = classes
    const theme = useTheme()
    const router = useRouter()


    return (
        <Box className={'classes-list'}>
            {loading ? <LoaderElement /> : !loading && data && data?.classes && data?.classes.map((item: ClassEntity) => {
                const intensity = item?.Intensity?.replace(/[^\d.]/g, '')
                return (
                    <CardElement className={'class-card'} onClick={() => router.push(`classes/${item?.documentId}`)} key={`${item?.Name}${item?.Intensity}${item?.Information}`}
                                 sx={{maxWidth: '460px', width: '100%', height: '300px', position: 'relative', borderColor: theme?.palette?.primary?.dark}}
                                 backdrop={false} image={{src: item?.Photo?.[0]?.url as string ?? placeholder?.src, background: true}}>
                        <Box className={'class-content'} bgcolor={alpha(`${theme.palette.secondary.dark}`, 0.6)}>
                            <Box className={'title'}>
                            <Typography variant={'h3'} color={theme.palette.primary.main}>{item?.Name}</Typography>
                            <Box className={'intensity-wrapper'}>
                                <PinkStarVector sx={{display: Number(intensity) > 0 ? 'flex' : 'none', alignSelf: 'center'}} width={'41px'} height={'41px'}/>
                                <PinkStarVector sx={{display: Number(intensity) > 1 ? 'flex' : 'none', alignSelf: 'center'}} width={'41px'} height={'41px'}/>
                                <PinkStarVector sx={{display: Number(intensity) > 2 ? 'flex' : 'none', alignSelf: 'center'}} width={'41px'} height={'41px'}/>
                            </Box>
                            </Box>
                            <Box className={'class-description'}>
                                <Typography variant={'bodyL'} color={theme.palette.primary.main}>{item?.Information}</Typography>
                                <Box component={'img'} marginTop={'20px'} marginBottom={0} src={'icons/arrows/classPage_line.svg'}></Box>
                            </Box>
                        </Box>
                    </CardElement>)
            })}
        </Box>
    )
}