import React from "react";
import MUIProvider from "@/Providers/MUIProvider";
import {ApolloWrapper} from "@/app/ApolloWrapper";
import type {Metadata} from 'next'
import { Manrope } from "next/font/google";
import NavBar from "@/Components/Navigation/NavBar";
import Footer from "@/Components/Navigation/Footer";
import ContextWrapper from "@/app/ContextWrapper";
import './global.css';

export const metadata: Metadata = {
    title: 'Yoga Fusion',
    description: 'Kyiv Based Yoga Studio'
}

const manrope = Manrope({subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"]})

const linkPlaceholders = [{link: 'наш простір', url: ''},
    {link: 'розклад', url: 'calendar'}, {link: 'вчителі', url: 'teachers'}, {link: 'тренування', url: 'classes'}, {
        link: 'ціни',
        url: 'abonements'
    }, {link: 'контакти', url: 'contacts'}];

const footerPlaceholders = {
    links: [{to: 'classes', text: 'тренування'}, {to: 'abonements', text: 'ціни'}, {to: 'contacts', text: 'контакти'}, {to: '/', text: 'івенти'}, {to: 'calendar', text: 'розклад'}, {to: '/', text: 'вхід'}, {to: '/', text: 'наш простір'}, {to: 'teachers', text: 'вчителі'}],
    socialMedia: [{to: '/', text: 'instagram'}, {to: '/', text: 'facebook'}]
}


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <html>
            <body className={manrope.className}>
            <ApolloWrapper>
            <ContextWrapper initialLanguage={'uk-UA'}>
                <MUIProvider>
                    <NavBar linkItems={linkPlaceholders} />
                    {children}
                    <Footer links={footerPlaceholders.links} socialMedia={footerPlaceholders.socialMedia} />
                </MUIProvider>
            </ContextWrapper>
            </ApolloWrapper>
            </body>
            </html>
    )
}
