import React, { useEffect, useContext } from 'react';

import Stack from '@mui/material/Stack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import ImgComponent from '../component/imgComponent';
import GlobalContext from '../context';

import web3 from 'web3';
import rpABI from '../rpABI';
const Contract = require('web3-eth-contract');
const rpAddress = '0xb2223FF50e9948839c0134321CDCaCB79f050E39';
const rpcURL = 'https://ropsten.infura.io/v3/0e4ca7c98aff4188997b4dfed819da2d';

Contract.setProvider(rpcURL);

const tokenContract = new Contract(
    rpABI,
    rpAddress // 컨트랙트 주소
);

function BuyNFT() {
    const tempArr = [0, 1, 2];

    const {
        userName,
        addr,
        balance,
        setBalance,
        setIsLoggedIn,
        setEditSeq,
        setTitle,
        setContent,
        pvKey,
        setPvKey,
    } = useContext(GlobalContext);

    useEffect(() => {
        setEditSeq(false);
        setTitle('');
        setContent('');
        if (addr) {
            tokenContract.methods
                .balanceOf(addr)
                .call()
                .then((res) => {
                    setBalance(web3.utils.fromWei(res));
                });
        }
    }, [balance]);

    // copy to clipboard user wallet address
    const copyWalletAccount = async () => {
        await navigator.clipboard.writeText(addr);
        alert('Wallet address is coppied!');
    };

    return (
        <div>
            <Box sx={{ pt: 11 }}>
                <Box
                    sx={{
                        borderBottom: 2,
                    }}
                >
                    <Typography variant="h3">
                        {userName}
                        <IconButton
                            onClick={() => {
                                setIsLoggedIn(false);
                                window.location.href = '/';
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        RP Wallet Address: {addr}
                        <IconButton onClick={copyWalletAccount}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Box>
                    <Typography sx={{ mt: 2, mb: 2 }}>
                        RP Token Balance: {balance}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Buy NFT using your RP Token!
            </Typography>
            <Stack direction="row" sx={{ pt: 5 }}>
                {tempArr.map((elem, idx) => {
                    const i = String(elem);
                    return (
                        <GlobalContext.Provider value={{ i, pvKey }} key={idx}>
                            <ImgComponent />
                        </GlobalContext.Provider>
                    );
                })}
            </Stack>
            <Box>
                <TextField
                    id="outlined-basic"
                    label="Private Key"
                    variant="outlined"
                    placeholder="Write Your Private Key!"
                    onChange={(ev) => {
                        setPvKey(ev.target.value);
                    }}
                    sx={{ mt: 3 }}
                    style={{ width: 400 }}
                ></TextField>
            </Box>
        </div>
    );
}

export default BuyNFT;
