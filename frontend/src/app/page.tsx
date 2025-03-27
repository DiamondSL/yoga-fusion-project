'use client'
import {Container} from '@mui/material';
import LandingSectionOne from "@/Components/Landing/Section_One";
import React, {useMemo} from "react";
import LandingSectionTwo from "@/Components/Landing/Section_Two";
import {ApolloError, useQuery} from "@apollo/client";
import {content} from "@/types/LandingPageTypes";
import {LandingPageQuery} from "@/GraphQL/TSQueries/LandingPageQueries";


const useLandingPageSections = (): {
    data: content;
    loading: boolean;
    error: ApolloError | undefined;
} => {
    const { data, loading, error } = useQuery(LandingPageQuery);

    // Define default data
    const defaultSections: content = {
        SectionOne: {
            Title: [
                { Title: 'Be your own fusion.', Placement: 'Left' },
                { Title: 'Join the community.', Placement: 'Right' },
                { Title: 'Transform yourself.', Placement: 'Center' },
            ],
            Buttons: [{ Text: 'fusion me, now', Variant: 'primary', Action: undefined }],
        },
        SectionTwo: {
            Title: { Title: 'Why us?', Placement: 'Center' },
            ListDescription: [
                {
                    Description: 'Placeholder',
                    Icon: { url: '/', height: '60px', width: '60px', alt: 'icon' },
                },
            ],
        },
        SectionThree: null,
        SectionFour: null,
        SectionFive: null,
        SectionSix: null,
        SectionSeven: null,
        SectionEight: null,
    };

    // Memoize the merged data to prevent unnecessary re-renders
    const sectionsData = useMemo(() => {
        const sections:Array<[string, object | null]> = data?.landingPage && Object.entries(data?.landingPage)?.filter((data, index) => {
            return data !== null && index !== 0;
        }).map((data) => {
            return [data[0].replace(/_/g, ""), data[1]];
        })

        if (!data?.landingPage) return defaultSections;

        return {
            ...defaultSections,
            ...Object.fromEntries(
                sections
            ),
        };
    }, [defaultSections, data?.landingPage]);

    if (error) {
        console.error('Error fetching landing page data:', error);
    }

    return {
        data: sectionsData,
        loading,
        error,
    };
};


const Home = () => {
    const sections = useLandingPageSections();
    const {SectionOne, SectionTwo, SectionThree, SectionFour, SectionFive, SectionSix, SectionSeven, SectionEight} = sections.data

    return (
        <Container maxWidth={false} sx={{padding: '0 0 0 0 !important', margin: '0 0 0 0 !important'}}
                   className={'LandingPage'}>
            <LandingSectionOne Title={SectionOne?.Title} Buttons={SectionOne?.Buttons}/>
            <LandingSectionTwo Title={SectionTwo?.Title} ListDescription={SectionTwo?.ListDescription}/>
        </Container>
    );
}

export default Home;
