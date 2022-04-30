import { Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    Link,
    Stack,
    Typography,
    Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReadPost({
    userName,
    setEditSeq,
    setPostingId,
    setTempTitle,
    setTempContent,
    editSeq,
}) {
    const [data, setData] = useState();
    const [replyText, setReplyText] = useState('');
    const [isClicked, setIsclicked] = useState(false);
    const idParam = useParams().id;

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
    }, [editSeq]);

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
            <Container>
                {data ? (
                    <Container>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            container
                            sx={{
                                p: 3,
                                // bgcolor: 'yellow',
                                fontSize: 30,
                                textAlign: 'left',
                            }}
                        >
                            {data.title}
                            {data.owner === userName ? (
                                <Link
                                    component={RouterLink}
                                    variant="h6"
                                    to="/newpost"
                                    sx={{ mt: 2, textAlign: 'right' }}
                                    onClick={() => {
                                        setEditSeq(true);
                                        setPostingId(idParam);
                                        setTempTitle(data.title);
                                        setTempContent(data.contents);
                                    }}
                                >
                                    Edit
                                </Link>
                            ) : null}
                        </Stack>
                        <Container
                            sx={{
                                p: 1,
                                // bgcolor: 'blue',
                                borderBottom: 1,
                                fontSize: 20,
                                textAlign: 'right',
                            }}
                        >
                            Author: {data.owner}
                        </Container>
                        <Grid
                            sx={{
                                p: 3,
                                textAlign: 'left',
                            }}
                        >
                            {data.contents}
                        </Grid>
                        <Grid container spacing={2}>
                            {data.hashtags.length !== 0 &&
                                data.hashtags[0].split(',').map((tag, idx) => {
                                    return (
                                        <Grid item xs={3} key={idx}>
                                            <Item># {tag}</Item>
                                        </Grid>
                                    );
                                })}
                        </Grid>{' '}
                    </Container>
                ) : null}
                <Link component="button" sx={{ mt: 2 }} onClick={handleClick}>
                    Reply
                </Link>
                {isClicked ? (
                    <Container>
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
                            <Container sx={{ m: 5 }}>
                                <Button variant="outlined" onClick={() => {}}>
                                    Reply
                                </Button>{' '}
                                <Button variant="outlined">Cancel</Button>
                            </Container>
                        ) : (
                            <Container sx={{ m: 5 }}>
                                <Button variant="outlined" disabled>
                                    Reply
                                </Button>
                            </Container>
                        )}
                    </Container>
                ) : null}
            </Container>
        </Container>
    );
}

export default ReadPost;
