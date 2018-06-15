import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignDetails extends Component {

  static async getInitialProps(props){
    // console.log(props.query.address);
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    console.log(summary);

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }
  }

  render(){

    return(
      <Layout>
        <h1>Details</h1>

        <div className="ui grid">
          <div className="four wide column">

            <div className="ui card">
              <div className="content">
                <div className="header" style={{ overflowWrap: 'break-word' }}>{this.props.manager}</div>
                <div className="meta">Address of Manager</div>
                <div className="description">
                  <p>The manager created this campaign and can create requests to withdraw money.</p>
                </div>
              </div>
            </div>

            <div className="ui card">
              <div className="content">
                <div className="header" style={{ overflowWrap: 'break-word' }}>{this.props.minimumContribution}</div>
                <div className="meta">Minimum Contribution (wei)</div>
                <div className="description">
                  <p>You must contribute at least this much wei to become an approver</p>
                </div>
              </div>
            </div>

            <div className="ui card">
              <div className="content">
                <div className="header" style={{ overflowWrap: 'break-word' }}>{this.props.requestsCount}</div>
                <div className="meta">Number of Requests</div>
                <div className="description">
                  <p>A request tries to withdraw money from the contract. Requests must be approved by approvers.</p>
                </div>
              </div>
            </div>

            <div className="ui card">
              <div className="content">
                <div className="header" style={{ overflowWrap: 'break-word' }}>{this.props.approversCount}</div>
                <div className="meta">Number of Approvers</div>
                <div className="description">
                  <p>Number of people who have already donated to this campaign.</p>
                </div>
              </div>
            </div>


            <div className="ui card">
              <div className="content">
                <div className="header" style={{ overflowWrap: 'break-word' }}>{web3.utils.fromWei(this.props.balance, 'ether')}</div>
                <div className="meta">Campaign Balance (ether)</div>
                <div className="description">
                  <p>The balance is how much money this campaign has left to spend.</p>
                </div>
              </div>
            </div>

            <Link route={`/campaigns/${this.props.address}/requests`}>
              <button className="ui button" type="submit">View Requests</button>
            </Link>
          </div>

          <div className="ten wide column">
            <ContributeForm address={this.props.address}/>
          </div>

        </div>

      </Layout>
    )
  }
}

export default CampaignDetails;
