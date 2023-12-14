'use client'
import { Container } from '@mui/material';
import { useState } from 'react';

const StarRating = ({ initialRating, onChange }:any) => {
    const [rating, setRating] = useState(initialRating || 0);

    const handleStarClick = (clickedRating: number) => {
        setRating(clickedRating);
        onChange && onChange(clickedRating);
    };

    return (
        <Container>
        {[1, 2, 3, 4, 5].map((star) => (
            <span
            key={star}
            style={{
                cursor: 'pointer',
                color:
                star <= Math.floor(rating)
                    ? 'gold'
                    : star - 0.5 <= rating
                    ? 'gold'
                    : 'gray',
            }}
            >
            {star <= Math.floor(rating)
                ? '\u2605' // Full star
                : star - 0.5 <= rating
                ? '\u2B50' // Half star
                : '\u2606'} {/* Empty star */}
            </span>
        ))}
        </Container>
    );
};

export default StarRating;
