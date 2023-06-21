const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Verify",function() {
    it("Check It",async function() {
        const accounts = await ethers.getSigners()
        const VerifySignature = await ethers.getContractFactory("VerifySignature")
        const contract = await VerifySignature.deploy()
        await contract.deployed()

        const Signer = accounts[0]
        const to = accounts[6].address
        const amount = 500
        const message = "Hello How Are You"
        const nonce = 45

        const hash = await contract.getMessageHash(message,to,amount,nonce);
        console.log("Hash Is : ",hash);

        const SigData = await Signer.signMessage(ethers.utils.arrayify(hash));
        console.log(ethers.utils.arrayify(hash))
        const r = SigData.slice(0,66);
        const s = '0x' + SigData.slice(66,130);
        const v = '0x' + SigData.slice(130,132);

        console.log(v,r,s)

        console.log("SigData Is : ",SigData);

        const EthereumHash = await contract.getEthSignedMessageHash(hash)

        console.log('Ethereum Hash : ',EthereumHash);
        console.log('Signer Is : ',Signer.address);
        console.log('Recovered Message Is : ',await contract.recover(EthereumHash,SigData))

        expect(await contract.verify(Signer.address,message,to,amount,nonce,SigData)).to.equal(true)
        
    }) 
})