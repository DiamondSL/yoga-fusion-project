'use client'
import {Container} from '@mui/material';
import LandingSectionOne from "@/Components/Landing/Section_One";
import React from "react";
import LandingSectionTwo from "@/Components/Landing/Section_Two";
import NavBar from "@/Components/Navigation/NavBar";


const linkPlaceholders = [{link: 'наш простір', url: ''},
    {link: 'розклад', url: ''}, {link: 'вчителі', url: ''}, {link: 'тренування', url: ''}, {
        link: 'ціни',
        url: ''
    }, {link: 'контакти', url: ''}, {link: 'вхід', url: ''}, {link: 'ukr', url: ''}];

const Home = () => {

    return (
        <>
            <NavBar linkItems={linkPlaceholders}  />
            <Container maxWidth={false} sx={{padding: '0 0 0 0 !important', margin: '0 0 0 0 !important'}}
                       className={'LandingPage'}>
                <LandingSectionOne />
                <LandingSectionTwo />
            </Container>
        </>
    );
}

export default Home;
