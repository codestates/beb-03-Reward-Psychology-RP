import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Popover,
    Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const axios = require('axios');

function NewPost({
    userName,
    editSeq,
    setEditSeq,
    postingId,
    tempTitle,
    tempContent,
}) {
    const [buttonText, setButtonText] = useState('post');
    const [pvKey, setPvKey] = useState();
    const [value, setValue] = useState();
    const [contLabel, setContLabel] = useState('Contents');
    const [singleTag, setSingleTag] = useState('#');
    const [hashtagArr, setHashtagArr] = useState([]);
    const [title, setTitle] = useState('');
    const [mainBody, setMainBody] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const tagRe = /[^A-Za-z0-9#,\s]/;

    useEffect(() => {
        setTitle(tempTitle);
        setMainBody(tempContent);
        if (editSeq) {
            const uri = `http://localhost:4000/posts/${postingId}/edit`;

            axios.get(uri).then((res) => {
                console.log(res);
                // setMainBody(res.data.posting.contents);
                const hashtags = res.data.posting.hashtags[0].split(',');
                setHashtagArr(hashtags);
            });
            setContLabel(null);
            setButtonText('edit');
        }
    }, []);

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
        console.log(event.target.value);
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
        const tempArr = hashtagArr.filter((tag) => {
            return tag !== selectedTag;
        });
        setHashtagArr(tempArr);
    };

    // check validity for private key
    const checkValidity = (s) => {
        if (!s) {
            alert('Empty Adress!');
            return false;
        } else {
            const maniStr = s.trim();
            if (maniStr.length !== 42 || maniStr.slice(0, 2) !== '0x') {
                alert('Invalid Address!');
                return false;
            }
        }
        return true;
    };

    const sendReq = async () => {
        let payload;
        let uri;
        if (editSeq) {
            payload = {
                title: title,
                contents: mainBody,
                hashtags: hashtagArr.join(),
            };
            uri = `http://localhost:4000/posts/${postingId}/edit`;
        } else {
            payload = {
                title: title,
                contents: mainBody,
                hashtags: hashtagArr.join(),
                userName: userName,
                pvKey: String(pvKey),
            };
            uri = 'http://localhost:4000/posts/upload';
        }

        const res = await axios.post(uri, payload);

        const data = res.data;
        console.log(data);
    };

    return (
        <Container maxWidth="md">
            <Box component="form" autoComplete="off">
                <TextField
                    id="outlined-basic_title"
                    label="Title"
                    variant="outlined"
                    fullWidth={true}
                    defaultValue={tempTitle}
                    onChange={handleChange}
                    sx={{ mt: 11 }}
                />
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    label="Contents"
                    rows={20}
                    defaultValue={tempContent}
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
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
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
                        {hashtagArr.map((tag, idx) => {
                            return (
                                <Grid item xs={3} key={idx}>
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
            {hashtagArr.length !== 0 && title && mainBody && !editSeq ? (
                <Box>
                    <Box sx={{ m: 1 }}>
                        <Box>
                            <TextField
                                id="outlined-basic"
                                label="Private Key"
                                variant="outlined"
                                placeholder="Write Your Private Key!"
                                onChange={(ev) => {
                                    setPvKey(ev.target.value);
                                }}
                                sx={{ mt: 3 }}
                                style={{ width: 400 }}
                            ></TextField>
                        </Box>
                    </Box>
                    <Box sx={{ m: 5 }}></Box>
                </Box>
            ) : null}
            {pvKey || editSeq ? (
                pvKey ? (
                    <Box sx={{ m: 2 }}>
                        <Button
                            component={RouterLink}
                            to={`/mypage`}
                            variant="outlined"
                            onClick={() => {
                                if (title.length > 50) {
                                    alert(
                                        `Write title less than 50 character!(current: ${title.length})`
                                    );
                                } else if (mainBody.length < 20) {
                                    alert(
                                        `Write title at least 2 character!((current: ${mainBody.length})`
                                    );
                                } else {
                                    sendReq();
                                }
                            }}
                        >
                            {buttonText}
                        </Button>{' '}
                        <Button
                            component={RouterLink}
                            to="/"
                            variant="outlined"
                            onClick={() => {
                                setEditSeq(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ m: 2 }}>
                        <Button
                            component={RouterLink}
                            // to={`/readpost/${postingId}`}
                            to="/"
                            variant="outlined"
                            onClick={() => {
                                if (title.length > 50) {
                                    alert(
                                        `Write title less than 50 character!(current: ${title.length})`
                                    );
                                } else if (mainBody.length < 20) {
                                    alert(
                                        `Write title at least 2 character!((current: ${mainBody.length})`
                                    );
                                } else {
                                    sendReq();
                                    // console.log(editSeq);
                                    // setEditSeq(false);
                                    // console.log(editSeq);
                                }
                            }}
                        >
                            {buttonText}
                        </Button>{' '}
                        <Button
                            component={RouterLink}
                            to="/"
                            variant="outlined"
                            onClick={() => {
                                setEditSeq(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                )
            ) : (
                <Button sx={{ m: 2 }} variant="outlined" disabled>
                    {buttonText}
                </Button>
            )}
        </Container>
    );
}

export default NewPost;
