'use client';
import {ThemeProvider} from '@mui/material/styles';
import OriginalTheme from '@/Theme/OriginalTheme';
import CssBaseline from '@mui/material/CssBaseline';
import React, {PropsWithChildren} from "react";
import NavBar from "@/Components/Navigation/NavBar";

const linkItems = [{link: 'наш простір', url: ''},
    {link: 'розклад', url: ''}, {link: 'вчителі', url: ''}, {link: 'тренування', url: ''}, {link: 'ціни', url: ''}, {link: 'контакти', url: ''}, {link: 'вхід', url: ''}, {link: 'ukr', url: ''}];

const MUIProvider = ({children}:PropsWithChildren) => {
    return (
                <ThemeProvider theme={OriginalTheme}>
                    <CssBaseline/>
                    <NavBar linkItems={linkItems}/>
                    {children}
                </ThemeProvider>
    )
}

export default MUIProvider