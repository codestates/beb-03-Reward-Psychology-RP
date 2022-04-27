const rpABI = require("../contract/rpABI.json");
const rpAddress = "0xb2223FF50e9948839c0134321CDCaCB79f050E39"; // rp토큰 컨트랙트 주소

// 가지고 있는 public address
const dummyAddress = [
    "0xC318BE0b898aED3BBfc7Da5EdcbBB589A32Ca7D3",
    "0xC318BE0b898aED3BBfc7Da5EdcbBB589A32Ca7D3",
    "0xC318BE0b898aED3BBfc7Da5EdcbBB589A32Ca7D3",
];

const rpcURL = "https://ropsten.infura.io/v3/0e4ca7c98aff4188997b4dfed819da2d";
const Contract = require("web3-eth-contract");
Contract.setProvider(rpcURL);

const tokenContract = new Contract(
    rpABI,
    rpAddress // 컨트랙트 주소
);

const daemon = async function () {
    console.log("#####DAEMON START#####");

    let balances = [];
    // 지갑 주소의 balanceOf를 한번씩 호출
    for (let add of dummyAddress) {
        let balance = await tokenContract.methods.balanceOf(add).call();
        if (balance) {
            balances.push({ balance });
        }
        console.log(balances);
    }
};

// console.log(myContract.rpAddress);
console.log("hello world");

const loop = async function () {
    let cnt = 1;
    while (true) {
        console.log("====================================================");
        console.log(
            "==================loop " + cnt++ + "start==================="
        );
        await daemon();
    }
};

// 반복 실행
loop();
