import {Container} from "@mui/material";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import React from "react";
import './page.css'
import AuthenticationWrapper from "@/app/account/components/registerForm";

export default function Page() {
    return (
        <Container maxWidth={false} id={'account-page'}>
            <SectionWrapper className={'wrapper'}>
                <AuthenticationWrapper />
            </SectionWrapper>
        </Container>
    )
}

