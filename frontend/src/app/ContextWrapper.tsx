'use client'
import {createContext, useEffect, useState} from "react";


type languageType = 'uk-UA' | 'ru-RU' | 'en-US' | null

export const LanguageContext = createContext<languageType>(null)

interface ContextWrapperProps {
    children: React.ReactNode;
    language?: languageType
}


const ContextWrapper = ({children, language}:ContextWrapperProps) => {
    const [lang, setLanguage] = useState<languageType>('uk-UA')


    useEffect(() => {
        if (language !== undefined && language !== null && lang !== language) {
            setLanguage(language)
        }
    }, [language])

    return (
        <LanguageContext.Provider value={lang}>
            {children}
        </LanguageContext.Provider>
    )
}

export default ContextWrapper