'use client';
import React, {createContext, Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';

type LanguageType = 'uk-UA' | 'ru-RU' | 'en';

interface LanguageContext {
    language: LanguageType;
    setLanguage: Dispatch<SetStateAction<LanguageType>>;
}

export type UserInfo = {
    documentId: string;
    name?: string;
    phoneNumber?: string;
    email?: string;
    active?: boolean;
    blocked?: boolean;
}

interface UserContext {
    user: null | UserInfo
    setUser: Dispatch<SetStateAction<null | UserInfo>>;
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

type jwtToken = null | string | undefined

export interface jwtContext {
    jwt: jwtToken
    setJwt: Dispatch<SetStateAction<jwtToken>>;
}

interface ContextWrapperProps {
    children?: React.ReactNode;
    initialLanguage?: LanguageType;
}

export const LanguageContext = createContext<LanguageContext>({
    language: 'uk-UA', // Default fallback
    setLanguage: () => {
    }, // No-op fallback
});

export const UserContext = createContext<UserContext>({
    user: null, // Default fallback
    setUser: () => {
    }
});

export const jwtContext = createContext<jwtContext>({
    jwt: null,
    setJwt: () => {
    }
})


const checkIfUkraine = async (lat: number, lon: number): Promise<boolean> => {
    return lat > 44 && lat < 52 && lon > 22 && lon < 40;
};


const ContextWrapper = ({children, initialLanguage}: ContextWrapperProps) => {
    const [lang, setLang] = useState<LanguageType>(initialLanguage ?? 'uk-UA');
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<null | UserInfo>(null);
    const [jwt, setJwtToken] = useState<jwtToken>(null)

    // Mark as client-side after mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Load stored language or geolocation on client-side only
    useEffect(() => {
        if (!isClient) return;

        // Check localStorage first
        const storedLang = localStorage.getItem('language') as LanguageType | null;
        const storedUser = localStorage.getItem('user') as UserInfo | null;
        const storedJwt = localStorage.getItem('jwt') as jwtToken;

        if (storedJwt !== null && (jwt === null || jwt?.length === 0)) {
            if (storedJwt) setJwtToken(storedJwt);
        }

        if (storedLang) {
            setLang(storedLang);
            return;
        }

        if (storedUser) {
            setUser(storedUser)
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
    }, [isClient, initialLanguage, jwt]);

    // Sync language to localStorage when it changes
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('language', lang);
        }
    }, [lang, isClient]);

    const languageValue = useMemo(
        () => ({
            language: lang,
            setLanguage: setLang,
        }),
        [lang]
    );

    const jwtValue = useMemo(
        () => ({
            jwt: jwt,
            setJwt: setJwtToken,
        }),
        [jwt]
    );

    const userValue = useMemo(
        () => ({
            user: user,
            setUser: setUser,
        }),
        [user]
    );


    return (
        <LanguageContext.Provider value={languageValue}>
            <UserContext.Provider value={userValue}>
                <jwtContext.Provider value={jwtValue}>
                    {children}
                </jwtContext.Provider>
            </UserContext.Provider>
        </LanguageContext.Provider>
    );
};

export default ContextWrapper;