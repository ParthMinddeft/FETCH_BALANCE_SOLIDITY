const {ethers} = require('ethers')
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/9bf47468011a409ab9141737dc50f1e8`); 
const queryBlockchain=async() => {
    const block = await provider.getBlockNumber();
    console.log("Current Block Number is : ",block);
    const balance = await provider.getBalance("0xf0bafd58e23726785a1681e1dea0da15cb038c61");
    console.log("Account Balance is BN: ",balance);
    const balanceEther = ethers.utils.formatEther(balance);
    console.log("Account Balance is ETHER: ",balanceEther);
    const balanceWei = ethers.utils.parseEther(balanceEther);
    console.log("Balance is:",balanceWei);
}
queryBlockchain();