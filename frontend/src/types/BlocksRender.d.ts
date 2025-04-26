import * as React from 'react';

type Modifier = 'bold' | 'italic' | 'strikethrough' | 'underline' | 'code';

interface TextInlineNode {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}

interface LinkInlineNode {
    type: 'link';
    url: string;
    children: TextInlineNode[];
}

interface ColoredNode {
    type: 'span';
    color?: string;
    children: DefaultInlineNode[];
}

interface ListItemInlineNode {
    type: 'list-item';
    children: DefaultInlineNode[];
}

type DefaultInlineNode = TextInlineNode | LinkInlineNode | ColoredNode;

type NonTextInlineNode = LinkInlineNode | ListItemInlineNode | ColoredNode;

interface ParagraphBlockNode {
    type: 'paragraph';
    children: DefaultInlineNode[];
}

interface QuoteBlockNode {
    type: 'quote';
    children: DefaultInlineNode[];
}

interface CodeBlockNode {
    type: 'code';
    children: DefaultInlineNode[];
}

interface HeadingBlockNode {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: DefaultInlineNode[];
}

interface ListBlockNode {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: (ListItemInlineNode | ListBlockNode)[];
}

interface ImageBlockNode {
    type: 'image';
    image: {
        name: string;
        alternativeText?: string | null;
        url: string;
        caption?: string | null;
        width: number;
        height: number;
        formats?: Record<string, unknown>;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        previewUrl?: string | null;
        provider: string;
        provider_metadata?: unknown | null;
        createdAt: string;
        updatedAt: string;
    };
    children: [{ type: 'text'; text: '' }];
}

export type RootNode =
    | ParagraphBlockNode
    | QuoteBlockNode
    | CodeBlockNode
    | HeadingBlockNode
    | ListBlockNode
    | ImageBlockNode;

export type Node = RootNode | NonTextInlineNode;

type GetPropsFromNode<T> = Omit<T, 'type' | 'children' | 'color'> & {
    children?: React.ReactNode;
    color?: string;
    plainText?: T extends { type: 'code' } ? string : never;
};

export type BlocksComponents = {
    [K in Node['type']]: React.ComponentType<GetPropsFromNode<Extract<Node, { type: K }>>>
};

export type ModifiersComponents = {
    [K in Modifier]: React.ComponentType<{ children: React.ReactNode }>;
};

export interface ComponentsContextValue {
    blocks: BlocksComponents;
    modifiers: ModifiersComponents;
    missingBlockTypes: string[];
    missingModifierTypes: string[];
}

export interface ComponentsProviderProps {
    children: React.ReactNode;
    value?: ComponentsContextValue;
}

export declare const ComponentsProvider: ({ children, value }: ComponentsProviderProps) => React.JSX.Element;

export declare function useComponentsContext(): ComponentsContextValue;

export interface BlocksRendererProps {
    content: RootNode[];
    blocks?: Partial<BlocksComponents>;
    modifiers?: Partial<ModifiersComponents>;
}

export declare const BlocksRenderer: (props: BlocksRendererProps) => React.JSX.Element;

export type { DefaultInlineNode, BlocksContent };
export { ComponentsProvider, useComponentsContext, BlocksRenderer };