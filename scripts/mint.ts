import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { SignedTransaction } from 'web3-core';

const contract = require('../artifacts/contracts/NiftyHair.sol/NiftyHair.json');

const ALCHEMY_API_URL:string = process.env.ALCHEMY_API_URL!;
const ROPSTEN_PUBLIC_KEY:string = process.env.ROPSTEN_PUBLIC_KEY!;
const ROPSTEN_PRIVATE_KEY:string = process.env.ROPSTEN_PRIVATE_KEY!;

const web3 = createAlchemyWeb3(ALCHEMY_API_URL);
const contractAddress = '0xcfb1E2766202d7cd8B2A6EB1Dc47a2bD2E4c02dc';
const nfthContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFTH(tokenUri: string) {
  // to prevent replay attacks from same address, get latest nonce
  const nonce = await web3.eth.getTransactionCount(ROPSTEN_PUBLIC_KEY, 'latest');
  const tx = {
    'from': ROPSTEN_PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'data': nfthContract.methods.mintNFTH(ROPSTEN_PUBLIC_KEY, tokenUri).encodeABI(), 
  };

  try {
    const signedTx: SignedTransaction = await web3.eth.accounts.signTransaction(tx, ROPSTEN_PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction as string, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  } catch (error) {
    console.log('Sign transaction failed:', error);
  }
}

// mintNFTH('https://gateway.pinata.cloud/ipfs/Qmcmd4Pph4R4CCT1JBbohXdMeBWboeMMpanimtFSAwMgnp');
