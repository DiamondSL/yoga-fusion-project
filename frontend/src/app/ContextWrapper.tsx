'use client';
import React, {createContext, Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';

type LanguageType = 'uk-UA' | 'ru-RU' | 'en';

interface LanguageContext {
    language: LanguageType;
    setLanguage: Dispatch<SetStateAction<LanguageType>>;
}

export type StrapiIcon = {
        url?: string;
        width?: number | string
        height?: number | string
        alternativeText?: string;
}

export type Social = {
    Icon?: StrapiIcon;
    url: string;
    Show?: boolean;
    Name?: string;
}

export interface SocialsContext {
    socials?: Social[]
}

interface ContextWrapperProps {
    children?: React.ReactNode;
    initialLanguage?: LanguageType;
}

export const LanguageContext = createContext<LanguageContext>({
    language: 'uk-UA', // Default fallback
    setLanguage: () => {}, // No-op fallback
});

const ContextWrapper = ({ children, initialLanguage }: ContextWrapperProps) => {
    // Use initialLanguage or 'uk-UA' during SSR
    const [lang, setLang] = useState<LanguageType>(initialLanguage ?? 'uk-UA');
    const [isClient, setIsClient] = useState(false);

    // Mark as client-side after mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Load stored language or geolocation on client-side only
    useEffect(() => {
        if (!isClient) return;

        // Check localStorage first
        const storedLang = localStorage.getItem('language') as LanguageType | null;
        if (storedLang) {
            setLang(storedLang);
            return;
        }

        // Fallback to geolocation if no stored language
        if (!initialLanguage && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const isUkraine = await checkIfUkraine(position.coords.latitude, position.coords.longitude);
                        setLang(isUkraine ? 'uk-UA' : 'en');
                    } catch (error) {
                        console.info('Error detecting location:', error);
                        setLang('en');
                    }
                },
                (error) => {
                    console.info('Geolocation error:', error);
                    setLang('en');
                }
            );
        } else {
            console.warn('Geolocation not supported or initialLanguage provided');
            setLang(initialLanguage ?? 'en');
        }
    }, [isClient, initialLanguage]);

    // Sync language to localStorage when it changes
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('language', lang);
        }
    }, [lang, isClient]);

    const checkIfUkraine = async (lat: number, lon: number): Promise<boolean> => {
         // Placeholder
        return lat > 44 && lat < 52 && lon > 22 && lon < 40;
    };

    const languageValue = useMemo(
        () => ({
            language: lang,
            setLanguage: setLang,
        }),
        [lang]
    );

    return (
        <LanguageContext.Provider value={languageValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export default ContextWrapper;