'use client'
import { Container } from '@mui/material';
import { useState } from 'react';

const StarRating = ({ initialRating }:any) => {
    return (
        <Container>
        {[1, 2, 3, 4, 5].map((star) => (
            <span
            key={star}
            style={{
                cursor: 'pointer',
                color:
                star <= Math.floor(initialRating)
                    ? 'gold'
                    : star - 0.5 <= initialRating
                    ? 'gold'
                    : 'gray',
            }}
            >
            {star <= Math.floor(initialRating)
                ? '\u2605' // Full star
                : star - 0.5 <= initialRating
                ? '\u2B50' // Half star
                : '\u2606'} {/* Empty star */}
            </span>
        ))}
        </Container>
    );
};

export default StarRating;
