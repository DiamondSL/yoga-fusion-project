import {Typography} from "@mui/material";
import Link from "next/link";
import {BlocksContent, BlocksRenderer} from "@strapi/blocks-react-renderer";
import React from "react";


const renderBlocks = ({content, className, style}:{content:BlocksContent, className?: string, style?: React.CSSProperties | null | undefined}) => <BlocksRenderer
    content={content}
    blocks={{
        // You can use the default components to set class names...
        paragraph: ({children}) => <Typography style={{...style}} className={className ?? ""} variant={'body1'}>{children}</Typography>,
        // ...or point to a design system
        heading: ({children, level}) => {
            switch (level) {
                case 1:
                    return <Typography style={{...style}} variant="h1" className={className ?? ""}>{children}</Typography>
                case 2:
                    return <Typography style={{...style}} variant="h2" className={className ?? ""}>{children}</Typography>
                case 3:
                    return <Typography variant="h3" style={{...style}} className={className ?? ""}>{children}</Typography>
                case 4:
                    return <Typography variant="h4"  style={{...style}} className={className ?? ""}>{children}</Typography>
                case 5:
                    return <Typography variant="h5"  style={{...style}} className={className ?? ""}>{children}</Typography>
                case 6:
                    return <Typography variant="h6"  style={{...style}} className={className ?? ""}>{children}</Typography>
                default:
                    return <Typography variant="h1"  style={{...style}} className={className ?? ""}>{children}</Typography>
            }
        },
        // For links, you may want to use the component from your router or framework
        link: ({children, url}) => <Link href={url}>{children}</Link>,
    }}
    modifiers={{
        bold: ({children}) => <strong style={{...style}} className={className ?? ""}>{children}</strong>,
        italic: ({children}) => <span style={{...style}} className={className ? `${className} italic` : "italic"} >{children}</span>,
    }}
/>

export default renderBlocks