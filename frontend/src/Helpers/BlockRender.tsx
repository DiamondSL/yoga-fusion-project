import { Typography, Box, ListItem } from "@mui/material";
import Link from "next/link";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import React from "react";

// Regular expression to match the color syntax: (#<hex> <text>)
const COLOR_REGEX = /\(#([0-9A-Fa-f]{6})\s+([^)]+)\)/g;

const renderBlocks = ({
                          content,
                          className,
                          style,
                      }: {
    content: BlocksContent;
    className?: string;
    style?: React.CSSProperties | null | undefined;
}) => {
    // Debug: Log the input content to verify structure
    console.log("Input Content:", JSON.stringify(content, null, 2));

    return (
        <BlocksRenderer
            content={content}
            blocks={{
                paragraph: ({ children }) => {
                    // Process children to handle color syntax
                    const processedChildren = React.Children.map(children, (child) => {
                        if (typeof child === "string") {
                            const matches = [...child.matchAll(COLOR_REGEX)];
                            if (matches.length === 0) return child;

                            let lastIndex = 0;
                            const elements: React.ReactNode[] = [];

                            for (const match of matches) {
                                const [fullMatch, hexColor, coloredText] = match;
                                const startIndex = match.index!;

                                // Add text before the match
                                if (startIndex > lastIndex) {
                                    elements.push(child.slice(lastIndex, startIndex));
                                }

                                // Validate hex color
                                const isValidHex = /^[0-9A-Fa-f]{6}$/.test(hexColor);
                                if (isValidHex) {
                                    elements.push(
                                        <span key={startIndex} style={{ color: `#${hexColor}` }}>
                      {coloredText}
                    </span>
                                    );
                                } else {
                                    // Treat invalid color as plain text
                                    elements.push(fullMatch);
                                }

                                lastIndex = startIndex + fullMatch.length;
                            }

                            // Add remaining text
                            if (lastIndex < child.length) {
                                elements.push(child.slice(lastIndex));
                            }

                            return elements;
                        }
                        // Return non-string children (e.g., bold, italic) unchanged
                        return child;
                    });

                    return (
                        <Typography
                            style={{ ...style }}
                            className={className ?? ""}
                            variant={"body1"}
                        >
                            {processedChildren}
                        </Typography>
                    );
                },
                heading: ({ children, level }) => {
                    // Process children to handle color syntax
                    const processedChildren = React.Children.map(children, (child) => {
                        if (typeof child === "string") {
                            const matches = [...child.matchAll(COLOR_REGEX)];
                            if (matches.length === 0) return child;

                            let lastIndex = 0;
                            const elements: React.ReactNode[] = [];

                            for (const match of matches) {
                                const [fullMatch, hexColor, coloredText] = match;
                                const startIndex = match.index!;

                                // Add text before the match
                                if (startIndex > lastIndex) {
                                    elements.push(child.slice(lastIndex, startIndex));
                                }

                                // Validate hex color
                                const isValidHex = /^[0-9A-Fa-f]{6}$/.test(hexColor);
                                if (isValidHex) {
                                    elements.push(
                                        <span key={startIndex} style={{ color: `#${hexColor}` }}>
                      {coloredText}
                    </span>
                                    );
                                } else {
                                    // Treat invalid color as plain text
                                    elements.push(fullMatch);
                                }

                                lastIndex = startIndex + fullMatch.length;
                            }

                            // Add remaining text
                            if (lastIndex < child.length) {
                                elements.push(child.slice(lastIndex));
                            }

                            return elements;
                        }
                        return child;
                    });

                    switch (level) {
                        case 1:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h1"
                                    className={className ?? ""}
                                >
                                    {processedChildren}
                                </Typography>
                            );
                        case 2:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h2"
                                    className={className ?? ""}
                                >
                                    {processedChildren}
                                </Typography>
                            );
                        case 3:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h3"
                                    className={className ?? ""}
                                >
                                    {processedChildren}
                                </Typography>
                            );
                        case 4:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h4"
                                    className={className ?? ""}
                                >
                                    {processedChildren}
                                </Typography>
                            );
                        case 5:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h5"
                                    className={className ?? ""}
                                >
                                    {processedChildren}
                                </Typography>
                            );
                        case 6:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h6"
                                    className={className ?? ""}
                                >
                                    {processedChildren}
                                </Typography>
                            );
                        default:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h1"
                                    className={className ?? ""}
                                >
                                    {processedChildren}
                                </Typography>
                            );
                    }
                },
                image: ({ image }) => (
                    <Box
                        className={className}
                        alt={image.alternativeText ?? "no alternative text"}
                        component={"img"}
                        src={image.url}
                    />
                ),
                link: ({ children, url }) => <Link href={url}>{children}</Link>,
                list: ({ children, format }) =>
                    format === "ordered" ? (
                        <ol className={className}>{children}</ol>
                    ) : (
                        <ul className={className}>{children}</ul>
                    ),
                "list-item": ({ children }) => (
                    <ListItem className={className} sx={style}>
                        {children}
                    </ListItem>
                ),
            }}
            modifiers={{
                bold: ({ children }) => (
                    <Typography
                        variant={"body1"}
                        component={"strong"}
                        sx={{ fontWeight: 700, ...style }}
                        className={className ?? ""}
                    >
                        {children}
                    </Typography>
                ),
                italic: ({ children }) => (
                    <Typography
                        variant={"body1"}
                        component={"i"}
                        style={{ fontStyle: "italic", ...style }}
                        className={className ? `${className} italic` : "italic"}
                    >
                        {children}
                    </Typography>
                ),
                strikethrough: ({ children }) => (
                    <Typography
                        variant={"body1"}
                        component={"s"}
                        style={{ ...style }}
                        className={className}
                    >
                        {children}
                    </Typography>
                ),
                underline: ({ children }) => (
                    <Typography
                        variant={"body1"}
                        component={"u"}
                        style={{ ...style }}
                        className={className}
                    >
                        {children}
                    </Typography>
                ),
                code: ({ children }) => (
                    <Typography
                        variant={"body1"}
                        component={"code"}
                        style={{ ...style }}
                        className={className}
                    >
                        {children}
                    </Typography>
                ),
            }}
        />
    );
};

export default renderBlocks;