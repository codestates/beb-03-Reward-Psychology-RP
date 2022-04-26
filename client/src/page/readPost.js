import { Container, Grid, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import axios from 'axios';

function ReadPost() {
    const [replyText, setReplyText] = useState('');
    const [isClicked, setIsclicked] = useState(false);
    const hashtagArr = testHashtags.split(',');

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

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

    async function sendReq() {
        const payload = {
            text: replyText,
        };
        const res = await axios.post('http://localhost:3001/gg', payload);

        const data = res.data;
        console.log(data);
    }

    return (
        <Container>
            <Box>
                {/* dummybox */}
                <Box sx={{ pt: 11 }} />
                <Box
                    sx={{
                        p: 3,
                        // bgcolor: 'yellow',
                        borderBottom: 1,
                        fontSize: 30,
                        textAlign: 'left',
                    }}
                >
                    {testTitle}
                </Box>
                <Box
                    sx={{
                        p: 3,
                        // bgcolor: 'green',
                        textAlign: 'left',
                    }}
                >
                    {testBody}
                </Box>
                <Grid container spacing={2}>
                    {hashtagArr.map((tag) => {
                        return (
                            <Grid item xs={3}>
                                <Item># {tag}</Item>
                            </Grid>
                        );
                    })}
                </Grid>
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
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        sendReq();
                                    }}
                                >
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

const testTitle = `Lorem Ipsum`;
const testBody = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Maecenas sed ante dolor. Integer posuere lobortis nunc sit
amet pulvinar. Proin elementum dignissim congue. Sed semper
mauris et dictum fringilla. Phasellus diam ex, tempor a
placerat in, malesuada pharetra tortor. Vestibulum ante
ipsum primis in faucibus orci luctus et ultrices posuere
cubilia curae; Cras eleifend ipsum tellus, nec consequat sem
feugiat vel. Praesent ultrices justo quam, non tincidunt mi
auctor ac. Aenean ac venenatis dolor. Etiam dui nunc,
blandit pellentesque metus ut, porta tincidunt mauris.
Nullam posuere enim dui, et dapibus orci fermentum vitae.
Nunc vitae augue lacinia felis tempor laoreet eget sit amet
elit. Nunc eget nunc eros. Proin efficitur maximus rhoncus.
Suspendisse tincidunt luctus convallis. Etiam eget fringilla
neque. Suspendisse eu ullamcorper lacus. Pellentesque at mi
pulvinar, congue ipsum sed, placerat justo. Nunc vulputate
erat vitae tincidunt luctus. Nam condimentum semper nibh eu
auctor. In lobortis nisl sed mi consequat, semper efficitur
mi commodo. Suspendisse convallis, lacus at posuere varius,
mi nulla tincidunt orci, vel ultricies felis magna vitae
felis. Nunc tincidunt purus id lectus semper dapibus.
Vestibulum ante ipsum primis in faucibus orci luctus et
ultrices posuere cubilia curae; Sed nec quam a est eleifend
consectetur. Donec nec eros quam. Maecenas tellus ligula,
pulvinar non velit at, ullamcorper semper magna. Aenean eu
faucibus elit. Nunc dapibus faucibus nisi sed egestas.
Curabitur pretium, ligula nec iaculis posuere, leo sem
consequat eros, ac tempus nulla ligula eget diam. Maecenas
mattis erat id ligula aliquam, non interdum purus feugiat.
Aenean condimentum condimentum neque, id semper turpis
dapibus in. Nunc vitae pharetra diam. Vivamus congue, ante
nec accumsan gravida, sem nisl finibus leo, a auctor erat
dolor vel mauris. In consectetur sed massa in sodales.
Aenean mollis, tortor at molestie scelerisque, mauris eros
luctus tellus, et dapibus quam elit quis massa. Donec
lobortis tristique ligula. Curabitur non porta tortor. Ut
auctor pretium turpis mattis mattis. Lorem ipsum dolor sit
amet, consectetur adipiscing elit. Quisque vulputate ut
sapien a rutrum. Praesent convallis laoreet posuere. Nulla
tellus lectus, vestibulum eu turpis quis, varius semper
massa. Fusce egestas tortor eget mi mollis cursus. Integer
hendrerit vel leo at aliquet. Etiam sit amet dictum erat.
Nam ut dui sagittis odio pulvinar facilisis nec non enim.
Nunc laoreet tortor vitae nunc interdum, quis luctus elit
laoreet. Ut aliquet efficitur enim, vel malesuada purus
sagittis varius. Nunc at ante eu urna pretium dapibus
feugiat id ipsum. Vivamus sed lectus sapien. Sed quis urna a
lectus pulvinar molestie. Curabitur lacus purus, euismod sed
urna a, consequat porttitor ex. Sed id arcu sed nunc
accumsan laoreet in non est. Phasellus ullamcorper dapibus
consequat. Phasellus sed lorem ac nisl molestie ornare.
Fusce finibus lacus quis sem mattis, eget ornare leo
vestibulum. Sed nulla felis, pretium eu consequat ut, ornare
vel arcu. Nulla dignissim erat et dolor pharetra, vitae
bibendum sapien mollis.`;
const testHashtags = 'erat,laoreet,molestie,enim';
export default ReadPost;
