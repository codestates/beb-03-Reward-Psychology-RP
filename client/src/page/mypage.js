import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import PostSummary from '../component/postSummary';
import Box from '@mui/material/Box';
import { Container, Link, Button, Typography, Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import rpABI from '../rpABI';
import web3 from 'web3';
// import { useSelector } from 'react-redux';
// import store from '../store/store';
const axios = require('axios');
const Contract = require('web3-eth-contract');

const rpAddress = '0xb2223FF50e9948839c0134321CDCaCB79f050E39';

const rpcURL = 'https://ropsten.infura.io/v3/0e4ca7c98aff4188997b4dfed819da2d';

Contract.setProvider(rpcURL);

const tokenContract = new Contract(
    rpABI,
    rpAddress // 컨트랙트 주소
);

function Mypage({
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    addr,
    setAddr,
    balance,
    setBalance,
    setEditSeq,
}) {
    // sign - flag for sign in or not
    const [sign, setSign] = useState(false);
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [pvKey, setPvKey] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [modal, setModal] = useState(false);
    const [posts, setPosts] = useState([]);
    // const state = store.getState();
    // validity check for written e-mail address using regular expression
    const mailRe =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    // execute userEffect when login flag("isLoggedIn") is altered
    useEffect(() => {
        setEditSeq(false);
        if (addr) {
            tokenContract.methods
                .balanceOf(addr)
                .call()
                .then((res) => {
                    setBalance(web3.utils.fromWei(res));
                });
        }
        axios
            .get('http://localhost:4000/')
            .then((res) => {
                // console.log(res.data.postings);
                const tempData = [...res.data.postings];
                if (isLoggedIn) {
                    const userPosts = tempData.filter((single) => {
                        return single.owner === userName;
                    });
                    setPosts(userPosts);
                }
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
                setErrMsg(err.response.data.errorMessage);
            });
    }, [isLoggedIn]);

    const PostContainer = styled(Box)(({ theme }) => ({
        position: 'aboslute',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        top: '200px',
        left: '26%',
    }));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const signHandler = () => {
        if (sign === false) {
            setSign(true);
        } else if (sign === true) {
            setSign(false);
        }
    };

    const modalHandler = () => {
        setModal(false);
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
        // store.dispatch({ type: 'LOGOUT' });
        // store.subscribe(() => {
        //     console.log(store.getState());
        // });
    };

    const handleChange = (ev) => {
        if (ev.target.id === 'outlined-basic_name') {
            setUserName(ev.target.value);
        } else if (ev.target.id === 'outlined-basic_email') {
            setMail(ev.target.value);
        } else if (ev.target.id === 'outlined-basic_pass') {
            setPass(ev.target.value);
        } else if (ev.target.id === 'outlined-basic_passConf') {
            setPassConfirm(ev.target.value);
        }
    };

    // pring error message
    const resAlert = (flag, msg) => {
        if (flag !== 1) {
            setErrMsg('');
        }
        alert(msg);
    };

    // copy to clipboard user address
    const copyWalletAccount = async (flag) => {
        if (flag === 'addr') {
            await navigator.clipboard.writeText(addr);
        } else if (flag === 'pvKey') {
            await navigator.clipboard.writeText(pvKey);
        } else if (flag === 'mnemonic') {
            await navigator.clipboard.writeText(mnemonic);
        }

        alert('Address is coppied!');
    };

    // send request to server (login, join in)
    async function sendReq() {
        let uri;
        let payload;

        if (sign) {
            uri = 'http://localhost:4000/join';
            payload = {
                email: mail,
                userName: userName,
                password: pass,
                password2: passConfirm,
            };
        } else {
            uri = 'http://localhost:4000/login';
            payload = {
                userName: userName,
                password: pass,
            };
        }
        const res = await axios.post(uri, payload).catch((err) => {
            // setErrFlag(err.response.data.errorMessage);
            console.log(err.response);
            setErrMsg(err.response.data.errorMessage);
        });

        if (res) {
            if (sign) {
                console.log(res.data);
                setPvKey(res.data.privateKey);
                setMnemonic(res.data.mnemonic);
                setModal(true);
                setSign(false);
            } else {
                // store.dispatch({ type: 'LOGIN', isLoggedIn: true });
                console.log(res);
                setIsLoggedIn(true);
                const tempAdrr = res.data.address;
                setAddr(tempAdrr);
            }
        }
    }

    return (
        <div>
            {isLoggedIn ? (
                <Box sx={{ pt: 11 }}>
                    <Box
                        sx={{
                            borderBottom: 2,
                        }}
                    >
                        <Typography variant="h3">
                            {userName}
                            <IconButton onClick={logoutHandler}>
                                <LogoutIcon />
                            </IconButton>
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            RP Wallet Address: {addr}
                            <IconButton
                                onClick={() => {
                                    copyWalletAccount('addr');
                                }}
                            >
                                <ContentCopyIcon />
                            </IconButton>
                        </Box>
                        <Typography sx={{ mt: 2, mb: 2 }}>
                            RP Token Balance: {balance}
                        </Typography>
                    </Box>
                    <PostContainer sx={{ pt: 5 }}>
                        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                            Written Posts
                        </Typography>

                        <Stack spacing={2}>
                            {posts.length !== 0 ? (
                                posts.map((singlePost, idx) => {
                                    return (
                                        <PostSummary
                                            writer={singlePost.userId}
                                            createdAt={singlePost.createdAt}
                                            title={singlePost.title}
                                            contents={singlePost.contents}
                                            likesCount={singlePost.meta.voting}
                                            commentsCount={
                                                singlePost.meta.comments
                                            }
                                            postURL={`/readpost/${singlePost._id}`}
                                            key={idx}
                                            sx={{ mt: 2 }}
                                        />
                                    );
                                })
                            ) : (
                                <Typography sx={{ mt: 2, mb: 2 }}>
                                    No posts you wrote!
                                </Typography>
                            )}
                        </Stack>
                    </PostContainer>
                </Box>
            ) : (
                <Container>
                    <Box sx={{ pt: 11 }} />
                    {sign ? (
                        <div>
                            <Box
                                sx={{
                                    p: 3,
                                    fontSize: 30,
                                }}
                            >
                                Sign in
                            </Box>
                            <Box component="div">
                                <TextField
                                    id="outlined-basic_name"
                                    label="user name"
                                    variant="outlined"
                                    placeholder="Input your user name"
                                    style={{ width: 500 }}
                                    onChange={handleChange}
                                    sx={{ mt: 11 }}
                                />
                            </Box>
                            <TextField
                                id="outlined-basic_email"
                                label="email"
                                variant="outlined"
                                placeholder="Input your email"
                                style={{ width: 500 }}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                id="outlined-basic_pass"
                                type="password"
                                label="Password"
                                variant="outlined"
                                placeholder="Input your Password"
                                style={{ width: 500 }}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                            />
                            <TextField
                                id="outlined-basic_passConf"
                                type="password"
                                label="Password comfirmation"
                                variant="outlined"
                                placeholder="Input your Password once more"
                                style={{ width: 500 }}
                                onChange={handleChange}
                                sx={{ mt: 2, mb: 2 }}
                            />
                            <div>
                                <Link
                                    onClick={() => {
                                        signHandler();
                                    }}
                                >
                                    I already have account!
                                </Link>{' '}
                            </div>

                            {userName && mail && pass && passConfirm ? (
                                <Box sx={{ mt: 5 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            const mailValidity =
                                                mail.search(mailRe);
                                            if (mailValidity === -1) {
                                                alert('invalid mail address!');
                                            } else {
                                                sendReq();
                                            }
                                        }}
                                    >
                                        sign in
                                    </Button>
                                </Box>
                            ) : null}
                            {errMsg.indexOf('Join') === -1
                                ? errMsg.indexOf('Confirmation') === -1
                                    ? null
                                    : resAlert(0, errMsg)
                                : resAlert(0, errMsg)}
                        </div>
                    ) : (
                        <div>
                            <Box
                                sx={{
                                    p: 3,
                                    fontSize: 30,
                                }}
                            >
                                log in
                            </Box>
                            <Box component="div">
                                <TextField
                                    id="outlined-basic_name"
                                    label="user name"
                                    variant="outlined"
                                    placeholder="Input your user name"
                                    style={{ width: 500 }}
                                    onChange={handleChange}
                                    sx={{ mt: 11 }}
                                />
                            </Box>
                            <TextField
                                id="outlined-basic_pass"
                                type="password"
                                label="Password"
                                variant="outlined"
                                placeholder="Input your Password"
                                style={{ width: 500 }}
                                onChange={handleChange}
                                sx={{ mt: 2, mb: 2 }}
                            />
                            <div>
                                <Link
                                    onClick={() => {
                                        signHandler();
                                    }}
                                >
                                    Don't you have an account yet?
                                </Link>
                            </div>
                            {userName && pass ? (
                                <Box sx={{ mt: 5 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            sendReq();
                                        }}
                                    >
                                        login
                                    </Button>
                                </Box>
                            ) : null}
                            {errMsg.indexOf('exist') === -1
                                ? errMsg.indexOf('match') === -1
                                    ? null
                                    : resAlert(0, errMsg)
                                : resAlert(0, errMsg)}
                            {modal ? (
                                <Modal
                                    open={modal}
                                    onClose={modalHandler}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                        >
                                            Handle with care your private key
                                            and mnemonic key
                                        </Typography>
                                        <Typography
                                            id="modal-modal-description"
                                            sx={{ mt: 2 }}
                                        >
                                            {`private key = ${pvKey}`}
                                            <IconButton
                                                onClick={() => {
                                                    copyWalletAccount('pvKey');
                                                }}
                                            >
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Typography>
                                        <Typography
                                            id="modal-modal-description"
                                            sx={{ mt: 2 }}
                                        >
                                            {`mnemonic key = ${mnemonic}`}
                                            <IconButton
                                                onClick={() => {
                                                    copyWalletAccount(
                                                        'mnemonic'
                                                    );
                                                }}
                                            >
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Typography>
                                    </Box>
                                </Modal>
                            ) : null}
                        </div>
                    )}
                </Container>
            )}
        </div>
    );
}

export default Mypage;
