'use client'
import * as React from 'react';
import { applySolidInversion } from '@mui/joy/colorInversion';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

function Stat({
    description,
    value,
    }: {
    description: React.ReactNode;
    value: React.ReactNode;
    }) {
    return (
        <Box sx={{ borderLeft: 3, borderColor: 'divider', px: 2, py: 0.5 }}>
        <Typography level="h3" component="div">
            {value}
        </Typography>
        <Typography level="title-sm" textColor="text.secondary">
            {description}
        </Typography>
        </Box>
    );
    }

    export default function ColorInversionAnyParent() {
    return (
        <Box
        sx={[
            {
            display: 'grid',
            gridTemplateColumns: { sm: '1fr 1fr' },
            alignItems: 'center',
            rowGap: 2,
            columnGap: 8,
            p: 4,
            borderRadius: 'sm',
            background: (theme) =>
                `linear-gradient(45deg, ${theme.vars.palette.neutral[800]}, ${theme.vars.palette.neutral[600]})`,
            },
            applySolidInversion('neutral'),
        ]}
        >
        <div>
            <Typography sx={{ mb: 2 }}>
            Explore the world of fashion in our store, where you will find a variety of top-notch shoes and apparel. From simple to dynamic styles, we are committed to bringing you unlimited shopping experiences with unique quality and style.
            </Typography>
            <Button variant="soft">Learn more</Button>
        </div>
        <Box
            sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
                sm: '1fr 1fr',
            },
            gap: 3,
            }}
        >
            <Stat value="4M" description="Weekly downloads" />
            <Stat value="87k" description="Stars on GitHub" />
            <Stat value="2.7k" description="Open source contributors" />
            <Stat value="18.4k" description="Followers on Twitter" />
        </Box>
        </Box>
    );
}