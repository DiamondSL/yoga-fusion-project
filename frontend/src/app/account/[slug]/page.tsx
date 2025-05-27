import {Container} from "@mui/material";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import React from "react";
import AccountComponent from "./components/Account";

export default function Page() {
    return (
        <Container maxWidth={false} id={'account-page'}>
            <SectionWrapper className={'wrapper'}>
                <AccountComponent />
            </SectionWrapper>
        </Container>
    )
}


