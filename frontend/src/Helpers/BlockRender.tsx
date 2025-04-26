import { Typography, Box, ListItem } from "@mui/material";
import Link from "next/link";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import React from "react";
import { RootNode, DefaultInlineNode } from '@/types/BlocksRender'; // Import types from BlocksRenderer.d.ts

// Regular expression to match the color syntax: (#<hex> <text>)
const COLOR_REGEX = /\(#([0-9A-Fa-f]{6})\s+([^)]+)\)/g;

// Function to preprocess BlocksContent and transform color syntax into span nodes
const processBlocksContent = (content: BlocksContent): BlocksContent => {
    return content.map((block: RootNode) => {
        if (block.type === "paragraph" || block.type === "heading") {
            const processedChildren = block.children.reduce<DefaultInlineNode[]>(
                (acc, child: DefaultInlineNode) => {
                    if (child.type === "text" && child.text) {
                        const matches = [...child.text.matchAll(COLOR_REGEX)];
                        if (matches.length === 0) return [...acc, child];

                        let lastIndex = 0;
                        const newChildren: DefaultInlineNode[] = [];

                        for (const match of matches) {
                            const [fullMatch, hexColor, coloredText] = match;
                            const startIndex = match.index!;

                            // Add text before the match
                            if (startIndex > lastIndex) {
                                newChildren.push({
                                    type: "text",
                                    text: child.text.slice(lastIndex, startIndex),
                                });
                            }

                            // Validate hex color
                            const isValidHex = /^[0-9A-Fa-f]{6}$/.test(hexColor);
                            if (isValidHex) {
                                newChildren.push({
                                    type: "span",
                                    color: hexColor,
                                    children: [{ type: "text", text: coloredText }],
                                });
                            } else {
                                // Treat invalid color as plain text
                                newChildren.push({
                                    type: "text",
                                    text: fullMatch,
                                });
                            }

                            lastIndex = startIndex + fullMatch.length;
                        }

                        // Add remaining text
                        if (lastIndex < child.text.length) {
                            newChildren.push({
                                type: "text",
                                text: child.text.slice(lastIndex),
                            });
                        }

                        return [...acc, ...newChildren];
                    }
                    return [...acc, child];
                },
                []
            );

            return {
                ...block,
                children: processedChildren,
            };
        }
        return block;
    });
};

const renderBlocks = ({
                          content,
                          className,
                          style,
                      }: {
    content: BlocksContent;
    className?: string;
    style?: React.CSSProperties | null | undefined;
}) => {
    // Preprocess the content to handle color syntax
    const processedContent = processBlocksContent(content);

    // Debug: Log the processed content to verify structure
    console.log("Processed Content:", JSON.stringify(processedContent, null, 2));

    return (
        <BlocksRenderer
            content={processedContent}
            blocks={{
                paragraph: ({ children }) => (
                    <Typography
                        style={{ ...style }}
                        className={className ?? ""}
                        variant={"body1"}
                    >
                        {children}
                    </Typography>
                ),
                heading: ({ children, level }) => {
                    switch (level) {
                        case 1:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h1"
                                    className={className ?? ""}
                                >
                                    {children}
                                </Typography>
                            );
                        case 2:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h2"
                                    className={className ?? ""}
                                >
                                    {children}
                                </Typography>
                            );
                        case 3:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h3"
                                    className={className ?? ""}
                                >
                                    {children}
                                </Typography>
                            );
                        case 4:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h4"
                                    className={className ?? ""}
                                >
                                    {children}
                                </Typography>
                            );
                        case 5:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h5"
                                    className={className ?? ""}
                                >
                                    {children}
                                </Typography>
                            );
                        case 6:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h6"
                                    className={className ?? ""}
                                >
                                    {children}
                                </Typography>
                            );
                        default:
                            return (
                                <Typography
                                    style={{ ...style }}
                                    variant="h1"
                                    className={className ?? ""}
                                >
                                    {children}
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
                span: ({ children, color }) => {
                    // Debug: Log the span node
                    console.log("Span Block:", { children, color });
                    return (
                        <span style={{ color: color ? `#${color}` : "inherit" }}>
              {children}
            </span>
                    );
                },
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