'use client';
import { Box, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import {LanguageContext, UserInfo} from '@/app/ContextWrapper';
import { useRouter } from 'next/navigation';
import '../page.css'

const AccountComponent = ({user}: {user: UserInfo}) => {
    const {language} = useContext(LanguageContext);
    const router = useRouter();

    useEffect(() => {
        if (!user?.documentId) {
            router.replace('/login');
        }
    }, [user, router]);

    return (
        <Box className={'account'}>
            <Box className={'title'}>
                <Typography variant="h1" gutterBottom>
                    {language === 'en' ? 'My Account' : 'Мій обліковий запис'}
                </Typography>
            </Box>
            <Box className={'user-details'}>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Phone Number' : 'Номер телефону'}:</strong> {user?.phoneNumber}
                </Typography>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Full Name' : 'Ім`я'}:</strong> {user?.name || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Email' : 'Електронна пошта'}:</strong> {user?.email}
                </Typography>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Status' : 'Статус'}:</strong>{' '}
                    {user?.blocked
                        ? (language === 'en' ? 'Blocked' : 'Заблоковано')
                        : user?.active
                            ? (language === 'en' ? 'Confirmed' : 'Підтверджено')
                            : (language === 'en' ? 'Not Confirmed' : 'Не підтверджено')}
                </Typography>
            </Box>
        </Box>
    );
};

export default AccountComponent;