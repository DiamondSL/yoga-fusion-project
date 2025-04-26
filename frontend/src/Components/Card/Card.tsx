import {Box, Card, CardContent, SxProps, Typography, Theme, CardMedia, alpha, useTheme} from "@mui/material";
import React from "react";
import './card.css'
import {generateStrapiUrl} from "@/Components/Visual/StrapiIcons/StrapiIcon";


interface CardElement {
    children?: React.ReactNode;
    image?: {
        src: string;
        background?: boolean
        width?: number | string;
        height?: number | string;
    }
    title?: string | React.ReactNode;
    className?: string;
    id?: string;
    sx?: SxProps<Theme>;
    onClick?: () => void;
    backdrop?: boolean;
}

export const CardElement = ({sx, children, image, id, title, className, onClick, backdrop}: CardElement) => {
    const imageSrc = image?.src && generateStrapiUrl(image.src)
    const theme = useTheme()
    return (
        <Card elevation={backdrop === false ? 0 : 1} onClick={onClick} id={id && id.length > 0 ? id : undefined}
              className={className && className.length > 0 ? `card-element ${className}` : `card-element`}
              sx={sx ? {...sx} : {display: 'flex', alignItems: 'center', position: "relative"}}>
            {image?.background ? (<CardMedia image={imageSrc} sx={{height: '100%', position: 'absolute', width: '100%'}}/>) : (<CardMedia src={imageSrc}/>)}
            {children}
            {title &&
                <CardContent sx={{position: 'relative', zIndex: 2, background: alpha(`${theme.palette.secondary.dark}`, 0.6), marginTop: 'auto', marginBottom: 0}} className={'title-container'}>
                    {typeof title === 'string' ? (
                        <Box className={'card-header'}>
                        <Typography variant="h6" color={'primary.main'} fontWeight={700} lineHeight={'216%'} className={'title-element'}>
                            {title}
                        </Typography>
                        </Box>) : title
                    }
                </CardContent>
            }
        </Card>
    )
}