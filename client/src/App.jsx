import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connectWallet, getCurrentWalletConnected } from './utils/connect-wallet';
import { loadContract } from './utils/load-contract';
import styles from './App.module.css';
import Nav from './components/Nav.jsx';
import Home from './components/Home';
import Minter from './components/Minter';

const App = () => {
  const [address, setAddress] = useState('');

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
    } else { }
  }

  useEffect(() => {
    async function getWalletInfo() {
      const { address } = await getCurrentWalletConnected();
      setAddress(() => address);
    }
    getWalletInfo();
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const wallet = await connectWallet();
    setAddress(() => wallet.address);
  };


  return (
    <Router>
      <div className={styles['App']}>
        <Nav 
          address={address}
          connectWallet={connectWalletPressed}
        />
        <Switch>
          <Route exact path="/">
            <Home 
              address={address}
            />
          </Route>
          <Route path="/mint">
            <Minter
              address={address}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
