import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import ImgComponent from '../component/imgComponent';

function BuyNFT({ userName, addr, balance, setIsLoggedIn }) {
    const tempArr = [0, 1, 2];
    const [pvKeyInput, setPvKeyInput] = useState('');

    const logoutHandler = () => {
        setIsLoggedIn(false);
        window.location.href('/');
    };

    // copy to clipboard user wallet address
    const copyWalletAccount = async () => {
        await navigator.clipboard.writeText(addr);
        alert('Wallet address is coppied!');
    };

    // check validity for private key
    // const checkValidity = (s) => {
    //     if (!s) {
    //         alert('Empty Adress!');
    //         return false;
    //     } else {
    //         const maniStr = s.trim();
    //         if (maniStr.length !== 42 || maniStr.slice(0, 2) !== '0x') {
    //             alert('Invalid Address!');
    //             return false;
    //         }
    //     }
    //     return true;
    // };

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
                        <IconButton onClick={logoutHandler}>
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
                    return (
                        <ImgComponent
                            i={JSON.stringify(elem)}
                            pvKeyInput={pvKeyInput}
                            setPvKeyInput={setPvKeyInput}
                            // checkValidity={checkValidity}
                            key={idx}
                        />
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
                        setPvKeyInput(ev.target.value);
                    }}
                    sx={{ mt: 3 }}
                    style={{ width: 400 }}
                ></TextField>
            </Box>
        </div>
    );
}

export default BuyNFT;
