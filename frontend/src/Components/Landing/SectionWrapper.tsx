'use client'
import {Box, Theme} from "@mui/system";
import React from "react";
import {SxProps} from "@mui/material";


type SectionWrapper = {
    children: React.ReactNode;
    id?: string;
    sx?: SxProps<Theme> ;
    className?: string;
}


const SectionWrapper = ({children, id, sx, className}:SectionWrapper) => {
    return (
        <Box component={"section"} className={className ?? undefined} id={id ?? undefined} sx={{maxWidth: '100vw', width: '100%', margin: '0 0 0 0', padding: '0 0 0 0', ...sx}}>
            {children}
        </Box>
    )
}

export default SectionWrapper