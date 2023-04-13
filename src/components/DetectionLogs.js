import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import config from '../commons/config';

function DetectionLogs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const URL = config.API_SERVER + '/file/detection';
        const eventSource = new EventSource(URL);

        eventSource.onmessage = (event) => {
            const log = JSON.parse(event.data);
            setLogs((prevLogs) => [...prevLogs, log]);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <Box sx={{
            border: "dashed",
            borderColor: "gray",
            borderWidth: "2px",
            padding: "10px",
            textAlign: "center",
            width: "50%",
            margin: "0 auto",
            marginTop: "20px"
        }}>
            {logs.map((log, index) => (
                <p key={index}>{log}</p>
            ))}
        </Box>
    );
}

export default DetectionLogs;
