import { Button, IconButton, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import config from '../commons/config';

function Dropzone() {
    const [nickname, setNickname] = useState("");
    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const metaverseTypes = [
        {
            value: 'roblox',
            label: 'Roblox',
        },
        {
            value: 'zepeto',
            label: 'Zepeto',
        },
    ];
    const [metaverseType, setMetaverseType] = useState("");
    const handleMetaverseTypeChange = (event) => {
        setMetaverseType(event.target.value);
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [errorOpen, setErrorOpen] = useState(false);
    const handleErrorClose = () => {
        setErrorOpen(false);
    }

    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleUpload = async () => {
        if (!files.length) {
            setErrorMessage("No videos to upload");
            setErrorOpen(true);
            return;
        }
        setUploading(true);
        try {
            const promises = files.map(async file => {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await axios.post(config.API_SERVER + 'file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                return data;
            });
            const results = await Promise.all(promises);
            console.log(results);
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleTest = async () => {
        try {
            const getTestResult = await axios.get(config.API_SERVER + 'file/test');
            return console.log(getTestResult);
        } catch (error) {
            console.log(error);
        }
    }

    const handleConvert = async () => {
        try {
            const convertResult = await axios.get(config.API_SERVER + 'file/convert');
            return console.log(convertResult);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDetect = async () => {
        try {
            const detectResult = await axios.get(config.API_SERVER + 'file/detect');
            return console.log(detectResult);
        } catch (error) {
            console.log(error);
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: '.mp4',
        onDrop: acceptedFiles => {
            const mp4Files = acceptedFiles.filter(
                file => file.type === 'video/mp4' && file.name.endsWith('.mp4')
            );
            if (mp4Files.length !== acceptedFiles.length) {
                setErrorMessage("Only .mp4 files are accepted. Other files will not be processed.");
                setErrorOpen(true);
            }
            setFiles([...files, ...mp4Files.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))]);
        }
    })

    const thumbs = files.map((file, index) => {
        if (file.type.match(/video\/*/)) {
            return (
                <div key={file.name}>
                    <video
                        src={file.preview}
                        style={{ width: '100%' }}
                        controls
                    >
                        <track kind="captions" />
                    </video>
                    <IconButton
                        style={{
                            position: 'absolute',
                            right: '25%',
                            top: 'auto',
                            zIndex: 1
                        }}
                        size="small"
                        aria-label="cancel"
                        color="inherit"
                        onClick={() => {
                            setFiles(files.filter((_, i) => i !== index));
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>
            )
        } else {
            return null;
        }
    });

    return (
        <section>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the video files here ...</p>
                ) : (
                    <p>Drag 'n' drop some video files here, or click to select video files</p>
                )}
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={errorOpen}
                autoHideDuration={6000}
                onClose={handleErrorClose}
                message={errorMessage}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleErrorClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <aside>
                {thumbs}
            </aside>
            <div>
                <Button disabled={uploading} onClick={handleUpload}>
                    Upload
                </Button>
                <Button onClick={handleTest}>
                    Test
                </Button>
                <Button onClick={handleConvert}>
                    convert
                </Button>
                <Button onClick={handleDetect}>
                    detect
                </Button>
            </div>
        </section>
    )
}

export default Dropzone;