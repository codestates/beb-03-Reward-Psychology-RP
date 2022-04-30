import {
    Box,
    Button,
    CardMedia,
    Grid,
    CardActionArea,
    Typography,
    CardContent,
    Card,
} from '@mui/material';

import rpABI from '../rpABI';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import NFT1 from '../img/NFT1.png';
import NFT2 from '../img/NFT2.jpeg';
import NFT3 from '../img/NFT3.png';
const Contract = require('web3-eth-contract');

const rpAddress = '0xb2223FF50e9948839c0134321CDCaCB79f050E39';

const rpcURL = 'https://ropsten.infura.io/v3/0e4ca7c98aff4188997b4dfed819da2d';

Contract.setProvider(rpcURL);

const tokenContract = new Contract(
    rpABI,
    rpAddress // 컨트랙트 주소
);

const ImgComponent = ({ i, pvKeyInput, setPvKeyInput, checkValidity }) => {
    const [temp, setTemp] = useState();
    const [img, setImg] = useState();

    useEffect(() => {
        // For get price for each NFT
        tokenContract.methods
            .productInfo(`${i}`)
            .call()
            .then((res) => {
                // console.log(res);
                setTemp(res);
            });
        // set NFT image
        if (i === '0') {
            setImg(NFT1);
        } else if (i === '1') {
            setImg(NFT2);
        } else if (i === '2') {
            setImg(NFT3);
        }
    }, []);

    // Logic for buy NFT using RP token (same as mint.js)
    const myBuyNFT = async (privateKey, productNum) => {
        const ethNetwork =
            'wss://ropsten.infura.io/ws/v3/6df37bdfbb1e4dcd8db19ac839911a1b';
        const web3 = await new Web3(
            new Web3.providers.WebsocketProvider(ethNetwork)
        );

        // abi and address defined here
        const contract = await new web3.eth.Contract(rpABI, rpAddress);

        // PRIVATE_KEY variable defined
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        // define METHOD_NAME, ARG1, ARG2 here
        const transaction = contract.methods.buyNFT(productNum);

        // define CONTRACT_ADDRESS
        const options = {
            to: rpAddress,
            data: transaction.encodeABI(),
            gas: await transaction.estimateGas({ from: account.address }),
            gasPrice: await web3.eth.getGasPrice(), // or use some predefined value
        };

        const signed = await web3.eth.accounts.signTransaction(
            options,
            privateKey
        );

        console.log('☕️☕️☕️ Pending ...');
        const receipt = await web3.eth.sendSignedTransaction(
            signed.rawTransaction
        );

        if (receipt) {
            console.log('✅ Transaction Succeed!!');
        }
        return console.log(receipt); // print receipt
    };

    return (
        <Grid container justify="center" spacing={8}>
            <Grid item>
                <Card style={{ maxWidth: 250, margin: 15 }}>
                    <CardActionArea>
                        <div
                            style={{
                                display: 'flex',
                                alignItem: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <CardMedia
                                style={{
                                    width: 'auto',
                                    maxHeight: '200px',
                                }}
                                component="img"
                                image={img}
                                title="NFTImgs"
                            />
                        </div>
                        <CardContent>
                            <Typography>Price</Typography>
                            {temp ? (
                                <Box sx={{ m: 1 }}>
                                    {Web3.utils.fromWei(temp[0])} RP
                                </Box>
                            ) : null}
                            {pvKeyInput ? (
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        if (checkValidity(pvKeyInput)) {
                                            myBuyNFT(pvKeyInput, i);
                                        } else {
                                            setPvKeyInput('');
                                        }
                                    }}
                                >
                                    transact
                                </Button>
                            ) : null}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ImgComponent;
