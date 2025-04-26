'use client';
import {useQuery} from "@apollo/client";
import {Box, CircularProgress, Typography, TypographyVariant} from "@mui/material";
import {CardElement} from "@/Components/Card/Card";
import {useRouter} from "next/navigation";
import {teachersQuery} from "@/GraphQL/TSQueries/TeachersQueries";
import RatingIcon from "@/Components/Visual/SVGIcons/Rating";
import React from "react";
import {teacherEntity} from "@/app/teachers/page";

export const TeachersList = () => {
    const teachers = useQuery(teachersQuery);
    const {data, loading} = teachers
    const router = useRouter();

    return !loading ? data?.teachers?.filter((item: teacherEntity) => item?.Active === true)?.map(
        (item: teacherEntity) => (
            <CardElement className={'teacher-card'} onClick={() => router.push(`teachers/${item?.documentId}`)}
                         image={{src: item?.Photo?.url as string, background: true}} key={item?.Name} sx={{
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
            }} title={item?.Name}
                         backdrop={false}>
                {item.Rating && item?.Rating > 4.5 && (
                    <Box className={'rating'}>
                        <Box className={'rating-content'}>
                            <RatingIcon width={'96px'} height={'auto'}/>
                            <Typography
                                variant={'BodyFontSizeLRegular' as TypographyVariant}
                                className={'rating-text'}>TOP</Typography>
                        </Box>
                    </Box>
                )}
            </CardElement>
        )) : (
        <Box className={'loader'}>
            <CircularProgress size={'150px'} className={'loader'}
                              sx={{justifySelf: 'center', alignSelf: 'center', color: 'primary.dark'}}/>
        </Box>)

}
