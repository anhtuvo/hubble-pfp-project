/* eslint-disable no-undef */
import logo from '../assets/hubble_logo.png';
import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';

import { handleAccountsChanged, handleChainIdChanged } from '../utils/data';

function App() {
  const [isConnect, setIsConnect] = useState(false);
  const [isAvalancheNetwork, setIsAvalancheNetwork] = useState(false);

  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');

    ethereum.on('accountsChanged', accounts => {
      setIsConnect(handleAccountsChanged(accounts[0]));
    });

    ethereum.on('chainChanged', chainId => {
      setIsAvalancheNetwork(handleChainIdChanged(chainId));
    });

    ethereum.on('disconnect', () => {
      setIsConnect(false);
    });

    if (ethereum.isConnected()) {
      ethereum
        .request({ method: 'eth_chainId' })
        .then(chainId => setIsAvalancheNetwork(handleChainIdChanged(chainId)))
        .catch(err => {
          console.log(err);
        });
    };
  } else {
    console.log('Please install MetaMask!');
  }

  const connectToMetamask = () => {
    ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts) => setIsConnect(handleAccountsChanged(accounts[0])))
      .catch((err) => {
        (err.code === 4001) ? console.log('Please connect to MetaMask.') : console.error(err);
      });
  }

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // let hubble = {};

  // hubble.contract = new ethers.Contract(address, abi, provider);
  // hubble.signedContract = hubble.contract.connect(signer);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isConnect ? (
          <button className="App-button">
            {isAvalancheNetwork ? "Claim" : "Please change to Avalanche network"}
          </button>
        ) : (
          <button
            className="App-button"
            onClick={() => connectToMetamask()}>
            Connect to Metamask
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
