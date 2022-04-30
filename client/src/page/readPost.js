import { Link as RouterLink } from 'react-router-dom';
import { Container, Grid, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pencilIcon from '../img/pencil.png';
import { useParams } from 'react-router-dom';

function ReadPost({ userName, setEditSeq }) {
    const [data, setData] = useState();
    const [replyText, setReplyText] = useState('');
    const [isClicked, setIsclicked] = useState(false);
    const idParam = useParams().id;

    console.log(data);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        const uri = `http://localhost:4000/posts/${idParam}`;

        axios.get(uri).then((res) => {
            setData(res.data);
        });
    }, []);

    const handleClick = (ev) => {
        if (isClicked === false) {
            setIsclicked(true);
        } else if (isClicked === true) {
            setIsclicked(false);
        }
    };

    const handleChange = (ev) => {
        setReplyText(ev.target.value);
    };

    return (
        <Container sx={{ pt: 11 }}>
            <Box>
                {data ? (
                    <div>
                        <Box
                            sx={{
                                p: 3,
                                // bgcolor: 'yellow',
                                fontSize: 30,
                                textAlign: 'left',
                            }}
                        >
                            {data.title}
                        </Box>
                        {data.owner === userName ? (
                            <Link
                                component={RouterLink}
                                to="/newpost"
                                sx={{ mt: 2, textAlign: 'right' }}
                                onClick={() => {
                                    setEditSeq(true);
                                }}
                            >
                                Edit
                            </Link>
                        ) : null}
                        <Box
                            sx={{
                                p: 1,
                                // bgcolor: 'blue',
                                borderBottom: 1,
                                fontSize: 20,
                                textAlign: 'right',
                            }}
                        >
                            Author: {data.owner}
                        </Box>
                        <Box
                            sx={{
                                p: 3,
                                // bgcolor: 'green',
                                textAlign: 'left',
                            }}
                        >
                            {data.contents}
                        </Box>
                        <Grid container spacing={2}>
                            {data.hashtags.length !== 0 &&
                                data.hashtags[0].split(',').map((tag) => {
                                    return (
                                        <Grid item xs={3}>
                                            <Item># {tag}</Item>
                                        </Grid>
                                    );
                                })}
                        </Grid>{' '}
                    </div>
                ) : null}
                <Link component="button" sx={{ mt: 2 }} onClick={handleClick}>
                    Reply
                </Link>
                {isClicked ? (
                    <Box>
                        <TextField
                            id="outlined-multiline-static"
                            label="Reply"
                            multiline
                            fullWidth="true"
                            rows={5}
                            placeholder="Write reply!"
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                        />
                        {replyText ? (
                            <Box sx={{ m: 5 }}>
                                <Button variant="outlined" onClick={() => {}}>
                                    Reply
                                </Button>{' '}
                                <Button variant="outlined">Cancel</Button>
                            </Box>
                        ) : (
                            <Box sx={{ m: 5 }}>
                                <Button variant="outlined" disabled>
                                    Reply
                                </Button>
                            </Box>
                        )}
                    </Box>
                ) : null}
            </Box>
        </Container>
    );
}

export default ReadPost;
