'use client'
import React, {createContext, useEffect, useState} from "react";


type languageType = 'uk-UA' | 'ru-RU' | 'en-US' | null

export const LanguageContext = createContext<languageType>(null)

interface ContextWrapperProps {
    children: React.ReactNode;
    language?: languageType
}


const ContextWrapper = ({children, language}:ContextWrapperProps) => {
    const [lang, setLanguage] = useState<languageType>(language ?? null)

    useEffect(() => {
        if ((lang || language) !== undefined && (lang || language) !== null && language !== undefined) {
            setLanguage(language)
        }
    }, [lang, language])

    return (
        <LanguageContext.Provider value={lang}>
            {children}
        </LanguageContext.Provider>
    )
}

export default ContextWrapper