const express = require("express");
const app = express();
const Web3 = require('web3');
const API_KEY = "d6c26d1ad35f431497b6a668b789c562";
const provider = `https://sepolia.infura.io/v3/${API_KEY}`;
const ContractAddress = "0x611adC92C93166E8c8E03daDF21d64bE2E140526"
const wallet = "0x1883b638F0b2a06fB37FB4A297c38F7005790DEE";
const privatekey = "d298cef5f10db9a9574118089f45bf62a1ac8764f1ad72589aa3d0b6221995b0";

const abi = [
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_messageHash",
                "type": "bytes32"
            }
        ],
        "name": "getEthSignedMessageHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_message",
                "type": "string"
            }
        ],
        "name": "getMessageHash",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_ethSignedMessageHash",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "_sig",
                "type": "bytes"
            }
        ],
        "name": "recover",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_signer",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "ethMessageHash",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "_sig",
                "type": "bytes"
            }
        ],
        "name": "verify",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    }
]

const web3 = new Web3(new Web3.providers.HttpProvider(provider));
const contract = new web3.eth.Contract(abi, ContractAddress);

app.get('/', async (req, res) => {
    res.set('Content-type', 'text/html');
    var Signer = await web3.eth.accounts.privateKeyToAccount(privatekey)
    message = "Hello How Are You";
    const SignedTransaction = await web3.eth.accounts.sign(message, Signer.privateKey);
    console.log(SignedTransaction)
    const recover = await contract.methods.verify(Signer.address, SignedTransaction.messageHash, SignedTransaction.signature).call();
    res.send(recover);
    console.log("Recovered : ", recover);   
    console.log("Signer : ", Signer.address);
})  

app.listen(3000, () => {
    console.log('Server Started')
})