import Web3 from 'web3';

export const loadContract = async (contractJson) => {
  // #TODO - check for the network
  const web3 = new Web3(window.ethereum);

  // Get the contract instance.
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const instance = new web3.eth.Contract(
    contractJson.abi,
    deployedNetwork && deployedNetwork.address,
  );

  return instance;
}