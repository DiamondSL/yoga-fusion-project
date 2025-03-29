import React, { useState } from 'react';
import {Box, IconButton, SxProps} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import {Theme} from "@mui/system";

export interface ImageSliderProps {
    images: string[]; // Array of image URLs
    width: number | string;
    height: number | string;
    style?: SxProps<Theme>;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, width, height, style }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (images.length === 0) {
        return <Box>No images available</Box>;
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width,
                height,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image */}
            <Box
                component="img"
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.3s ease-in-out',
                }}
            />

            {/* Navigation Arrows - Only show when hovered */}
            {isHovered && (
                <>
                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            position: 'absolute',
                            left: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                    >
                        <ArrowBackIos />
                    </IconButton>

                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            },
                        }}
                    >
                        <ArrowForwardIos />
                    </IconButton>
                </>
            )}
        </Box>
    );
};

// Example usage
const Slider: React.FC = () => {
    const sampleImages = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
    ];

    return (
        <ImageSlider
            images={sampleImages}
            width="600px"
            height="400px"
        />
    );
};

export { Slider }
export default ImageSlider;