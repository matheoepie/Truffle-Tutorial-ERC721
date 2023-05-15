const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const fs = require('fs');
const path = require("path");
require('dotenv').config()

//*vars
const MNEMONIC = process.env.MNEMONIC
const API_KEY = process.env.NODE_KEY


//* Remember to write the nft address in manually after deploying the contract
const NFT_CONTRACT_ADDRESS = "0x959e3c1bd37E28F43434110fB1A723EF9AeE66Af"
const OWNER_ADDRESS = "0x75BDCC5814628fF415eCfb4d4ADb3Ab45C7f7B4C";
const MUMBAI = `https://polygon-mumbai.g.alchemy.com/v2/${API_KEY}`
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`
const NUM_ITEMS = 5;


//*Parse the contract artifact for ABI reference.
let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/GameItem.json"));
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi

async function main() {

  try {
    //*define web3, contract and wallet instances
    const provider = new HDWalletProvider(MNEMONIC,MUMBAI);

    const web3Instance = new web3(provider);

    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
    );


      //* just mint 
    await nftContract.methods
      .mintItem(OWNER_ADDRESS, `https://gateway.pinata.cloud/ipfs/QmX2Hhb6nrpsRhuZWu7JWeaRrfgM9VWy6xcMAYWvQTajaw?_gl=1*vk5n7y*rs_ga*NjM2NDI5MTg4LjE2ODQxNzA5MDk.*rs_ga_5RMPXG14TE*MTY4NDE3MDkxMC4xLjEuMTY4NDE3Mzc1NC41NS4wLjA.`)
      .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));


    //* mint for a certain amount
    /*
    for (var i = 1; i < NUM_ITEMS; i++) {
      await nftContract.methods
        .mintItem(OWNER_ADDRESS, `https://ipfs.io/ipfs/QmZ13J2TyXTKjjyA46rYENRQYxEKjGtG6qyxUSXwhJZmZt/${i}.json`)
        .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));
    }
    */
  }
  
  catch (e) {
    console.log(e)
  }
}

//invoke
main().then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
