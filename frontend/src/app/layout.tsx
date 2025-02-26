import React from "react";
import MUIProvider from "@/Providers/MUIProvider";
import {ApolloWrapper} from "@/app/ApolloWrapper";
import type {Metadata} from 'next'
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
    title: 'Yoga Fusion',
    description: 'Kyiv Based Yoga Studio'
}
const manrope = Manrope({subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"]})

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
                    {children}
                </MUIProvider>
            </ApolloWrapper>
            </body>
            </html>
    )
}
