import Web3 from 'web3';
import dotenv from 'dotenv';
import ContractJson from '../contracts/PixelMatrix.json';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
dotenv.config();


export const loadContract = async () => {
  let web3;
  let networkId;
  let contractABI;
  let contractAddress;
  
  for (const network in ContractJson['networks']) {
    networkId = network;
  }

  contractABI = ContractJson['abi'];
  contractAddress = ContractJson['networks'][networkId]['address'];

  if (['1', '4'].includes(networkId)) {
    const alchemyKey = process.env.ALCHEMY_URL;
    web3 = createAlchemyWeb3(alchemyKey);
  } else {
    web3 = new Web3(window.ethereum);
  }

  const instance = new web3.eth.Contract(contractABI, contractAddress);

  return instance;
}