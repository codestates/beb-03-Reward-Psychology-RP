<<<<<<< HEAD
import * as React from "react";
import PostSummary from "../component/postSummary";

//mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";


const PostContainer = styled(Box)(({ theme }) => ({
    position: "aboslute",
    display: "flex",
    flexDirection: "column",
    boxShadow: 3,
    top: "200px",
    left: "26%",
}));

function main() {
    return (
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
=======
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
>>>>>>> d17d7e916228fa52e2339f3f8daa57ae6a2c4331
            </Stack>
        </PostContainer>
    );
}

export default Main;
