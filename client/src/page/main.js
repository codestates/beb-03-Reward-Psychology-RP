import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import styled from "styled-components";

import PostSummary from '../component/postSummary';

//mui
import Box from '@mui/material/Box';
// import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// const PostContainer = styled.ul`
//     top: 15%;
//     left: 32%;
//     width: 55%;
//     height: 100%;

//     background-color: green;
//     justify-content: center;
//     position: absolute;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items: flex-start;
// `;

const PostContainer = styled(Box)(({ theme }) => ({
    position: 'aboslute',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 3,
    top: '200px',
    left: '26%',
}));

function Main({ setEditSeq }) {
    const [data, setData] = useState();

    useEffect(() => {
        setEditSeq(false);
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
