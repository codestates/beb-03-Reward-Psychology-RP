import * as React from "react";

// import styled from "styled-components";

import PostSummary from "../component/postSummary";

//mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

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
            </Stack>
        </PostContainer>
    );
}

export default main;
