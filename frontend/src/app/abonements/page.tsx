import {Container} from "@mui/material";
import './page.css'
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import {BlocksContent} from "@strapi/blocks-react-renderer";
import AbonementsList from "./components/abonementsList";
import React from "react";

const svg = `url('data:image/svg+xml, <svg viewBox="0 0 1440 1617" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(%23filter0_f_6681_11092)"><ellipse cx="693.196" cy="692.209" rx="693.196" ry="692.209" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1412.42 1416.39)" fill="%23D5F166"/></g><g filter="url(%23filter1_f_6681_11092)"><ellipse cx="446.331" cy="447.319" rx="446.331" ry="447.319" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1167.53 1169.53)" fill="%23F7BE00"/></g><g filter="url(%23filter2_f_6681_11092)"><ellipse cx="464.105" cy="464.106" rx="464.105" ry="464.106" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1183.32 1187.3)" fill="%23FF81BE"/></g><defs><filter id="filter0_f_6681_11092" x="-172" y="-170" width="1784.42" height="1786.39" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_6681_11092"/></filter><filter id="filter1_f_6681_11092" x="172.891" y="176.865" width="1094.64" height="1092.66" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_6681_11092"/></filter><filter id="filter2_f_6681_11092" x="-144.887" y="-140.91" width="1728.21" height="1728.21" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_6681_11092"/></filter></defs></svg>')`

export type abonementEntity = {
    documentId: string,
    Type?: string,
    Name?: {
        Title?: string
        Shape?: {
            url?: string
            width?: number | string
            height?: number | string
        }
    }
    Price?: {
        Amount?: string | number
        Shape?: {
            url?: string
            width?: number | string
            height?: number | string
        }
    }
    Description?: BlocksContent
    Trainings_amount?: number
}

export default function Page() {

    return (
        <Container maxWidth={false} id={'abonements-page'} sx={{backgroundImage: svg}}>
            <SectionWrapper className={'abonements'}>
                <AbonementsList />
            </SectionWrapper>
        </Container>
    )
}

