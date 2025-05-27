'use client';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@apollo/client';
import { meQuery } from '@/GraphQL/TSQueries/MeQuery';
import { useContext, useEffect, useState } from 'react';
import {LanguageContext, UserContext } from '@/app/ContextWrapper';
import { useRouter } from 'next/navigation';
import '../../page.css'

const AccountComponent = () => {
    const { user, setUser } = useContext(UserContext);
    const {language} = useContext(LanguageContext);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    // Set isClient on mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Get JWT from localStorage
    const jwt = isClient ? localStorage.getItem('jwt') : null;

    // Fetch user data with meQuery
    const { data, loading, error } = useQuery(meQuery, {
        skip: !isClient || !jwt, // Skip query if not client-side or no JWT

        onError: (err) => {
            console.error('Me query error:', err);
            if (err.message.includes('Unauthorized')) {
                // Clear user and redirect to login
                if (isClient) {
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('user');
                }
                setUser(null);
                router.push('/login');
            }
            else {
                router.push('/')
            }
        },
    });


    // Update UserContext with fetched data
    useEffect(() => {
        if (data?.me && isClient) {
            setUser({
                documentId: data.me.id,
                name: data.me.username,
                email: data.me.email,
                phoneNumber: data.me.phoneNumber || '',
                active: data.me.confirmed ?? false,
                blocked: data.me.blocked ?? false,
            });
        }
    }, [data, setUser, isClient]);

    // Redirect to login if no user or JWT
    useEffect(() => {
        if (user?.documentId) {
            router.replace(`/account/${user.documentId}`);
        } else {
            router.replace('/login');
        }
    }, [user, router]);

    if (!isClient || loading) {
        return (
            <Box className={'account'} display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box className={'account'} p={3}>
                <Alert severity="error">
                    {error.message.includes('Unauthorized')
                        ? (language === 'en' ? 'Please log in to view your account' : 'Будь ласка, увійдіть, щоб переглянути ваш обліковий запис')
                        : error.message}
                </Alert>
            </Box>
        );
    }

    const displayUser = data?.me || user;

    if (!displayUser) {
        return (
            <Box className={'account'} p={3}>
                <Alert severity="warning">
                    {language === 'en' ? 'No user data available' : 'Дані користувача відсутні'}
                </Alert>
            </Box>
        );
    }

    return (
        <Box className={'account'}>
            <Box className={'title'}>
                <Typography variant="h1" gutterBottom>
                    {language === 'en' ? 'My Account' : 'Мій обліковий запис'}
                </Typography>
            </Box>
            <Box className={'user-details'}>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Phone Number' : 'Номер телефону'}:</strong> {displayUser.username}
                </Typography>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Full Name' : 'Ім`я'}:</strong> {displayUser.fullName || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Email' : 'Електронна пошта'}:</strong> {displayUser.email}
                </Typography>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Status' : 'Статус'}:</strong>{' '}
                    {displayUser.blocked
                        ? (language === 'en' ? 'Blocked' : 'Заблоковано')
                        : displayUser.confirmed
                            ? (language === 'en' ? 'Confirmed' : 'Підтверджено')
                            : (language === 'en' ? 'Not Confirmed' : 'Не підтверджено')}
                </Typography>
            </Box>
        </Box>
    );
};

export default AccountComponent;