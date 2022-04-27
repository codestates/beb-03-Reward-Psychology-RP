const Web3 = require("web3");

const mint = async function () {
    const PRIVATE_KEY =
        "5209fbbc3d1321ccd1ba9d9450d0826617364d864edad1d20273376be2746871";
    const rpABI = require("../contract/rpABI.json");
    const rpAddress = "0xb2223FF50e9948839c0134321CDCaCB79f050E39"; // rp토큰 컨트랙트 주소

    const ethNetwork =
        "wss://ropsten.infura.io/ws/v3/6df37bdfbb1e4dcd8db19ac839911a1b";
    const web3 = await new Web3(
        new Web3.providers.WebsocketProvider(ethNetwork)
    );

    // abi and address defined here
    const contract = await new web3.eth.Contract(rpABI, rpAddress);

    // PRIVATE_KEY variable defined
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);

    // define METHOD_NAME, ARG1, ARG2 here
    const transaction = contract.methods.mintToken(
        "0xC318BE0b898aED3BBfc7Da5EdcbBB589A32Ca7D3",
        "1000000000000000000"
    );

    // define CONTRACT_ADDRESS
    const options = {
        to: rpAddress,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas({ from: account.address }),
        gasPrice: await web3.eth.getGasPrice(), // or use some predefined value
    };

    const signed = await web3.eth.accounts.signTransaction(
        options,
        PRIVATE_KEY
    );
    const receipt = web3.eth.sendSignedTransaction(signed.rawTransaction);

    console.log(receipt); // print receipt
    console.log("bye");
};

mint();
////////////
// const Web3 = require("web3");
// const solc = require("solc");
// const Tx = require("ethereumjs-tx").Transaction;
// const web3 = new Web3(
//     new Web3.providers.HttpProvider(
//         "https://ropsten.infura.io/v3/6df37bdfbb1e4dcd8db19ac839911a1b"
//     )
// );

// var account = "0xC318BE0b898aED3BBfc7Da5EdcbBB589A32Ca7D3";
// var key = new Buffer.from(
//     "5209fbbc3d1321ccd1ba9d9450d0826617364d864edad1d20273376be2746871",
//     "hex"
// );

// const bytecode =
// var Contract = new web3.eth.Contract(rpABI);

// const gasPrice = web3.eth.gasPrice;
// // const gasPriceHex = web3.toHex(gasPrice);
// // const gasLimitHex = web3.toHex(3000000);

// var tra = {
//     data: bytecode,
//     from: account,
// };

// var tx = new Tx(tra);
// tx.sign(key);

// var stx = tx.serialize();
// web3.eth.sendSignedTransaction("0x" + stx.toString("hex"), (err, hash) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("contract creation tx: " + hash);
// });
