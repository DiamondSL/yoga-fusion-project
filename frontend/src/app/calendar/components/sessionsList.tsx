'use client';
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    IconButton,
    SelectChangeEvent, Button
} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import React, {useContext, useState, useMemo} from "react";
import {LanguageContext} from "@/app/ContextWrapper";
import {sessionsQuery} from "@/GraphQL/TSQueries/SessionsQueries";
import {useQuery} from "@apollo/client";
import LoaderElement from "@/Components/Loader";
import {addMinutes, format, parseISO, addDays, isBefore, startOfDay, subDays} from "date-fns";
import {useRouter} from "next/navigation";
import {teacherEntity} from "@/app/teachers/page";
import {ClassEntity, Intensity} from "@/app/classes/page";


export type SessionEntity = {
    documentId: string;
    Name?: string;
    Date: string;
    Duration?: number | null;
    bookings: {
        documentId: string
    }[];
    teachers: teacherEntity[];
    class?: ClassEntity;
    Room?: string;
    Places?: number;
};

// Define the shape of the query data
interface SessionsQueryData {
    sessions: SessionEntity[];
}

const formatEventTime = (dateString: string, duration: number | null): { start: string | null; end: string | null } => {
    try {
        const startDate = parseISO(dateString);
        const endDate = duration ? addMinutes(startDate, duration) : startDate;
        return {start: `${format(startDate, 'h:mmaaa')}`, end: `${format(endDate, 'h:mmaaa')}`};
    } catch (error) {
        console.error('Error formatting date:', error);
        return {start: null, end: null};
    }
};

const SessionsList = () => {
    const language = useContext(LanguageContext);
    const {data, loading, error} = useQuery<SessionsQueryData>(sessionsQuery);
    const router = useRouter();
    const today = startOfDay(new Date());

    // State with explicit types
    const [startDate, setStartDate] = useState<Date>(today);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
    const [selectedIntensities, setSelectedIntensities] = useState<Intensity[]>([]);
    const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const filteredSessions = useMemo(() => {
        if (!data?.sessions || !startDate) return [];
        return data.sessions.filter((session: SessionEntity) => {
            const sessionDate = parseISO(session.Date);
            const isWithinRange = !isBefore(sessionDate, startDate) && !isBefore(addDays(startDate, 7), sessionDate);
            const matchesSearch = session?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (session?.class?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
            const matchesDiscipline = selectedDisciplines.length === 0 ||
                (session?.class?.disciplines?.some(d => d?.Name && selectedDisciplines.includes(d.Name)) || false);
            const matchesIntensity = selectedIntensities.length === 0 ||
                (session?.class?.Intensity && selectedIntensities.includes(session.class.Intensity));
            const matchesTeacher = selectedTeachers.length === 0 ||
                (session?.teachers?.some(t => t?.Name && selectedTeachers.includes(t.Name)) || false);
            return isWithinRange && matchesSearch && matchesDiscipline && matchesIntensity && matchesTeacher;
        });
    }, [startDate, searchTerm, selectedDisciplines, selectedIntensities, selectedTeachers, data?.sessions]);

    const handleDisciplineChange = (event: SelectChangeEvent<unknown>) => {
        setSelectedDisciplines(event.target.value as string[]);
    };

    const handleIntensityChange = (event: SelectChangeEvent<unknown>) => {
        setSelectedIntensities(event.target.value as Intensity[]);
    };

    const handleTeacherChange = (event: SelectChangeEvent<unknown>) => {
        setSelectedTeachers(event.target.value as string[]);
    };

    const uniqueDisciplines = [...new Set(data?.sessions?.flatMap((s: SessionEntity) => s.class?.disciplines?.map(d => d?.Name) ?? []) || [])];
    const uniqueIntensities = [...new Set(data?.sessions?.map((s: SessionEntity) => s.class?.Intensity).filter(i => i !== undefined)) as unknown as Intensity[]];
    const uniqueTeachers = [...new Set(data?.sessions?.flatMap((s: SessionEntity) => s.teachers.map(t => t.Name ?? '')) || [])];

    const displayDateRange = startDate
        ? `${format(startDate, 'EEEE dd.MM')} - ${format(addDays(startDate, 6), 'EEEE dd.MM')}`
        : '';

    const handlePreviousWeek = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (startDate) {
            const newStartDate = subDays(startDate, 7);
            if (!isBefore(newStartDate, today)) {
                setStartDate(newStartDate);
            }
        }
    };

    const handleNextWeek = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (startDate) {
            setStartDate(addDays(startDate, 7));
        }
    };

    return loading ? (<LoaderElement/>) : error ? (<Box><Typography color={'warning'}>Error</Typography></Box>) : (
        <Box className={'calendar-section'} sx={{
            maxWidth: '1080px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Manrope, NyghtSerif'
        }}>
            <Box className={'calendar-title'} sx={{marginTop: '60px'}}>
                <Typography variant="h1" component="div">
                    {language?.language.includes('uk') ? "Розклад" : "Calendar"}
                </Typography>
            </Box>
            <Box className={'input-controls'}
                 sx={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', gap: '42px'}}>
                <Box className={'date-picker-wrapper'} sx={{
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main'
                }}>
                    <IconButton onClick={handlePreviousWeek}
                                disabled={startDate ? isBefore(subDays(startDate, 7), today) : false}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 11L1 6L7 1" stroke="#282218" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </IconButton>
                    <Box
                        onClick={() => setCalendarOpen(true)}
                        sx={{
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label={displayDateRange}
                                value={startDate}
                                onChange={(newDate: Date | null) => {
                                    if (newDate && !isBefore(startOfDay(newDate), today)) {
                                        setStartDate(startOfDay(newDate));
                                    }
                                    setCalendarOpen(false); // Close calendar after selection
                                }}
                                minDate={today}
                                sx={{color: 'primary.dark'}}
                                disablePast={true}
                                className={'sessions-datePicker'}
                                enableAccessibleFieldDOMStructure={false}
                                open={calendarOpen}
                                closeOnSelect={true}
                                onOpen={() => setCalendarOpen(true)}
                                onClose={() => setCalendarOpen(false)}
                            />
                        </LocalizationProvider>
                        {/*<Typography*/}
                        {/*    sx={{*/}
                        {/*        position: 'absolute',*/}
                        {/*        left: 0,*/}
                        {/*        right: 0,*/}
                        {/*        top: 0,*/}
                        {/*        bottom: 0,*/}
                        {/*        display: 'flex',*/}
                        {/*        alignItems: 'center',*/}
                        {/*        justifyContent: 'center',*/}
                        {/*        fontFamily: 'Manrope, NyghtSerif',*/}
                        {/*        fontSize: '16px',*/}
                        {/*        color: '#282218',*/}
                        {/*        pointerEvents: 'none',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    {displayDateRange}*/}
                        {/*</Typography>*/}
                    </Box>
                    <IconButton onClick={handleNextWeek}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11L7 6L1 1" stroke="#282218" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </IconButton>
                </Box>
                <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
                    <Box sx={{maxWidth: '350px', width: '100%', borderColor: 'primary.dark', backgroundColor: 'primary.main'}} className={'search'}>
                        <TextField
                            label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box className={'multi-select-wrapper'}>
                    <Box sx={{maxWidth: '150px', width: '100%', borderColor: 'primary.dark', backgroundColor: 'primary.main'}} className={'multi-select'}>
                        <FormControl fullWidth>
                            <InputLabel>Activity</InputLabel>
                            <Select
                                multiple
                                fullWidth
                                label="Activity"
                                value={selectedDisciplines}
                                onChange={(event) => handleDisciplineChange(event)}
                                renderValue={(selected) => (selected as string[]).join(', ')}
                            >
                                {uniqueDisciplines.map((discipline) => (
                                    <MenuItem key={discipline} value={discipline}>
                                        <Checkbox checked={selectedDisciplines.indexOf(discipline as string) > -1}/>
                                        {discipline}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{maxWidth: '150px', width: '100%', borderColor: 'primary.dark', backgroundColor: 'primary.main'}} className={'multi-select'}>
                        <FormControl fullWidth>
                            <InputLabel>Intensity</InputLabel>
                            <Select
                                fullWidth
                                multiple
                                label="Intensity"
                                value={selectedIntensities}
                                onChange={(event) => handleIntensityChange(event)}
                                renderValue={(selected) => (selected as Intensity[]).join(', ')}
                            >
                                {uniqueIntensities.map((intensity) => (
                                    <MenuItem key={intensity} value={intensity}>
                                        <Checkbox checked={selectedIntensities.indexOf(intensity) > -1}/>
                                        {intensity}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{maxWidth: '150px', width: '100%', borderColor: 'primary.dark', backgroundColor: 'primary.main'}} className={'multi-select'}>
                        <FormControl fullWidth>
                            <InputLabel>Teacher</InputLabel>
                            <Select
                                multiple
                                fullWidth
                                value={selectedTeachers}
                                onChange={(event) => handleTeacherChange(event)}
                                renderValue={(selected) => (selected as string[]).join(', ')}
                            >
                                {uniqueTeachers.map((teacher) => (
                                    <MenuItem key={teacher} value={teacher}>
                                        <Checkbox checked={selectedTeachers.indexOf(teacher) > -1}/>
                                        {teacher}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={'calendar'} sx={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap'}}>
                {startDate && Array.from({length: 7}, (_, i) => addDays(startDate, i)).map((date) => (
                    <Box key={date.toISOString()} className={'sessions-wrapper'}>
                        <Box className={'date'}>
                        <Typography variant="body2" fontWeight={700}>{format(date, 'EEEE')}</Typography>
                        <Typography variant="h8" fontWeight={700}>{format(date, 'dd')}</Typography>
                        </Box>
                        {filteredSessions
                            .filter(session => {
                                const sessionDate = parseISO(session?.Date);
                                return format(sessionDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                            })
                            .map((session) => {
                                const time = formatEventTime(session?.Date, session?.Duration ?? session?.class?.Duration ?? 0);
                                return (
                                    <Box key={session.documentId} className={'session'}
                                         sx={{borderColor: 'primary.dark', backgroundColor: 'primary.main'}}>
                                        <Box className={'title'}
                                             onClick={() => router.push(`classes/${session?.class?.documentId ?? ''}`)}>
                                            <Typography
                                                variant={'h8'}>{session?.Name ?? session?.class?.Name ?? 'Session'}</Typography>
                                        </Box>
                                        <Box className={'room'}>
                                            {session?.Room && <Typography variant={'body2'}>{session?.Room}</Typography>}
                                        </Box>
                                        <Box className={'time'}>
                                            <Typography variant={'body2'}
                                                        sx={{textTransform: 'uppercase'}}>{time?.start} -</Typography>
                                            <Typography variant={'body2'}
                                                        sx={{textTransform: 'uppercase'}}>{time?.end}</Typography>
                                        </Box>
                                        <Box className={'teachers'}>
                                            {session?.teachers?.map((teacher) => (
                                                <Typography
                                                    key={teacher.documentId}
                                                    onClick={() => teacher.documentId && router.push(`teachers/${teacher.documentId}`)}
                                                    variant={'body2'}
                                                >
                                                    {teacher?.Name}
                                                </Typography>
                                            ))}
                                        </Box>
                                        <Box className={'places'}>
                                            <Typography >{session?.bookings?.length}</Typography>/<Typography>{session?.Places}</Typography>
                                        </Box>
                                        <Box className={'actions'}>
                                            <Button size={'small'} className={session?.bookings?.length === session?.Places ? 'error' : ''} variant={'transparent'}>{session?.bookings?.length === session?.Places ? 'fully booked' : 'book'}</Button>
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default SessionsList;