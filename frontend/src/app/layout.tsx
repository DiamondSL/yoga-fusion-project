import React from "react";
import MUIProvider from "@/Providers/MUIProvider";
import {ApolloWrapper} from "@/app/ApolloWrapper";
import type {Metadata} from 'next'
import { Manrope } from "next/font/google";
import NavBar from "@/Components/Navigation/NavBar";
import Footer from "@/Components/Navigation/Footer";
import ContextWrapper from "@/app/ContextWrapper";

export const metadata: Metadata = {
    title: 'Yoga Fusion',
    description: 'Kyiv Based Yoga Studio'
}

const manrope = Manrope({subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"]})

const linkPlaceholders = [{link: 'наш простір', url: ''},
    {link: 'розклад', url: ''}, {link: 'вчителі', url: ''}, {link: 'тренування', url: ''}, {
        link: 'ціни',
        url: ''
    }, {link: 'контакти', url: ''}];

const footerPlaceholders = {
    links: [{to: '/', text: 'тренування'}, {to: '/', text: 'ціни'}, {to: '/', text: 'контакти'}, {to: '/', text: 'івенти'}, {to: '/', text: 'розклад'}, {to: '/', text: 'вхід'}, {to: '/', text: 'наш простір'}, {to: '/', text: 'вчителі'}],
    socialMedia: [{to: '/', text: 'instagram'}, {to: '/', text: 'facebook'}]
}


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <html lang="en">
            <body className={manrope.className}>
            <ContextWrapper>
            <ApolloWrapper>
                <MUIProvider>
                    <NavBar linkItems={linkPlaceholders} />
                    {children}
                    <Footer links={footerPlaceholders.links} socialMedia={footerPlaceholders.socialMedia} />
                </MUIProvider>
            </ApolloWrapper>
            </ContextWrapper>
            </body>
            </html>
    )
}
