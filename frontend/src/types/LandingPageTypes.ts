import {ButtonPropsVariantOverrides} from "@mui/material";
import { BlocksContent } from "@strapi/blocks-react-renderer";

type SectionOneButton = {
    Text?: string
    Variant?: 'primary' | ButtonPropsVariantOverrides | undefined
    Action?: string | undefined
}

interface TitleItem {
    Title: string;
    Placement: 'Left' | 'Right' | 'Center';
}

export interface ButtonItem {
    Text: string;
    Variant: 'primary' | 'secondary'; // Add more variants as needed
}


export interface LandingSectionOneContent {
    Title?: {
        Title?: string;
        Placement?: 'Left' | 'Right' | 'Center';
    }[]
    Buttons?: SectionOneButton[]
}

export type ListDescriptionItem = {
    Description?: string | BlocksContent;
    Icon?: {
        url?: string;
        alt?: string;
        height?: string;
        width?: string;
    }
    className?: string
}

export interface LandingSectionTwoContent {
    Title?: {
        Title?: string;
        Placement?: 'Left' | 'Right' | 'Center';
    }
    List_Description?: ListDescriptionItem[]
}

interface SectionThreeTitle {
    title: string;
    motto: string;
}

export interface LandingSectionThreeContent {
    Title?: SectionThreeTitle;
    Description?: BlocksContent;
    Button?: ButtonItem[];
    Photos?: {
        url: string
    }[]
}

interface Shape {
    url: string;
    height: string;
    width: string;
}

interface ShapeTitle {
    Title: string;
    Shape: Shape;
}

export interface LandingSectionFourContent {
    Title?: TitleItem;
    Shape_Titles?: ShapeTitle[];
}

export interface LandingSectionFiveContent {
    Title?: BlocksContent
    Button: ButtonItem;
}

interface GalleryItem {
    width: string;
    height: string;
    url: string;
}

export interface LandingSectionSixContent {
    Button?: ButtonItem;
    Title?: TitleItem;
    Description?: BlocksContent;
    Gallery?: GalleryItem[];
}

export interface RouteItem {
    Title: string;
    Link: string;
}

export interface LandingSectionSevenContent {
    Title: string;
    Placement: BlocksContent;
    Route: RouteItem[];
}

interface FAQDetail {
    Title?: string;
    Description?: BlocksContent;
}

export interface LandingSectionEightContent {
    Title?: TitleItem;
    FAQ_elements?: FAQDetail[];
}

export interface content {
    SectionOne: LandingSectionOneContent | null,
    SectionTwo: LandingSectionTwoContent | null,
    SectionThree: LandingSectionThreeContent | null,
    SectionFour: LandingSectionFourContent | null,
    SectionFive: LandingSectionFiveContent | null,
    SectionSix: LandingSectionSixContent | null,
    SectionSeven: LandingSectionSevenContent | null,
    SectionEight: LandingSectionEightContent | null,
}