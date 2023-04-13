import React from 'react'
import { Typography, Box } from '@mui/material';
import Dropzone from '../../components/Dropzone';
import DetectionLogs from '../../components/DetectionLogs';

const handleOnDrop = acceptedFiles => {
    // Do something with the files
}

function index() {

    return (
        <>
            <Typography variant="h4">Yolo</Typography>
            <Box>
                You can train YOLO AI from the data you uploaded
                and you can get reward.
            </Box>
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
                <Dropzone onDrop={handleOnDrop} />
            </Box>
            {/* <DetectionLogs /> */}
        </>
    )
}

export default index;