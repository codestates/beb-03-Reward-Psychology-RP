import React, { useState } from 'react';
import PostSummary from '../component/postSummary';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
const axios = require('axios');

function Mypage() {
    const [userName, setUserName] = useState('default');
    const [addr, setAddr] = useState('0x000');
    const [balance, setBalance] = useState(0);

    const PostContainer = styled(Box)(({ theme }) => ({
        position: 'aboslute',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        top: '200px',
        left: '26%',
    }));

    const copyWalletAccount = async () => {
        await navigator.clipboard.writeText(addr);
        alert('Wallet address is coppied!');
    };

    return (
        <Box sx={{ pt: 11 }}>
            <Typography variant="h3">{userName}</Typography>
            <Box>
                RP Wallet Address: {addr}
                <IconButton aria-label="delete" onClick={copyWalletAccount}>
                    <ContentCopyIcon />
                </IconButton>
            </Box>
            <Typography>RP Token Balance: {balance}</Typography>
            <PostContainer>
                <Stack spacing={2}>
                    <PostSummary
                        writer="me"
                        createdAt="20205170623"
                        title="testTitle1111"
                        contents="test contents test contents test contents test contents test contents"
                        likesCount={11}
                        commentsCount={16}
                        postURL="/"
                    />
                    <PostSummary
                        writer="me"
                        createdAt="20205170623"
                        title="testTitle2222"
                        contents="contents test test contents test contents test contents test contentstest contents"
                        likesCount={11}
                        commentsCount={16}
                        postURL="/"
                    />
                    <PostSummary
                        writer="me"
                        createdAt="20205170623"
                        title="testTitle3333"
                        contents="test contents test contents test contents test contents test contents test contents test contents "
                        likesCount={11}
                        commentsCount={19}
                        postURL="/"
                    />
                    <PostSummary
                        writer="me"
                        createdAt="20205170623"
                        title="testTitle4444"
                        contents="test contents test contents test contents test contents test contents test contents test contents "
                        likesCount={112}
                        commentsCount={191}
                        postURL="/"
                    />
                </Stack>
            </PostContainer>
        </Box>
    );
}

export default Mypage;
