'use client';
import {Box, Button, styled, SxProps, Theme, Typography} from '@mui/material';
import React, {useMemo, useState} from 'react';
import {format, addDays, isSameDay, parse} from 'date-fns';

// Styled Calendar Container
const CalendarContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    maxWidth: '1002px',
    width: '100%',
    height: '48px',
    borderRadius: '23.5px',
    overflow: 'hidden',
    border: 'none',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '40px',
    },
}));

// Styled Date Button
const DateButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({theme, isSelected}) => ({
    flex: 1,
    height: '100%',
    borderRadius: '0',
    border: 'none',
    backgroundColor: 'transparent',
    color: isSelected ? '#282218' : 'white',
    fontFamily: 'NyghtSerif, serif',
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: '18px',
    textTransform: 'none',
    padding: '0 8px',
    minWidth: 0,
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&:click': {
        backgroundColor: 'transparent',
    },
    zIndex: isSelected ? 2 : 1,
    transition: 'all 0.3s ease',
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        padding: '0 4px',
    },
}));

interface CalendarPickerProps {
    startDate?: string | Date;
    onDateSelect?: (date: Date) => void;
    sx?: SxProps<Theme>
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({onDateSelect, startDate, sx}) => {
    const today = useMemo(() => new Date(), []);
    const [selectedDate, setSelectedDate] = useState<Date>(today);

    const baseDate = useMemo(() => {
        if (startDate && typeof startDate === 'string') {
            try {
                const parsedDate = parse(startDate, 'MM/dd/yyyy', new Date());
                if (!isNaN(parsedDate.getTime())) {
                    return parsedDate;
                }
            } catch (error) {
                console.warn('Invalid startDate format, falling back to today:', error);
            }
        } else if (startDate && typeof startDate === 'object') {
            return startDate;
        }

        return today;
    }, [startDate, today]);

    // Generate 7-day range starting from baseDate
    const dateRange = useMemo(() => {
        const dates: Date[] = [];
        for (let i = 0; i < 7; i++) {
            dates.push(addDays(baseDate, i));
        }
        return dates;
    }, [baseDate]);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    return (
        <CalendarContainer sx={{...sx}} className={'calendar'}>
            {dateRange.map((date, index) => {
                const isSelected = isSameDay(date, selectedDate);
                return (
                    <DateButton
                        key={index}
                        isSelected={isSelected}
                        onClick={() => handleDateSelect(date)}
                        aria-label={`Select date ${format(date, 'MMMM d, yyyy')}`}
                        sx={{color: 'primary.dark', paddingTop: '4px'}}
                    >
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '14px',
                                }}
                            >
                                {format(date, 'EEEE')}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    borderRadius: '100px',
                                    border: '1px solid',
                                    borderColor: 'transparent',
                                    padding: '6px 9px',
                                    fontStyle: 'italic',
                                    fontFamily: 'NyghtSerif, serif',
                                    fontSize: {xs: '16px', sm: '18px', md: '18px', xl: '18px'},
                                    fontWeight: 700,
                                }}
                            >
                                {format(date, 'd')}
                            </Typography>
                        </Box>
                    </DateButton>
                );
            })}
        </CalendarContainer>
    );
};

export default CalendarPicker;