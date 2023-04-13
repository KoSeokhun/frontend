import { Box, Typography } from '@mui/material';
import React from 'react';
import DetectionLogs from '../../components/DetectionLogs';

function Logs() {
    return (
        <>
            <Typography variant="h4">
                Welcome!
            </Typography>
            <Box>
                You can check your ad video detection progress and get a result.
            </Box>
            <DetectionLogs />
        </>
    )
}

export default Logs;