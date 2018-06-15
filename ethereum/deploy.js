const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'mountain other pioneer run forward draw flight hair sudden soul announce loud',
  'https://rinkeby.infura.io/wL3ue2L4eFfk6XNDrrSe'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();

// Attempting to deploy from account 0x813755d5e161452191E926100734005E7Eca734e
// Contract deployed to 0x2d17903D9e4ce79FA86B81D58fbDCE735BB5d67A
