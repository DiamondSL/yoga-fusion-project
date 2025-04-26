import {Box, SxProps, Theme} from '@mui/material'

export const generateStrapiUrl = (url:string) => process?.env?.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_URL}/cms${url}` : `http://localhost:1337${url}`

export const StrapiIcon = ({url, width, height, alternativeText, className, id, sx}: {
    url: string,
    width?: number,
    height?: number,
    alternativeText?: string
    id?: string
    className?: string
    sx?: SxProps<Theme>
}) => {
    const src = generateStrapiUrl(url)
    return (
        <Box component={'img'}
             className={className || ''}
             alt={alternativeText}
             id={id}
             sx={{width: `${width}px`, height: `${height}px`, ...sx}}
             src={src}
        />
    )
}