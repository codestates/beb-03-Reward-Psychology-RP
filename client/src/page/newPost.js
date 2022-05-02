import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

import {
    Container,
    Grid,
    Paper,
    Typography,
    Popover,
    Modal,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import GlobalContext from '../context';
import { modalStyle } from '../modalStyle';

function NewPost() {
    const {
        addr,
        userName,
        postingId,
        title,
        setTitle,
        content,
        setContent,
        editSeq,
        setEditSeq,
    } = useContext(GlobalContext);

    const [buttonText, setButtonText] = useState('post');
    const [singleTag, setSingleTag] = useState('#');
    const [hashtagArr, setHashtagArr] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [modal, setModal] = useState(false);
    const tagRe = /[^A-Za-z0-9#,\s]/;

    useEffect(() => {
        if (editSeq) {
            const uri = `http://localhost:4000/posts/${postingId}/edit`;

            axios.get(uri).then((res) => {
                const hashtags = res.data.posting.hashtags[0].split(',');
                setHashtagArr(hashtags);
            });
            setButtonText('edit');
        }
    }, [editSeq]);

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
            const tempCurrArr = [...hashtagArr];
            if (tempCurrArr.indexOf(s) === -1) {
                setHashtagArr((currArr) => [...currArr].concat(s));
            }
            setSingleTag('#');
        } else {
            setAnchorEl(true);
        }
    };

    const handleChange = (event) => {
        if (event.target.id === 'outlined-basic_title') {
            setTitle(event.target.value);
        } else if (event.target.id === 'outlined-multiline-static') {
            setContent(event.target.value);
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
    // const checkValidity = (s) => {
    //     if (!s) {
    //         alert('Empty Adress!');
    //         return false;
    //     } else {
    //         const maniStr = s.trim();
    //         if (maniStr.length !== 42 || maniStr.slice(0, 2) !== '0x') {
    //             alert('Invalid Address!');
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    const sendReq = async () => {
        let payload;
        let uri;
        if (editSeq) {
            payload = {
                title: title,
                contents: content,
                hashtags: hashtagArr.join(),
            };
            uri = `http://localhost:4000/posts/${postingId}/edit`;
        } else {
            payload = {
                title: title,
                contents: content,
                hashtags: hashtagArr.join(),
                userName: userName,
                address: addr,
            };
            uri = 'http://localhost:4000/posts/upload';
        }

        const res = await axios.post(uri, payload);

        const data = res.data;
    };

    return (
        <Container maxWidth="md">
            {editSeq ? (
                <Typography variant="h5" color="blue" sx={{ pt: 11, pb: 2 }}>
                    Edit current post
                </Typography>
            ) : (
                <Typography variant="h5" color="blue" sx={{ pt: 11, pb: 2 }}>
                    Write new post
                </Typography>
            )}
            <Box component="form" autoComplete="off">
                <TextField
                    id="outlined-basic_title"
                    label="Title"
                    variant="outlined"
                    fullWidth={true}
                    defaultValue={title}
                    onChange={handleChange}
                />
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    label="Contents"
                    rows={20}
                    defaultValue={content}
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
                    <Grid container="true" spacing={2}>
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
            {hashtagArr.length !== 0 && title && content ? (
                <Box sx={{ m: 2 }}>
                    {editSeq ? (
                        <Grid sx={{ mt: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    if (title.length > 50) {
                                        alert(
                                            `Write title less than 50 character!(current: ${title.length})`
                                        );
                                    } else if (content.length < 20) {
                                        alert(
                                            `Write title at least 2 character!((current: ${content.length})`
                                        );
                                    } else {
                                        sendReq();
                                        setModal(true);
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
                        </Grid>
                    ) : (
                        <Box>
                            <Typography color="red">
                                RP token distribution can be delayed several
                                minutes.
                            </Typography>
                            <Grid sx={{ mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        if (title.length > 50) {
                                            alert(
                                                `Write title less than 50 character! (current: ${title.length})`
                                            );
                                        } else if (content.length < 20) {
                                            alert(
                                                `Write contents at least 20 character! (current: ${content.length})`
                                            );
                                        } else {
                                            setModal(true);
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
                            </Grid>
                        </Box>
                    )}
                </Box>
            ) : (
                <Button sx={{ m: 2 }} variant="outlined" disabled>
                    {buttonText}
                </Button>
            )}

            {modal ? (
                editSeq ? (
                    <Modal
                        open={modal}
                        onClose={() => {
                            setModal(false);
                        }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                Edit success!
                            </Typography>

                            <Button
                                component={RouterLink}
                                to={`/readpost/${postingId}`}
                                variant="outlined"
                                onClick={() => {
                                    setModal(false);
                                }}
                                sx={{ mt: 2 }}
                            >
                                close
                            </Button>
                        </Box>
                    </Modal>
                ) : (
                    <Modal
                        open={modal}
                        onClose={() => {
                            setModal(false);
                        }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                You want add this post?
                            </Typography>
                            <Button
                                component={RouterLink}
                                to={`/mypage`}
                                variant="outlined"
                                onClick={() => {
                                    sendReq();
                                }}
                                sx={{ mt: 2 }}
                            >
                                post{' '}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setModal(false);
                                }}
                                sx={{ mt: 2 }}
                            >
                                cancel
                            </Button>
                        </Box>
                    </Modal>
                )
            ) : null}
        </Container>
    );
}

export default NewPost;
