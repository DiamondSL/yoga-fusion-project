'use client';
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useQuery} from '@apollo/client';
import {meQuery} from '@/GraphQL/TSQueries/MeQuery';

type LanguageType = 'uk-UA' | 'ru-RU' | 'en';

export interface StrapiIcon {
    url?: string;
    width?: number | string;
    height?: number | string;
    alternativeText?: string;
}

export interface Social {
    Icon?: StrapiIcon;
    url: string;
    Show?: boolean;
    Name?: string;
}

export interface UserInfo {
    documentId: string;
    name?: string;
    phoneNumber?: string;
    email?: string;
    active?: boolean;
    blocked?: boolean;
    socials?: {
        social: string
        username: string
        verified: boolean
    }[]
}

type JwtToken = string | null;

interface AppContextType {
    language: LanguageType;
    setLanguage: (lang: LanguageType) => void;
    user: UserInfo | null;
    setUser: (user: UserInfo | null) => void;
    jwt: JwtToken;
    setJwt: (jwt: JwtToken) => void;
    isLoading: boolean;
    isClient: boolean
}

interface ContextWrapperProps {
    children: React.ReactNode;
    initialLanguage?: LanguageType;
}

const AppContext = createContext<AppContextType>({
    language: 'uk-UA',
    setLanguage: () => {
    },
    jwt: null,
    setJwt: () => {
    },
    user: null,
    setUser: () => {
    },
    isLoading: false,
    isClient: false
});

const checkIfUkraine = async (lat: number, lon: number): Promise<boolean> => {
    return lat > 44 && lat < 52 && lon > 22 && lon < 40;
};

const loadFromLocalStorage = <T, >(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch {
        return defaultValue;
    }
};

const saveToLocalStorage = <T, >(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppContextProvider');
    }
    return context;
};

export const AppContextProvider = ({children, initialLanguage = 'uk-UA'}: ContextWrapperProps) => {
    const [language, setLanguage] = useState<LanguageType>(
        loadFromLocalStorage('language', initialLanguage)
    );
    const [user, setUser] = useState<UserInfo | null>(loadFromLocalStorage('user', null));
    const [jwt, setJwt] = useState<JwtToken>(loadFromLocalStorage('jwt', null));
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Handle client-side mounting and initial data load
    useEffect(() => {
        setIsClient(true);
        setIsLoading(false);
    }, []);

    const {data, error} = useQuery(meQuery, {
        skip: !isClient || !jwt,
        context: {headers: {Authorization: jwt ? `Bearer ${jwt}` : ''}},
    });

    // Handle language initialization with geolocation
    useEffect(() => {
        if (!isClient || initialLanguage) return;

        const storedLang = loadFromLocalStorage<LanguageType>('language', 'uk-UA');
        if (storedLang) {
            setLanguage(storedLang);
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const isUkraine = await checkIfUkraine(position.coords.latitude, position.coords.longitude);
                        setLanguage(isUkraine ? 'uk-UA' : 'en');
                    } catch (error) {
                        console.error('Error detecting location:', error);
                        setLanguage('en');
                    }
                },
                () => {
                    setLanguage('en');
                }
            );
        } else {
            setLanguage('en');
        }
    }, [isClient, initialLanguage]);

    // Sync language to localStorage
    useEffect(() => {
        if (isClient) {
            saveToLocalStorage('language', language);
        }
    }, [language, isClient]);


    // Handle user data from GraphQL query
    useEffect(() => {
        if (!isClient || !data?.me) {
            const info = loadFromLocalStorage('user', user);
            if ((!info?.documentId) && (user?.documentId === undefined || user?.documentId === "")) {
                setUser(null)
                setJwt(null)
                return;
            }
        }

        const newUser: UserInfo = {
            documentId: data.me.id,
            email: data.me.email,
            phoneNumber: data.me.username || '',
            active: data.me.confirmed ?? false,
            blocked: data.me.blocked ?? false,
        };

        setUser(newUser);
        saveToLocalStorage('user', newUser);
    }, [data, isClient, user]);

    // Handle GraphQL errors
    useEffect(() => {
        if (error?.message.includes('Unauthorized')) {
            setUser(null);
            setJwt(null);
            saveToLocalStorage('user', null);
            saveToLocalStorage('jwt', null);
        }
    }, [error]);

    const contextValue = useMemo(
        () => ({
            language,
            setLanguage,
            user,
            setUser,
            jwt,
            setJwt,
            isLoading,
            isClient
        }),
        [language, user, jwt, isLoading, isClient]
    );

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;