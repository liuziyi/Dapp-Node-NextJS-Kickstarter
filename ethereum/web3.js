import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  // If we're in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // If we're on the server or the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/wL3ue2L4eFfk6XNDrrSe'
  );
  web3 = new Web3(provider);
}

export default web3;
