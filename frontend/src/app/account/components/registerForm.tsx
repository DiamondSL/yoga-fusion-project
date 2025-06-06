'use client'
import {LanguageContext, UserContext} from "@/app/ContextWrapper";
import {Box, Button, FormControl, Input, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {loginUserMutation, registerUserMutation, updateUserMutation} from "@/GraphQL/Mutations/Authentication";
import {useMutation, useQuery} from "@apollo/client";
import {useRouter} from "next/navigation";
import {meQuery} from "@/GraphQL/TSQueries/MeQuery";
import AccountComponent from "@/app/account/components/Account";


type formProps = {
    isClient: boolean
    language?: 'en' | 'uk-UA' | 'ru-RU';
}


const RegisterForm = ({language = 'en', isClient}: formProps) => {
    const [step, setStep] = useState(0);
    const {setUser} = useContext(UserContext);
    const router = useRouter();
    const [userInformation, setUserInformation] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        instagramAccount: '',
        password: '',
    });
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [registerUser] = useMutation(registerUserMutation);
    const [updateUser] = useMutation(updateUserMutation);

    const handleInputChange = (e: { target: { name: string; value: string } }) => {
        const {name, value} = e.target;
        setUserInformation((prev) => ({...prev, [name]: value}));
        setError(''); // Clear error on input change
    };

    const sendOtp = async () => {
        try {
            if (!userInformation.phoneNumber.startsWith('+') || userInformation.phoneNumber.length < 10) {
                setError(
                    language === 'en'
                        ? 'Invalid phone number format. Use E.164 (e.g., +1234567890)'
                        : 'Недійсний формат номера телефону. Використовуйте E.164 (наприклад, +1234567890)'
                );
                return;
            }
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({phoneNumber: userInformation.phoneNumber}),
            });
            const data = await response.json();
            if (response.ok) {
                console.info('OTP sent:', data);
                setStep(1);
            } else {
                setError(
                    language === 'en' ? `Failed to send OTP: ${data.error || 'Unknown error'}` : `Не вдалося надіслати OTP: ${data.error || 'Невідома помилка'}`
                );
            }
        } catch (error) {
            console.error('Send OTP error:', error);
            setError(language === 'en' ? 'Error sending OTP' : 'Помилка надсилання OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            if (!otp || otp.length < 4) {
                setError(language === 'en' ? 'Please enter a valid OTP' : 'Будь ласка, введіть дійсний OTP');
                return;
            }
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({phoneNumber: userInformation.phoneNumber, code: otp}),
            });
            const data = await response.json();
            if (response) {
                console.info('OTP verified:', data);
                setStep(2);
            } else {
                setError(
                    language === 'en' ? `Invalid OTP: ${data.error || 'Verification failed'}` : `Недійсний OTP: ${data.error || 'Помилка перевірки'}`
                );
            }
        } catch (error) {
            console.error('Verify OTP error:', error);
            setError(language === 'en' ? 'Error verifying OTP' : 'Помилка перевірки OTP');
        }
    };

    const performRegistration = async () => {
        try {
            const fullName = `${userInformation.firstName.trim()} ${userInformation.lastName.trim()}`.trim();
            if (!fullName || fullName.length < 3) {
                setError(language === 'en' ? 'Full name is too short' : 'Повне ім’я занадто коротке');
                return;
            }
            if (!userInformation.email.includes('@')) {
                setError(language === 'en' ? 'Invalid email address' : 'Недійсна електронна пошта');
                return;
            }
            if (userInformation.password.length < 6) {
                setError(language === 'en' ? 'Password must be at least 6 characters' : 'Пароль має містити принаймні 6 символів');
                return;
            }

            const input = {
                username: userInformation.phoneNumber,
                email: userInformation.email,
                password: userInformation.password,
            };
            const {data} = await registerUser({variables: {input}});
            const {user, jwt} = data.register;

            setUser({
                documentId: user.documentId,
                name: fullName,
                phoneNumber: userInformation.phoneNumber, // Store phoneNumber locally
                email: user.email,
                active: false,
                blocked: user.blocked ?? false,
            });

            await updateUser({
                variables: {
                    id: user.documentId,
                    info: {
                        fullName
                    }
                }
            });

            if (isClient) {
                localStorage.setItem('jwt', jwt);
                localStorage.setItem('user', JSON.stringify({
                    documentId: user.id,
                    name: user.fullName,
                    phoneNumber: userInformation.phoneNumber, // Store phoneNumber locally
                    email: user.email,
                    active: false,
                    blocked: user.blocked ?? false
                }));
            }

            console.info('Registration successful:', data);
            router.push(`/account/${user.id}`);
        } catch (error) {
            console.error('Registration error:', error);
            setError(
                language === 'en'
                    ? `Registration failed: ${error || 'Unknown error'}`
                    : `Реєстрація не вдалася: ${error || 'Невідома помилка'}`
            );
        }
    };

    const handleNext = async () => {
        setError(''); // Clear previous errors
        if (step === 0) {
            if (!userInformation.firstName || !userInformation.lastName || !userInformation.email || !userInformation.phoneNumber) {
                setError(language === 'en' ? 'Please fill all required fields' : 'Будь ласка, заповніть усі обов’язкові поля');
                return;
            }
            await sendOtp();
        } else if (step === 1) {
            await verifyOtp();
        } else if (step === 2) {
            await performRegistration();
        }
    };

    return (
        <Box className={'register-form'}>
            <form noValidate id={'register-form'} autoComplete="off">
                {error && (
                    <Typography color="error" sx={{mb: 2}}>
                        {error}
                    </Typography>
                )}
                {step === 0 && (
                    <>
                        <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                            <Input
                                onChange={handleInputChange}
                                name={'firstName'}
                                type={'text'}
                                sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                                placeholder={language === 'en' ? 'First Name' : `Ім'я`}
                            />
                        </FormControl>
                        <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                            <Input
                                onChange={handleInputChange}
                                name={'lastName'}
                                type={'text'}
                                sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                                placeholder={language === 'en' ? 'Last Name' : `Прізвище`}
                            />
                        </FormControl>
                        <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                            <Input
                                onChange={handleInputChange}
                                name={'email'}
                                type={'email'}
                                sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                                placeholder={language === 'en' ? 'Email' : `Електронна пошта`}
                            />
                        </FormControl>
                        <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                            <Input
                                onChange={handleInputChange}
                                name={'phoneNumber'}
                                type={'tel'}
                                sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                                placeholder={language === 'en' ? 'Phone Number (+1234567890)' : `Номер телефону (+1234567890)`}
                            />
                        </FormControl>
                        <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                            <Input
                                onChange={handleInputChange}
                                name={'instagramAccount'}
                                type={'text'}
                                sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                                placeholder={language === 'en' ? 'Instagram nickname' : 'Нік в Instagram'}
                            />
                        </FormControl>
                    </>
                )}
                {step === 1 && (
                    <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                        <Input
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setError('');
                            }}
                            name={'otp'}
                            type={'text'}
                            sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                            placeholder={language === 'en' ? 'SMS code' : `Код із СМС`}
                        />
                    </FormControl>
                )}
                {step === 2 && (
                    <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                        <Input
                            onChange={handleInputChange}
                            name={'password'}
                            type={'password'}
                            sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                            placeholder={language === 'en' ? 'Password (min 6 characters)' : 'Пароль (мін. 6 символів)'}
                        />
                    </FormControl>
                )}
                <FormControl className={'register-controls'}>
                    {step > 0 && (
                        <Button
                            onClick={() => {
                                setStep((prev) => prev - 1);
                                setError('');
                            }}
                            variant={'contained'}
                            sx={{mr: 1}}
                        >
                            {language === 'en' ? 'Back' : 'Назад'}
                        </Button>
                    )}
                    <Button
                        onClick={handleNext}
                        variant={'contained'}
                        disabled={
                            step === 0 &&
                            (!userInformation.firstName ||
                                !userInformation.lastName ||
                                !userInformation.email ||
                                !userInformation.phoneNumber)
                        }
                    >
                        {language === 'en' ? 'Next' : 'Далі'}
                    </Button>
                </FormControl>
            </form>
        </Box>
    );
};


const LoginForm = ({language = 'en', isClient}: formProps) => {
    const {setUser} = useContext(UserContext);
    const [error, setError] = useState({executed: false, message: ''});
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [loginUser] = useMutation(loginUserMutation);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
        setError({executed: false, message: ''});
    };

    const performLogin = async () => {
        try {
            const input = {
                identifier: loginData.email,
                password: loginData.password,
            };
            const {data} = await loginUser({variables: {input}});
            const {user, jwt} = data.login;

            const userData = {
                documentId: user.documentId,
                name: user.username,
                email: user.email,
                phoneNumber: user.username,
                active: true,
                blocked: user.blocked ?? false,
            };

            setUser(userData);

            if (isClient) {
                localStorage.setItem('jwt', jwt);
                localStorage.setItem('user', JSON.stringify(userData));
            }

            if (user.documentId) {
                router.push(`/${user.documentId}`)
            }
        } catch (error) {
            console.error('Login error:', error);
            setError({
                executed: true,
                message: language === 'en' ? `Login failed: Invalid email or password` : `Помилка входу: Недійсна пошта або пароль`,
            });
        }
    };

    const loginUserEvent = () => {
        setError({executed: false, message: ''});
        if (!loginData.email) {
            setError({executed: true, message: language === 'en' ? 'Email required' : 'Потрібна електронна пошта'});
            return;
        }
        if (!loginData.password) {
            setError({executed: true, message: language === 'en' ? 'Password required' : 'Потрібен пароль'});
            return;
        }
        if (loginData.email.includes('@') && loginData.password.length >= 6) {
            performLogin().then(() => router.refresh());
        } else {
            setError({
                executed: true,
                message: language === 'en' ? 'Invalid email or password too short' : 'Недійсна пошта або пароль занадто короткий',
            });
        }
    };

    return (
        <Box className={'login-form'}>
            <form noValidate id={'login-form'} autoComplete="off">
                {error.executed && (
                    <Typography color="error" sx={{mb: 2}}>
                        {error.message}
                    </Typography>
                )}
                <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                    <Input
                        onChange={handleInputChange}
                        name={'email'}
                        type={'email'}
                        sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                        placeholder={language === 'en' ? 'Email' : 'Електронна пошта'}
                    />
                </FormControl>
                <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                    <Input
                        onChange={handleInputChange}
                        name={'password'}
                        type={'password'}
                        sx={{backgroundColor: 'primary.main', padding: '16px 9px'}}
                        placeholder={language === 'en' ? 'Password (min 6 characters)' : 'Пароль (мін. 6 символів)'}
                    />
                </FormControl>
                <FormControl sx={{maxWidth: '260px', width: '100%', mb: 2}}>
                    <Box className={'login-controls'}>
                        <Button
                            disabled={!loginData.email || !loginData.password}
                            variant={'contained'}
                            onClick={loginUserEvent}
                        >
                            {language === 'en' ? 'Sign In' : 'Увійти'}
                        </Button>
                    </Box>
                </FormControl>
            </form>
        </Box>
    );
};


const AuthenticationWrapper = () => {
    const {language} = useContext(LanguageContext)
    const {user, setUser} = useContext(UserContext)
    const [login, setLogin] = React.useState(false)
    const [isClient, setIsClient] = React.useState(false)
    const router = useRouter()

    const jwt = isClient ? localStorage.getItem('jwt') : null;

    const { data} = useQuery(meQuery, {
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

    useEffect(() => {
        setIsClient(true)
        if (isClient) {
            if (user === null) {
                const userEntity = JSON.parse(localStorage.getItem('user') as string);
                if (userEntity !== null && userEntity.documentId !== undefined) {
                    setUser({
                        documentId: userEntity.documentId,
                        email: userEntity.email,
                        phoneNumber: userEntity.name, // Will be updated later if needed
                        active: userEntity?.active || false, // Assume active on login
                        blocked: userEntity?.blocked || false,
                    });
                }
            }
        }
    }, [isClient, user, setUser]);


    return user?.documentId ? <AccountComponent user={user} /> : (<Box className={'authentication-wrapper'}>
        <Box className={'header'}>
            <Typography
                variant={'h1'}>{user !== null ? language === 'en' ? 'Login' : 'Логін' : language === 'en' ? 'Register' : 'Реєстрація'}</Typography>
        </Box>
        {(!user || false) && !login && <RegisterForm isClient={isClient} language={language}/>}
        {(!user || false) && login && <LoginForm isClient={isClient} language={language}/>}
        {!login && (<Box sx={{marginTop: '16px'}}><Typography onClick={() => setLogin(true)}
                                                              sx={{cursor: 'pointer', fontWeight: '700'}}
                                                              variant={'body1'}>{language === 'en' ? 'Want to login? Click here!' : 'Маєте аккаунт? Натисніть тут!'}</Typography></Box>)}
    </Box>)
}

export default AuthenticationWrapper