import {Container} from "@mui/material";
import React from "react";
import SessionsList from "@/app/calendar/components/sessionsList";
import './page.css'
import background from "../../../public/icons/gradients/blue-gradient-centered.png";


export default function Page() {
    return (
        <Container maxWidth={false} id={'calendar-page'} sx={{display: 'flex', justifyContent: 'center', backgroundImage: `url(${background?.src})`}}>
            <SessionsList />
        </Container>
    )
}
