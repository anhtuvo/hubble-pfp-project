/* eslint-disable no-undef */
import logo from '../assets/hubble_logo_and_text.svg';
import mainImage from '../assets/hubble_cat_and_pangolin.jpg';

import 'bootstrap/dist/css/bootstrap.css';
import css from './App.module.css';

import { useState } from 'react';
import classNames from 'classnames';

import { ethers } from 'ethers';
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
    <div className={css.app}>
      <div className={css.headerSection}>
        <div className={classNames(css.headerContainer, 'container')}>
          <img src={logo} alt="logo" />

          {isConnect ? (
            <button className={css.metamaskBtn}>
              {isAvalancheNetwork ? "Connected" : "Please change to Avalanche network"}
            </button>
          ) : (
            <button
              className={css.metamaskBtn}
              onClick={() => connectToMetamask()}>
              Connect to Metamask
            </button>
          )}
        </div>
        <div className={classNames(css.descriptionContainer, 'container')}>
            <div className={css.description}>
              Deep dive to the galaxy and magical things with your Hubble Space Cat 
            </div>
        </div>
      </div>
      <div className={classNames(css.contentSection, 'container')}>
        <div className={css.contentBasic}>
          <h2>What are Hubble Space Cat?</h2>
          <p>Hubble Space Cat is a collection of programmatically generated random NFTs on the Avalanche blockchain.</p> 
          <p>Each Space Cat are unique and stored as ERC-721 tokens on the Avalanche blockchain and hosted on IPFS.</p>
        </div>
        <div className={css.contentImages}>
          <img src={mainImage} className={css.mainImage} alt="spaceCat" />
        </div>
      </div>
    </div>
  );
}

export default App;
