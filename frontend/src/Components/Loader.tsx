import {Box, CircularProgress, SxProps, Theme} from "@mui/material"
import React from "react";




interface LoaderElementProps {
    size?: string | number;
    sx?: SxProps<Theme>;
    className?: string;
}


const LoaderElement = ({sx, size, className}:LoaderElementProps) => {

    return (
        <Box className={'loader'}>
            <CircularProgress
                size={size ?? '150px'}
                className={className ? className+' loader' : 'loader'}
                sx={{ justifySelf: 'center', alignSelf: 'center', color: 'primary.dark', ...sx }}
            />
        </Box>
    )
}


export default LoaderElement;