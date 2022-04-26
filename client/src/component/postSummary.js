import React from 'react';

import styled from 'styled-components';
// import Link from "@mui/material/Link";
// import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    MemoryRouter,
} from 'react-router-dom';

import commentIcon from '../img/comment.png';
import upvoteIcon from '../img/upvote.png';

// prop forwarding 을 이용하자

const LinkBlock = styled(RouterLink)`
    text-decoration: none;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;
const Icon = styled.img`
    height: 1rem;
    width: 1rem;
    margin-top: 3px;
    margin-left: 5px;
    margin-right: 5px;
    /* filter: opacity(0.5) drop-shadow(0 0 0 #); */
    filter: invert(68%) sepia(61%) saturate(510%) hue-rotate(335deg)
        brightness(105%) contrast(101%);
`;

function PostSummary({
    writer,
    createdAt,
    title,
    contents,
    likesCount,
    commentsCount,
    postURL,
}) {
    return (
        <Card
            component={LinkBlock}
            to={postURL}
            sx={{
                width: 600,
                height: 110,
                paddingLeft: 2,
                paddingTop: 0,
                paddingBottom: 0,
                flexDirection: 'row',
                alignContent: 'left',
            }}
        >
            <Stack direction="row">
                <Typography
                    sx={{ fontSize: 12, fontWeight: 'bold' }}
                    gutterBottom
                    align="left"
                >
                    {writer}
                </Typography>
                <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                    align="left"
                >
                    {createdAt}
                </Typography>
            </Stack>

            <Typography
                variant="h5"
                component="div"
                sx={{ fontSize: 20, fontWeight: 'bold' }}
                align="left"
            >
                {title}
            </Typography>

            <Typography variant="body2" align="left">
                {contents}
            </Typography>
            <Stack direction="row">
                <Icon src={upvoteIcon} />
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    {likesCount} votes
                </Typography>
                <Icon src={commentIcon} />
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                    {commentsCount} comments
                </Typography>
            </Stack>
        </Card>
    );
}

export default PostSummary;
