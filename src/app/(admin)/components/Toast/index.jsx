import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { ColorPaletteProp } from '@mui/joy/styles';

const AlertVariousStates=({title,color})=> {
    return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
        <Alert
            key={title}
            sx={{ alignItems: 'flex-start' }}
            variant="soft"
            color={color}
            endDecorator={
            <IconButton variant="soft" color={color}>
                <CloseRoundedIcon />
            </IconButton>
        }
        >
        <div>
            <div>{title}</div>
            <Typography level="body-sm" color={color}>
                This is a time-sensitive {title} Alert.
            </Typography>
        </div>
        </Alert>
    </Box>
    );
}
export default AlertVariousStates;