import React from "react";
import MUIProvider from "@/Providers/MUIProvider";
import {ApolloWrapper} from "@/app/ApolloWrapper";
import type {Metadata} from 'next'
import { Manrope } from "next/font/google";
import NavBar from "@/Components/Navigation/NavBar";

export const metadata: Metadata = {
    title: 'Yoga Fusion',
    description: 'Kyiv Based Yoga Studio'
}
const manrope = Manrope({subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"]})

const linkPlaceholders = [{link: 'наш простір', url: ''},
    {link: 'розклад', url: ''}, {link: 'вчителі', url: ''}, {link: 'тренування', url: ''}, {
        link: 'ціни',
        url: ''
    }, {link: 'контакти', url: ''}, {link: 'вхід', url: ''}, {link: 'ukr', url: ''}];


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <html lang="en">
            <body className={manrope.className}>
            <ApolloWrapper>
                <MUIProvider>
                    <NavBar linkItems={linkPlaceholders} />
                    {children}
                </MUIProvider>
            </ApolloWrapper>
            </body>
            </html>
    )
}
