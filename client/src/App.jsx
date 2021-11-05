import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import PixelPizzlesContract from './contracts/PixelPizzles.json';
import { connectWallet, getCurrentWalletConnected } from './utils/connect-wallet';
import { loadContract } from './utils/load-contract';
import styles from './App.module.css';

const App = () => {
  const [price, setPrice] = useState('-');
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);

  // listeners
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAddress(() => accounts[0]);
        } else {
          setAddress('');
        }
      });
    } else { } // threathen the broweser :)
  }

  useEffect(() => {
    async function getWalletInfo() {
      const { address } = await getCurrentWalletConnected();
      const instance = await loadContract(PixelPizzlesContract);
      setAddress(() => address);
      setContract(() => instance);
    }
    getWalletInfo();
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const wallet = await connectWallet();
    const instance = await loadContract(PixelPizzlesContract);

    setAddress(() => wallet.address);
    setContract(() => instance);
  };

  const runExample = async () => {
    // Get the value from the contract to prove it worked.
    const price = await contract.methods.getPrice().call({ from: address });

    // Update state with the result.
    setPrice(() => Web3.utils.fromWei(price, 'ether'));
  };

  return (
    <div className={styles['App']}>
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show
        a NFT price of 0.01 ether (by default).
      </p>
      <button
        onClick={async(e) => {
          e.preventDefault();
          await connectWalletPressed();
        }}>
        connect wallet
      </button>
      <button
        onClick={async(e) => {
          e.preventDefault();
          await runExample();
        }}>
        test contract
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log({ address });
        }}>
        log address
      </button>
      <br />
      <div>The stored price is: {price} ether.</div>
    </div>
  );
}

export default App;
