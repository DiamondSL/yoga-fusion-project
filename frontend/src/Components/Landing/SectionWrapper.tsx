'use client'
import {Box, BoxProps} from "@mui/system";
import React from "react";


type SectionWrapper = {
    children: React.ReactNode;
    id?: string;
    sx?: BoxProps;
}


const SectionWrapper = ({children, id, sx}:SectionWrapper) => {
    return (
        <Box component={"section"} id={id ?? undefined} sx={{width: '100vw', margin: '0 0 0 0', padding: '0 0 0 0', ...sx}}>
            {children}
        </Box>
    )
}

export default SectionWrapper