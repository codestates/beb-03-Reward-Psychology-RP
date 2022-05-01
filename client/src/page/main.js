import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import GlobalContext from '../context';
import PostSummary from '../component/postSummary';

const PostContainer = styled(Box)(({ theme }) => ({
    position: 'aboslute',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 3,
    top: '200px',
    left: '26%',
}));

function Main() {
    const [data, setData] = useState();
    const { setEditSeq, setTitle, setContent } = useContext(GlobalContext);

    useEffect(() => {
        setEditSeq(false);
        setTitle('');
        setContent('');
        axios.get('http://localhost:4000/').then((res) => {
            setData(res.data.postings);
        });
    }, []);

    return (
        <PostContainer sx={{ pt: 11 }}>
            <Stack spacing={2}>
                {data
                    ? data.map((singlePost, idx) => {
                          return (
                              <PostSummary
                                  writer={singlePost.userId}
                                  createdAt={singlePost.createdAt}
                                  title={singlePost.title}
                                  contents={singlePost.contents}
                                  likesCount={singlePost.meta.voting}
                                  commentsCount={singlePost.meta.comments}
                                  postURL={`/readpost/${singlePost._id}`}
                                  key={idx}
                                  sx={{ mt: 2 }}
                              />
                          );
                      })
                    : null}
            </Stack>
        </PostContainer>
    );
}

export default Main;
