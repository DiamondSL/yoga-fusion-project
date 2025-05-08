'use client';
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import {Box, Button, SxProps, Typography} from "@mui/material";
import React, {useContext} from "react";
import {LanguageContext} from "@/app/ContextWrapper";
import {Theme} from "@mui/system";


interface RegisterActionsProps {
    sx?: SxProps<Theme>
    buttonOnclick?: void
}

const RegisterActions = ({sx, buttonOnclick}:RegisterActionsProps) => {
    const language = useContext(LanguageContext).language;

    return (
        <SectionWrapper className={'actions'} sx={{...sx}}>
            <Box className={'actions-content'}>
            <Box className={'title'}>
                <Typography variant={'h3'} letterSpacing={'0.5px'}>
                    {language.includes('uk') ? 'реєструйся та отримай 1 безкоштовний класс' : 'register and get 1 free class'}
                </Typography>
            </Box>
            <Button onClick={() => buttonOnclick} variant={'contained'}>
                {language.includes('uk') ? 'зареєструватися' : 'register' }
            </Button>
            </Box>
        </SectionWrapper>
    )
}

export default RegisterActions;