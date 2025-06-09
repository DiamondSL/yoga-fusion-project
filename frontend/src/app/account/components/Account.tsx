'use client';
import {Box, Typography} from '@mui/material';
import {useEffect} from 'react';
import {useAppContext, UserInfo} from '@/app/ContextWrapper';
import {useRouter} from 'next/navigation';
import '../page.css'
import {useQuery} from "@apollo/client";
import {userQuery} from "@/GraphQL/TSQueries/UsersQueries";
import LoaderElement from "@/Components/Loader";

const AccountComponent = ({user}: { user: UserInfo }) => {
    const {language} = useAppContext();
    const router = useRouter();
    const {data, loading, error} = useQuery(userQuery, {
        variables: {userId: user.documentId},
    });

    console.info(data, user)


    useEffect(() => {
        if (!user?.documentId) {
            router.refresh()
        }
    }, [user, router]);

    return loading ? <LoaderElement/> : (
        <Box className={'account'}>
            <Box className={'title'}>
                <Typography variant="h1" gutterBottom>
                    {language === 'en' ? 'My Account' : 'Мій обліковий запис'}
                </Typography>
            </Box>
            {error && (<Box className={'error-message'}>
                <Typography variant={'body1'} color={'error'}>{error?.message}</Typography>
            </Box>)}
            <Box className={'user-details'}>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Phone Number' : 'Номер телефону'}:</strong> {user?.phoneNumber}
                </Typography>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Full Name' : 'Ім`я'}:</strong> {data?.usersPermissionsUser?.fullName || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Email' : 'Електронна пошта'}:</strong> {data?.usersPermissionsUser?.email}
                </Typography>
                <Typography variant="body1">
                    <strong>{language === 'en' ? 'Instagram' : 'Instagram'}:</strong> {data?.usersPermissionsUser?.instagram}
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