import React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { Popover } from '@mui/material';
const axios = require('axios');

function NewPost() {
    const [singleTag, setSingleTag] = useState('#');
    const [hashtagArr, setHashtagArr] = useState([]);
    const [title, setTitle] = useState('');
    const [mainBody, setMainBody] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    // const re = /[A-Za-z0-9]/;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handlePopoverClose = () => setAnchorEl(null);

    const sliceHashtag = (s) => {
        if (s) {
            setHashtagArr((currArr) => [...currArr, s]);
            setSingleTag('#');
        } else {
            setAnchorEl(true);
        }
    };

    const handleChange = (event) => {
        if (event.target.id === 'outlined-basic_title') {
            setTitle(event.target.value);
        } else if (event.target.id === 'outlined-multiline-static') {
            setMainBody(event.target.value);
        } else {
            const leng = event.target.value.length;
            if (
                event.target.value[leng - 1] === ' ' ||
                (event.target.value[leng - 1] === '#' && leng > 1)
            ) {
                if (event.target.value.slice(1) !== '#') {
                    sliceHashtag(event.target.value.slice(1, leng - 1));
                }
            } else {
                setSingleTag(event.target.value);
            }
        }
    };

    async function sendReq() {
        if (title.length < 1) {
            alert('');
        }
        const payload = {
            title: title,
            contents: mainBody,
            hashtags: hashtagArr.join(),
        };
        const res = await axios.post('http://localhost:3001/gg', payload);

        const data = res.data;
        console.log(data);
    }

    return (
        <Container maxWidth="md">
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    id="outlined-basic_title"
                    label="Title"
                    variant="outlined"
                    placeholder="Write Title!"
                    fullWidth="true"
                    onChange={handleChange}
                    sx={{ mt: 11 }}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Story"
                    multiline
                    rows={20}
                    placeholder="Write Your Story!"
                    fullWidth="true"
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    id="outlined-basic"
                    label="HashTag"
                    variant="outlined"
                    placeholder="#"
                    fullWidth="true"
                    default="#"
                    sx={{ mt: 2 }}
                    value={singleTag}
                    onChange={handleChange}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            sliceHashtag(singleTag.slice(1));
                        }
                    }}
                />
                <Popover
                    open={anchorEl}
                    anchorEl={<TextField />}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 2 }}>Empty Hashtag!</Typography>
                </Popover>
            </Box>
            <Box sx={{ mt: 2 }}>
                {hashtagArr.length !== 0 ? (
                    <Grid container spacing={2}>
                        {hashtagArr.map((tag) => {
                            return (
                                <Grid item xs={3}>
                                    <Item># {tag}</Item>
                                </Grid>
                            );
                        })}
                    </Grid>
                ) : null}
            </Box>
            {hashtagArr.length !== 0 && title && mainBody ? (
                <Box sx={{ m: 5 }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            sendReq();
                        }}
                    >
                        Post
                    </Button>{' '}
                    <Button variant="outlined">Cancel</Button>
                </Box>
            ) : (
                <Box sx={{ m: 5 }}>
                    <Button variant="outlined" disabled>
                        POST
                    </Button>
                </Box>
            )}
        </Container>
    );
}

export default NewPost;
