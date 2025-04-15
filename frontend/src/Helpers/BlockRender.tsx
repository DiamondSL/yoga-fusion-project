import {Typography} from "@mui/material";
import Link from "next/link";
import {BlocksContent, BlocksRenderer} from "@strapi/blocks-react-renderer";


const renderBlocks = ({content, className, style}:{content:BlocksContent, className?: string, style?: string | number}) => <BlocksRenderer
    content={content}
    blocks={{
        // You can use the default components to set class names...
        paragraph: ({children}) => <Typography  className={className ?? ""} variant={'body1'}>{children}</Typography>,
        // ...or point to a design system
        heading: ({children, level}) => {
            switch (level) {
                case 1:
                    return <Typography variant="h1" className={className ?? ""}>{children}</Typography>
                case 2:
                    return <Typography variant="h2" className={className ?? ""}>{children}</Typography>
                case 3:
                    return <Typography variant="h3" className={className ?? ""}>{children}</Typography>
                case 4:
                    return <Typography variant="h4" className={className ?? ""}>{children}</Typography>
                case 5:
                    return <Typography variant="h5" className={className ?? ""}>{children}</Typography>
                case 6:
                    return <Typography variant="h6" className={className ?? ""}>{children}</Typography>
                default:
                    return <Typography variant="h1" className={className ?? ""}>{children}</Typography>
            }
        },
        // For links, you may want to use the component from your router or framework
        link: ({children, url}) => <Link href={url}>{children}</Link>,
    }}
    modifiers={{
        bold: ({children}) => <strong className={className ?? ""}>{children}</strong>,
        italic: ({children}) => <span className={className ? `${className} italic` : "italic"} >{children}</span>,
    }}
/>

export default renderBlocks