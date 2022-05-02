import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();
import rpABI from '../contract/rpABI.js';

export const mint = async function (address, amount) {
    const rpAddress = '0xb2223FF50e9948839c0134321CDCaCB79f050E39'; // rp토큰 컨트랙트 주소

    const ethNetwork =
        'wss://ropsten.infura.io/ws/v3/6df37bdfbb1e4dcd8db19ac839911a1b';
    const web3 = await new Web3(
        new Web3.providers.WebsocketProvider(ethNetwork)
    );

    // abi and address defined here
    const contract = await new web3.eth.Contract(rpABI, rpAddress);

    // PRIVATE_KEY variable defined
    const account = web3.eth.accounts.privateKeyToAccount(
        process.env.PRIVATE_KEY
    );

    console.log(`account:${account}`);

    // define METHOD_NAME, ARG1, ARG2 here
    const transaction = contract.methods.mintToken(
        address,
        Web3.utils.toWei(String(amount))
    );

    console.log(`transaction:${transaction}`);

    // define CONTRACT_ADDRESS
    const options = {
        to: rpAddress,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({ from: account.address }),
        gasPrice: await web3.eth.getGasPrice(), // or use some predefined value
    };
    console.log(`options:${options}`);

    // console.log(`address:${address}`);

    const signed = await web3.eth.accounts.signTransaction(
        options,
        process.env.PRIVATE_KEY
    );

    console.log('☕️☕️☕️ Pending ...');
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    if (receipt) {
        console.log('✅ Transaction Succeed!!');
    }
    return console.log(receipt); // print receipt
};

// mint("0xC318BE0b898aED3BBfc7Da5EdcbBB589A32Ca7D3", "1");
