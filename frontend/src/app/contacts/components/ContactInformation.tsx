'use client'
import {Box} from "@mui/material"
import {ContactsPageQuery} from "@/GraphQL/TSQueries/ContactsPageQueries";
import {useQuery} from "@apollo/client";
import React from "react";
import LoaderElement from "@/Components/Loader";
import GoogleMapsComponent from "@/Components/Maps/GoogleMapsComponent";
import renderBlocks from "@/Helpers/BlockRender";
import {socialsQuery} from "@/GraphQL/TSQueries/GlobalQueries";
import {Social} from "@/app/ContextWrapper";
import {StrapiIcon} from "@/Components/Visual/StrapiIcons/StrapiIcon";
import {useRouter} from "next/navigation";
import RedArrow, {RedArrowCurved} from "@/Components/Visual/SVGIcons/Arrow";


const ContactInformationSection = () => {
    const contactPage = useQuery(ContactsPageQuery)
    const socials = useQuery(socialsQuery)
    const {data, loading, error} = contactPage
    const {data: socialsData, loading: socialsLoading} = socials
    const router = useRouter()


    return (
        <Box className={'contact-information'} sx={{marginTop: '72px', marginBottom: '78px'}}>
            {!error && loading ? (
                <LoaderElement/>
            ) : (
                <>
                    <Box className={'content'}>
                        <Box className={'header'}>
                            {data?.contactsPage?.Title && data?.contactsPage?.Title.length > 0 && (renderBlocks({
                                content: data?.contactsPage?.Title,
                                className: 'contact-header'
                            }))}
                        </Box>
                        <Box className={'description'}>
                            {data?.contactsPage?.Description && data?.contactsPage?.Description.length > 0 && (renderBlocks({
                                content: data?.contactsPage?.Description,
                                className: 'contact-description'
                            }))}
                        </Box>
                        <Box className={'links'}>
                            <Box className={'socials'}>
                            {!socialsLoading && socialsData?.global?.Socials && socialsData?.global?.Socials.map((item: Social) => {
                                return <StrapiIcon key={`contact-us-${item?.Icon?.url}`} sx={{
                                    maxWidth: item?.Icon?.width,
                                    maxHeight: item?.Icon?.height,
                                    width: '100%',
                                    height: '100%',
                                    cursor: 'pointer'
                                }} url={item?.Icon?.url as string} onClick={() => router?.push(item.url)}/>
                            })}
                            </Box>
                            <Box className={'arrows'}>
                                <RedArrow className={'contact-arrow'}  />
                                <RedArrowCurved width={68} height={68} className={'contact-arrow'} />
                            </Box>
                        </Box>
                    </Box>
                    <GoogleMapsComponent mapContainerStyle={{marginTop: '30px', height: '100%', width: '100%'}}
                                         mapLink={data?.contactsPage?.Maps?.[0]?.url}/>
                </>
            )}
        </Box>
    )
}

export default ContactInformationSection;