'use client'
import {Box, Container} from '@mui/material';
import React, {useMemo} from "react";
import {ApolloError, useQuery} from "@apollo/client";
import {content} from "@/types/LandingPageTypes";
import {LandingPageQuery} from "@/GraphQL/TSQueries/LandingPageQueries";
import LandingSectionOne from "@/Components/Landing/Section_One";
import LandingSectionTwo from "@/Components/Landing/Section_Two";
import LandingSectionThree from "@/Components/Landing/Section_Three";
import LandingSectionFour from "@/Components/Landing/Section_Four";
import LandingSectionFive from "@/Components/Landing/Section_Five";
import LandingSectionSix from "@/Components/Landing/Section_Six";
import {useAppContext} from "@/app/ContextWrapper";

const useLandingPageSections = (): {
    data: content;
    loading: boolean;
    error: ApolloError | undefined;
} => {
    const {language} = useAppContext();

    const {data, loading, error} = useQuery(LandingPageQuery, {
        variables: {
            locale: language,
            status: 'PUBLISHED'
        },
        context: {fetchOptions: {cache: 'no-store'}},
    });

    // Define default data
    // Memoize the merged data to prevent unnecessary re-renders
    const sectionsData = useMemo(() => {
        const defaultSections: content = {
            SectionOne: {
                Title: [
                    {Title: 'Be your own fusion.', Placement: 'Left'},
                    {Title: 'Join the community.', Placement: 'Right'},
                    {Title: 'Transform yourself.', Placement: 'Center'},
                ],
                Buttons: [{Text: 'fusion me, now', Variant: 'primary', Action: undefined}],
            },
            SectionTwo: {
                Title: {Title: 'Why us?', Placement: 'Center'},
                List_Description: [
                    {
                        Description: 'безпечний простір в самому центрі Києва: у нас завжди тепло, затишно та є світло',
                        Icon: {url: 'icons/ListIcons/ListIcon_1.svg', height: '60px', width: '60px', alt: 'icon'},
                    },
                    {
                        Description: 'музика в йога ф’южн — це провідник! любимо її та по-особливому ставимось до плейлистів в нашій студії',
                        Icon: {url: 'icons/ListIcons/ListIcon_2.svg', height: '60px', width: '60px', alt: 'icon'},
                    },
                    {
                        Description: 'хелсі-бар: простір для відновлення, роботи та зустрічей! у нас потужна кавова та чайна карта, матча та корисні снеки.',
                        Icon: {url: 'icons/ListIcons/ListIcon_3.svg', height: '60px', width: '60px', alt: 'icon'},
                    },
                    {
                        Description: 'ваш комфортний досвід: роздягальні, душові, чисті рушники. все, аби почувати себе впевнено після практик!',
                        Icon: {url: 'icons/ListIcons/ListIcon_4.svg', height: '60px', width: '60px', alt: 'icon'},
                    },
                    {
                        Description: 'новітній підхід: ми відкриті до нового досвіду та практик. активація кундаліні під супровід глибокого ембієнту? lets go!',
                        Icon: {url: 'icons/ListIcons/ListIcon_5.svg', height: '60px', width: '60px', alt: 'icon'},
                    },
                    {
                        Description: 'ком’юніті: ти, твої подруги та друзі друзів! наш простір збирає в одному флоу тих, хто дбає про баланс тіла, духу та розуму',
                        Icon: {url: 'icons/ListIcons/ListIcon_6.svg', height: '60px', width: '60px', alt: 'icon'},
                    },
                ],
            },
            SectionThree: {
                Title: {
                    title: 'Yoga Fusion',
                    motto: 'твоя трансформація бере початок тут!'
                },
                Button: [{Text: 'більше про нас', Variant: 'secondary'}],
            },
            SectionFour: {
                Title: {Title: 'Our classes', Placement: 'Center'},
                Shape_Titles: [{
                    Title: 'power yoga', Shape: {
                        url: 'icons/shapes/shape_1.svg',
                        width: '',
                        height: ''
                    }
                },
                    {
                        Title: 'hatha yoga', Shape: {
                            url: 'icons/shapes/shape_2.svg',
                            width: '',
                            height: ''
                        }
                    },
                    {
                        Title: 'vinyasa flow', Shape: {
                            url: 'icons/shapes/shape_3.svg',
                            width: '',
                            height: ''
                        }
                    },
                    {
                        Title: 'kundalini', Shape: {
                            url: 'icons/shapes/shape_4.svg',
                            width: '',
                            height: ''
                        }
                    },
                    {
                        Title: 'stretching', Shape: {
                            url: 'icons/shapes/shape_5.svg',
                            width: '',
                            height: ''
                        }
                    }
                ]
            },
            SectionFive: {
                Title: undefined, Button: {
                    Text: 'зареєструватися',
                    Variant: 'primary'
                }
            },
            SectionSix: {
                Title: {Title: 'Healthy bar', Placement: 'Center'},
                Button: {
                    Text: 'детальніше',
                    Variant: 'secondary'
                },
                Gallery: [{
                    url: 'icons/Visuals/SectionFive/photo.png',
                    height: '',
                    width: ''
                }, {url: 'icons/Visuals/SectionFive/photo.png', height: '', width: ''}],
                Description: undefined
            },
            SectionSeven: {
                Title: 'Як нас знайти',
                Placement: [{
                    type: 'paragraph',
                    children: [{type: 'text', text: 'Наш простір розташований біля парку Т.Г. Шевченко'}]
                }],
                Route: [{Title: 'КЛІКНИ, ЩОБ ПРОКЛАСТИ МАРШРУТ', Link: 'https://maps.app.goo.gl/WQ86e8GRbQ6r3nZB7'}]
            },
            SectionEight: {
                Title: {
                    Title: 'FAQ',
                    Placement: 'Center'
                }
            }
        }

        const sections: Array<[string, object | null]> = data?.landingPage && Object?.entries(data?.landingPage)?.filter((data, index) => {
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
    }, [data?.landingPage]);
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
    const {
        SectionOne,
        SectionTwo,
        SectionThree,
        SectionFour,
        SectionFive,
        SectionSix,
        SectionSeven,
        SectionEight
    } = sections.data

    return (
        <Container maxWidth={false}
                   sx={{padding: '0 0 0 0 !important', margin: '0 0 0 0 !important', overflowX: 'hidden'}}
                   className={'LandingPage'}>
            <LandingSectionOne Title={SectionOne?.Title} Buttons={SectionOne?.Buttons}/>
            <Box id={'sections-gradient-container'}>
                <LandingSectionTwo Title={SectionTwo?.Title} List_Description={SectionTwo?.List_Description}/>
                <LandingSectionThree Title={SectionThree?.Title} Button={SectionThree?.Button}
                                     Description={SectionThree?.Description} Photos={SectionThree?.Photos}/>
                <LandingSectionFour Title={SectionFour?.Title} Shape_Titles={SectionFour?.Shape_Titles}
                                    Button={SectionFive?.Button} titleSecond={SectionFive?.Title}/>
            </Box>
            <LandingSectionFive Title={SectionSix?.Title} Button={SectionSix?.Button} Gallery={SectionSix?.Gallery}
                                Route={SectionSeven?.Route} TitleSecondPlacement={SectionSeven?.Placement}
                                Description={SectionSix?.Description}
                                TitleSecond={SectionSeven?.Title}/>
            <LandingSectionSix Title={SectionEight?.Title} FAQ_elements={SectionEight?.FAQ_elements}/>
        </Container>
    );
}

export default Home;
