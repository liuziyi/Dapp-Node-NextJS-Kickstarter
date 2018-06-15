import React, { Component } from 'react';

import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  static async getInitialProps(props){
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call();
      })
    );

    // console.log(requests);

    return { address, requests, requestCount, approversCount };
  }

  renderRows(){
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render(){
    return(
      <Layout>
        <h1>List of Requests</h1>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a><button className="ui button right floated" style={{ marginBottom: 10 }}>Add Request</button></a>
        </Link>
        <table className="ui celled table">
          <thead>
            <th>ID</th>
            <th>Description</th>
            <th>Amount (ether)</th>
            <th>Recipient</th>
            <th>Approval Count</th>
            <th>Approve</th>
            <th>Finalize</th>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <div>Total requests: {this.props.requestCount} </div>
      </Layout>
    )
  }
}

export default RequestIndex;
