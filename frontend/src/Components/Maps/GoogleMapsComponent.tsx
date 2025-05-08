'use client';

import React, {memo, useEffect, useRef, useState} from 'react';
import {GoogleMap, useLoadScript} from '@react-google-maps/api';
import {Box, SxProps, Theme, Typography} from '@mui/material';
import LoaderElement from '@/Components/Loader';
import {Library} from '@googlemaps/js-api-loader';

// Interface for coordinates
interface Coordinates {
    lat: number;
    lng: number;
}

// Component props
interface GoogleMapsComponentProps {
    mapLink: string;
    wrapperSX?: SxProps<Theme>;
    mapContainerStyle?: React.CSSProperties;
}

// Map container style
const defaultMapContainerStyle: React.CSSProperties = {
    width: '100%',
    minHeight: '326px',
    height: '100%',
} as const;

// Default center
const defaultCenter: Coordinates = {lat: 0, lng: 0};

// Libraries for Google Maps API
const LIBRARIES: Library[] = ['places', 'marker'];

// Marker component with AdvancedMarkerElement and fallback to google.maps.Marker
const Marker: React.FC<{
    position: Coordinates;
    map: google.maps.Map;
    useAdvancedMarker?: boolean;
}> = ({position, map, useAdvancedMarker = false}) => {
    const markerRef = useRef<google.maps.Marker | google.maps.marker.AdvancedMarkerElement | null>(null);

    useEffect(() => {
        if (useAdvancedMarker && google.maps.marker?.AdvancedMarkerElement) {
            try {
                markerRef.current = new google.maps.marker.AdvancedMarkerElement({
                    position,
                    map,
                    content: new google.maps.marker.PinElement({
                        background: '#FF0000',
                        borderColor: '#000000',
                        glyphColor: '#FFFFFF',
                        scale: 1.5,
                    }).element,
                    zIndex: 1000,
                });
            } catch (error) {
                console.error('Failed to create AdvancedMarkerElement:', error);
            }
        }

        // Fallback to google.maps.Marker if AdvancedMarkerElement fails or is disabled
        if (!markerRef.current) {
            markerRef.current = new google.maps.Marker({
                position,
                map,
                icon: {
                    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    scaledSize: new google.maps.Size(40, 40),
                },
                zIndex: 1000,
            });
        }

        return () => {
            if (markerRef.current) {
                if ('setMap' in markerRef.current) {
                    markerRef.current.setMap(null);
                } else {
                    markerRef.current.map = null;
                }
                markerRef.current = null;
            }
        };
    }, [position, map, useAdvancedMarker]);

    return null;
};

const GoogleMapsComponent: React.FC<GoogleMapsComponentProps> = ({
                                                                     mapLink,
                                                                     wrapperSX,
                                                                     mapContainerStyle: mapContainerStyleProp
                                                                 }) => {
    const [center, setCenter] = useState<Coordinates>(defaultCenter);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Validate environment variables
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
    const isValidMapId = mapId && !mapId.toLowerCase().includes('demo');

    if (!apiKey) {
        console.error('Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local');
        setError('Google Maps API key is missing.');
    }
    if (!mapId) {
        console.error('Missing NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID in .env.local');
        setError('Map ID is missing.');
    } else if (!isValidMapId) {
        console.error('Invalid Map ID:', mapId);
        setError('Invalid Map ID. Please use a valid Map ID from Google Cloud Console.');
    }

    // Load Google Maps API
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: apiKey || '',
        libraries: LIBRARIES,
        mapIds: isValidMapId ? [mapId] : undefined,
        version: '3.57',
    });

    // Debug API load and tile loading
    useEffect(() => {
        if (isLoaded) {
           if (mapRef.current) {
                mapRef.current.addListener('tilesloaded', () => {
                });
                mapRef.current.addListener('idle', () => {
                });
            }
        }
    }, [isLoaded, apiKey, mapId, isValidMapId]);

    // Resolve map link and extract coordinates
    useEffect(() => {
        if (!mapLink) {
            setError('No map link provided.');
            setIsLoading(false);
            return;
        }

        const resolveUrl = async () => {
            try {
                const response = await fetch(`/api/resolve-url?url=${encodeURIComponent(mapLink)}`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const {url} = await response.json();

                const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
                const match = url.match(regex);
                if (!match) {
                    throw new Error('No coordinates found in URL');
                }

                const lat = parseFloat(match[1]);
                const lng = parseFloat(match[2]);
                if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                    throw new Error('Invalid coordinates');
                }

                setCenter({lat, lng});
                setIsLoading(false);
            } catch (err) {
                console.error('Failed to resolve map link:', err);
                setError('Failed to load map location.');
                setIsLoading(false);
            }
        };

        setIsLoading(true);
        resolveUrl();
    }, [mapLink]);

    // Handle loading and error states
    if (isLoading || !isLoaded) {
        return <LoaderElement/>;
    }

    if (loadError || error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="326px">
                <Typography color="error">{loadError ? 'Failed to load Google Maps' : error}</Typography>
            </Box>
        );
    }

    return (
        <Box className={'map-wrapper'}
             sx={{position: 'relative', width: '100%', height: '100%', minHeight: '326px', ...wrapperSX}}>
            {isLoading || !isLoaded && <LoaderElement/>}
            {isLoaded && (!loadError || !error) && <GoogleMap
                mapContainerStyle={{...defaultMapContainerStyle, ...mapContainerStyleProp}}
                center={center}
                zoom={15}
                onLoad={(map) => {
                    console.log('Map loaded with Map ID:', mapId);
                    mapRef.current = map;
                }}
                options={{mapId: mapId}}


            >
                {mapRef.current && (
                    <Marker
                        position={center}
                        map={mapRef.current}
                        useAdvancedMarker
                    />
                )}
            </GoogleMap>}
        </Box>
    );
};

export default memo(GoogleMapsComponent);