'use client';
import { useQuery } from "@apollo/client";
import {
    Accordion, AccordionDetails,
    AccordionSummary, alpha,
    Box,
    Button,
    CardContent,
    Typography,
    styled,
} from "@mui/material";
import { CardElement } from "@/Components/Card/Card";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { abonementsQuery } from "@/GraphQL/TSQueries/AbonementsQueries";
import { abonementEntity } from "@/app/abonements/page";
import { generateStrapiUrl } from "@/Components/Visual/StrapiIcons/StrapiIcon";
import {useAppContext} from "@/app/ContextWrapper";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import renderBlocks from "@/Helpers/BlockRender";
import LoaderElement from "@/Components/Loader";

// Styled Picker Container
const PickerContainer = styled(Box)(({}) => ({
    display: 'flex',
    maxWidth: '245px',
    width: '100%',
    height: '48px',
    borderRadius: '23.5px',
    backgroundColor: '#282218',
    border: '1px solid #282218',
    overflow: 'hidden',
    position: 'relative',
}));

// Styled Picker Button
const PickerButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ isActive }) => ({
    flex: 1,
    height: '100%',
    borderRadius: isActive ? '23.5px' : 0,
    backgroundColor: isActive ? '#E2D9B5' : 'transparent',
    color: isActive ? '#282218' : 'white',
    fontWeight: 700,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: isActive ? '#E2D9B5' : alpha('#FFFFFF', 0.1),
    },
    zIndex: isActive ? 2 : 1,
    transition: 'all 0.3s ease',
}));

interface PickerElementProps {
    onChange: (value: "Memberships" | "Events" | undefined) => void;
    value: "Memberships" | "Events" | undefined;
}

const PickerElement = ({ onChange, value }: PickerElementProps) => {
    return (
        <PickerContainer>
            <PickerButton
                className={'picker_button'}
                isActive={value === 'Memberships'}
                onClick={() => onChange('Memberships')}
            >
                Memberships
            </PickerButton>
            <PickerButton
                className={'picker_button'}
                isActive={value === 'Events'}
                onClick={() => onChange('Events')}
            >
                Events
            </PickerButton>
        </PickerContainer>
    );
};

const AbonementsList = () => {
    const { data, loading } = useQuery(abonementsQuery);
    const { language } = useAppContext();
    const router = useRouter();
    const [expandIndex, setExpandIndex] = React.useState<string | false>(false);
    const [filter, setFilter] = React.useState<"Memberships" | "Events" | undefined>(undefined);


    // Memoized filtered abonements
    const filteredAbonements = useMemo(() => {
        if (!data?.abonements) return [];
        if (!filter) return data.abonements;
        return data.abonements.filter((item: abonementEntity) => item.Type === filter);
    }, [filter, data?.abonements]);

    const handleFilterChange = (value: "Memberships" | "Events" | undefined) => {
        setFilter(value);
    };

    // Render Abonements List
    const AbonementsMap = () => (
        <Box className={'abonements-list'}>
            {filteredAbonements?.map((item: abonementEntity, index: number) => {
                const Title = item?.Name?.Title && item?.Name?.Title !== " " && item?.Name?.Title !== ""
                    ? item?.Name?.Title
                    : (item?.Trainings_amount && item?.Trainings_amount > 0 && item?.Trainings_amount < 5)
                        ? +item?.Trainings_amount + (language?.includes('uk') ? ' заняття' : ' classes')
                        : item?.Trainings_amount + (language?.includes('uk') ? ' занять' : ' classes');

                return (
                    <CardElement
                        className={'abonement-card'}
                        key={item?.documentId}
                        sx={{
                            backgroundColor: 'primary.main',
                            border: '1px solid',
                            borderColor: 'primary.dark',
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '300px',
                            width: '100%',
                            position: 'relative',
                        }}
                        backdrop={false}
                    >
                        <CardContent className={'content'} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box className={'card-header'}>
                                {item?.Name?.Shape?.url && (
                                    <Box
                                        sx={{ maxWidth: '250px', width: '100%', height: 'auto' }}
                                        component={'img'}
                                        src={generateStrapiUrl(item?.Name?.Shape?.url)}
                                    />
                                )}
                                <Typography
                                    className={'typography-item'}
                                    variant={item?.Name?.Shape?.url !== undefined ? 'h3' : 'bodyL'}
                                    fontSize={item?.Name?.Shape?.url !== undefined ? '32px' : '20px'}
                                    fontWeight={'bold'}
                                >
                                    {Title}
                                </Typography>
                            </Box>
                            <Box className={'price'}>
                                {item?.Price?.Shape?.url && (
                                    <Box
                                        sx={{ maxWidth: '250px', width: '100%', height: 'auto' }}
                                        component={'img'}
                                        src={generateStrapiUrl(item?.Price?.Shape?.url)}
                                    />
                                )}
                                <Typography
                                    className={'typography-item'}
                                    variant={item?.Price?.Shape?.url !== undefined ? 'h3' : 'bodyL'}
                                    fontSize={item?.Price?.Shape?.url !== undefined ? '32px' : '20px'}
                                >
                                    {item?.Price?.Amount} uah
                                </Typography>
                            </Box>
                            <Box className={'actions'}>
                                <Button
                                    variant={'contained'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        return router.push(`abonements/${item?.documentId}`);
                                    }}
                                >
                                    {language?.includes('uk') ? 'купити' : 'purchase'}
                                </Button>
                            </Box>
                            <Box
                                className={'details'}
                                sx={{ marginTop: 'auto', visibility: !item?.Description ? 'hidden' : 'visible' }}
                            >
                                <Accordion
                                    expanded={expandIndex === `${index + 1}`}
                                    sx={{
                                        pointerEvents: !item.Description ? 'none' : 'initial',
                                        cursor: !item.Description ? 'not-allowed' : 'initial',
                                    }}
                                    slotProps={{ heading: { component: 'div' } }}
                                    id={`card-description_${index + 1}`}
                                >
                                    <AccordionSummary
                                        sx={{ backgroundColor: alpha('#FFFFFF', 0.2) }}
                                        onClick={() =>
                                            expandIndex === `${index + 1}`
                                                ? setExpandIndex(false)
                                                : setExpandIndex(`${index + 1}`)
                                        }
                                        expandIcon={
                                            expandIndex === `${index + 1}` ? (
                                                <RemoveOutlined
                                                    height={28}
                                                    width={28}
                                                    sx={{ color: 'primary.dark', width: '28px', height: '28px' }}
                                                />
                                            ) : (
                                                <AddOutlined
                                                    height={28}
                                                    width={28}
                                                    sx={{ color: 'primary.dark', width: '28px', height: '28px' }}
                                                />
                                            )
                                        }
                                        aria-controls={`panel${index + 1}-content`}
                                        id={`description_header${index + 1}`}
                                    >
                                        <Typography fontWeight={700}>more info</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {!item.Description && 'no content'}
                                        {item?.Description &&
                                            renderBlocks({
                                                content: item?.Description,
                                                className: 'Details-content',
                                            })}
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </CardContent>
                    </CardElement>
                );
            })}
        </Box>
    );

    return !loading ? (
        <>
            <Box className={'picker'} sx={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                <PickerElement onChange={handleFilterChange} value={filter} />
            </Box>
            <Box className={'title'} component={'header'}>
                <Typography variant={'h1'}>
                    {language === 'uk-UA' ? "Абонементи" : "Abonements"}
                </Typography>
            </Box>
            <AbonementsMap />
            <Box className={'title'}>
                <Typography variant={'h1'}>
                    {language === 'uk-UA' ? "Події" : "Events"}
                </Typography>
            </Box>
        </>
    ) : (
        <LoaderElement />
    );
};

export default AbonementsList;