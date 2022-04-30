import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const axios = require('axios');

function NewPost({ userName, editSeq }) {
    const [value, setValue] = useState();
    const [singleTag, setSingleTag] = useState('#');
    const [hashtagArr, setHashtagArr] = useState([]);
    const [title, setTitle] = useState('');
    const [mainBody, setMainBody] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const tagRe = /[^A-Za-z0-9#,\s]/;
    useEffect(() => {
        if (editSeq) {
            setMainBody('wewefweffawergfaergetheh');
            setTitle('gfaergetheh');
            setHashtagArr([
                'asdfas',
                'asdfasdweff',
                'asdfasdfasdf',
                'asccdfasdf',
            ]);
        }
    }, []);
    console.log(editSeq);

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
            setHashtagArr((currArr) => [...currArr].concat(s));
            setSingleTag('#');
        } else {
            setAnchorEl(true);
        }
    };

    const handleChange = (event) => {
        console.log(event.target);
        if (event.target.id === 'outlined-basic_title') {
            setTitle(event.target.value);
        } else if (event.target.id === 'outlined-multiline-static') {
            setMainBody(event.target.value);
        } else {
            const leng = event.target.value.length;
            if (!event.target.value.match(tagRe)) {
                if (
                    event.target.value[leng - 1] === ' ' ||
                    event.target.value[leng - 1] === ',' ||
                    (event.target.value[leng - 1] === '#' && leng > 1)
                ) {
                    if (event.target.value.slice(1) !== '#') {
                        sliceHashtag(event.target.value.slice(1, leng - 1));
                    }
                } else {
                    setSingleTag(event.target.value);
                }
            }
        }
    };

    const eliminateFromArr = (ev) => {
        const selectedTag = ev.target.childNodes[1].data;
        console.log(selectedTag);
        const tempArr = hashtagArr.filter((tag) => {
            return tag !== selectedTag;
        });
        setHashtagArr(tempArr);
    };

    async function sendReq() {
        if (title.length < 2) {
            alert('Write title at least 2 character!');
        } else {
            const payload = {
                title: title,
                contents: mainBody,
                hashtags: hashtagArr.join(),
                userName: userName,
            };
            const res = await axios.post(
                'http://localhost:4000/posts/upload',
                payload
            );

            const data = res.data;
            console.log(data);
        }
    }

    return (
        <Container maxWidth="md">
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    id="outlined-basic_title"
                    label="Title"
                    variant="outlined"
                    placeholder="Write Title!"
                    fullWidth={true}
                    defaultValue={title}
                    onChange={handleChange}
                    sx={{ mt: 11 }}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Story"
                    multiline
                    rows={20}
                    defaultValue={mainBody}
                    placeholder="Write Your Story!"
                    fullWidth={true}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    id="outlined-basic"
                    label="HashTag"
                    variant="outlined"
                    placeholder="#"
                    fullWidth={true}
                    default={hashtagArr}
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
                                    <Item
                                        onClick={(ev) => {
                                            eliminateFromArr(ev);
                                        }}
                                    >
                                        # {tag}
                                    </Item>
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
