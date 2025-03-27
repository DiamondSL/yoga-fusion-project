import {ButtonPropsVariantOverrides} from "@mui/material";

type SectionOneButton = {
    Text?: string
    Variant?: 'primary' | ButtonPropsVariantOverrides | undefined
    Action?: Function | string | undefined
}

interface TitleItem {
    Title: string;
    Placement: 'Left' | 'Right' | 'Center';
}

interface ButtonItem {
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
    Description?: string;
    Icon?: {
        url?: string;
        alt?: string;
        height?: string;
        width?: string;
    }
}

export interface LandingSectionTwoContent {
    Title?: {
        Title?: string;
        Placement?: 'Left' | 'Right' | 'Center';
    }
    ListDescription?: ListDescriptionItem[]
}

interface SectionThreeTitle {
    body: string;
    title: string;
}

export interface LandingSectionThreeContent {
    Title: SectionThreeTitle;
    Description: string;
    Button: ButtonItem;
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
    Title: TitleItem[];
    Shape_Titles: ShapeTitle[];
}

export interface LandingSectionFiveContent {
    Title: string;
    Button: ButtonItem;
}

interface GalleryItem {
    width: string;
    height: string;
    url: string;
}

export interface LandingSectionSixContent {
    Button: ButtonItem;
    Title: TitleItem[];
    Description: string;
    Gallery: GalleryItem[];
}

interface RouteItem {
    Title: string;
    Link: string;
}

export interface LandingSectionSevenContent {
    Title: string;
    Placement: 'Left' | 'Right' | 'Center';
    Route: RouteItem[];
}

interface FAQElement {
    Title: string;
    Description: string;
}

export interface LandingSectionEightContent {
    Title: TitleItem[];
    FAQ_elements: FAQElement[];
}

export interface DataContent {
    SectionOne: LandingSectionOneContent | null,
    SectionTwo: LandingSectionTwoContent | null,
    SectionThree: LandingSectionThreeContent | null,
    SectionFour: LandingSectionFourContent | null,
    SectionFive: LandingSectionFiveContent | null,
    SectionSix: LandingSectionSixContent | null,
    SectionSeven: LandingSectionSevenContent | null,
    SectionEight: LandingSectionEightContent | null,
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