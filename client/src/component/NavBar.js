import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import searchIcon from '../img/search.png';
import postIcon from '../img/pencil.png';
import userIcon from '../img/user.png';
import logoIcon from '../img/logo.png';
import StoreIcon from '../img/store.png';
// import store from '../store/store';

const TopFix = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 99;
    top: 0ps;
    height: 5%;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.23);
    background: #ffffff;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
`;

const HomeButton = styled.div`
    position: fixed;
    /* background-color: #dddddd; */
    display: flex;
    flex-direction: row;
    align-items: center;
    top: 0%;
    left: 0%;
    height: 5%;
    width: 400px;
`;

const HomeLogo = styled.img`
    position: absolute;
    left: 5%;
    height: 80%;
    filter: opacity(0.5) drop-shadow(0 0 0 #ff602a);
`;
const HomeName = styled.div`
    position: absolute;
    left: 80px;
    /* height: 80%; */
    font-size: 25px;
    font-weight: 900;
    color: #ffb15a;
`;

const Search = styled.div`
    border-style: solid;
    border-color: #ffb15a;
    border-width: 2px;
    border-radius: 15px;
    /* background-color: #dddddd; */
    flex-direction: row;
    position: absolute;
    align-items: center;

    /* top: 0.3%; */
    right: 25%;
    height: 30px;
    width: 15%;
`;

const SearchInput = styled.input`
    position: absolute;
    border-width: 0px;

    /* background-color: #dddddd; */
    height: 90%;
    left: 1%;
`;
const SearchButton = styled.img`
    position: absolute;
    right: 7%;
    top: 14%;
    height: 1.3rem;
    width: 1.3rem;
    filter: opacity(0.5) drop-shadow(0 0 0 #cccccc);
`;

const PostButton = styled(Link)`
    position: absolute;
    display: flex;
    /* top: 0.3%;
    right: 13%; */
    right: 13%;
    border-style: solid;
    border-width: 2px;
    border-color: #555555;
    border-radius: 15px;
    padding: 8px;
    /* background-color: orange; */

    height: 1rem;
    width: 1rem;
`;

const StoreButton = styled(Link)`
    position: absolute;
    display: flex;
    /* background-color: green; */
    /* top: 0.3%; */
    border-style: solid;
    border-width: 2px;
    border-color: #555555;
    border-radius: 15px;
    padding: 8px;
    right: 8%;
    height: 1rem;
    width: 1rem;
`;

const MypageButton = styled(Link)`
    position: absolute;
    display: flex;
    /* background-color: green; */
    /* top: 0.3%; */
    border-style: solid;
    border-width: 2px;
    border-color: #555555;
    border-radius: 15px;
    padding: 8px;
    right: 3%;
    height: 1rem;
    width: 1rem;
`;

// const Icon = styled.img`
//     position: absolute;
// `;

// const LogInButton = styled.img``;

function NavBar({ isLoggedIn }) {
    // console.log('rendered');

    function Post({ to, src }) {
        return (
            <PostButton to={to}>
                <img src={src} />
            </PostButton>
        );
    }

    function Mypage({ to, src }) {
        return (
            <MypageButton to={to}>
                <img src={src} />
            </MypageButton>
        );
    }

    function NFTStore({ to, src }) {
        return (
            <StoreButton to={to}>
                <img src={src} />
            </StoreButton>
        );
    }

    return (
        <TopFix>
            <Link to="/">
                <HomeButton>
                    <HomeLogo src={logoIcon} />
                    <HomeName>Reward Psychology</HomeName>
                </HomeButton>
            </Link>
            <Search>
                <SearchInput defaultValue="Search"></SearchInput>
                <SearchButton src={searchIcon} />
            </Search>
            {isLoggedIn ? <Post to="/newpost" src={postIcon} /> : null}
            {isLoggedIn ? <NFTStore to="/buynft" src={StoreIcon} /> : null}
            <Mypage to="/mypage" src={userIcon} />
        </TopFix>
    );
}

export default NavBar;
