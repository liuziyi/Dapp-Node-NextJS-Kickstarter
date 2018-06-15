import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x2d17903D9e4ce79FA86B81D58fbDCE735BB5d67A'
);

export default instance;
