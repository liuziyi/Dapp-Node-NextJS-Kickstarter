import React, { Component } from 'react';
import factory from '../ethereum/factory';

import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    // this will retrieve an array of the addresses of all of the deployed campaigns
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    // this object will be provided to the component as props
    return { campaigns };
  }

  renderCampaigns(){
    const items = this.props.campaigns.map(campaign => {
      return(
        <div className="ui card" key={campaign}>
          <div className="content">
            <div className="header" style={{ overflowWrap: 'break-word' }}>{campaign}</div>
          </div>
          <div className="extra content">
            <Link route={`/campaigns/${campaign}`}>
              <button className="ui button">View Campaign</button>
            </Link>
          </div>
        </div>
      )
    });

    return items;
  }

  render(){
    return(
      <Layout>
        <div>
          <h1>List of Campaigns</h1>
          {this.renderCampaigns()}
        </div>
      </Layout>
    )
  }

}

export default CampaignIndex;
