//0x3c73e6e7cd7443b9d246adf29322daacf72167d2
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/9bf47468011a409ab9141737dc50f1e8`);

const walletAddress = "0x3c73e6e7cd7443b9d246adf29322daacf72167d2";
const walletAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "accountBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getValue",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sendEthContract",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "sendEthUser",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_num",
                "type": "uint256"
            }
        ],
        "name": "setValue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const contractInteraction = async () => {
    const walletContract = new ethers.Contract(walletAddress, walletAbi, provider);

    const contractName = await walletContract.name();
    console.log("Contract Name Is : ", contractName);

    const num = await walletContract.getValue();
    console.log("Value is : ", String(num));

    const contractBalance = await walletContract.contractBalance();
    const balanceEth = ethers.utils.formatEther(contractBalance);
    console.log("Contract Balance is : ", balanceEth);

    const userBalance = await walletContract.accountBalance("0x1883b638F0b2a06fB37FB4A297c38F7005790DEE");
    const balanceUser = ethers.utils.formatEther(userBalance);
    console.log("User Balance is : ", balanceUser);
}
contractInteraction();