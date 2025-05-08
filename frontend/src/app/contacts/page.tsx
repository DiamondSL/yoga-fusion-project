import {Container} from "@mui/material";
import SectionWrapper from "@/Components/Landing/SectionWrapper";
import React from "react";
import ContactInformationSection from "./components/ContactInformation";
import './page.css'
import ContactsForm from "@/app/contacts/components/ContactsForm";

export default function Page() {
    return (
        <Container maxWidth={false} id={'contacts-page'}>
            <SectionWrapper className={'wrapper'}>
                <ContactInformationSection/>
                <ContactsForm/>
            </SectionWrapper>
        </Container>
    )
}

