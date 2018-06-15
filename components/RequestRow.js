import React, { Component } from 'react';

import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  render(){
    const readyToFinalize = this.props.request.approvalCount > this.props.approversCount / 2;

    return (
        this.props.request.complete ? (
          <tr className="disabled">
            <td>{this.props.id}</td>
            <td>{this.props.request.description}</td>
            <td>{web3.utils.fromWei(this.props.request.value, 'ether')}</td>
            <td>{this.props.request.recipient}</td>
            <td>{this.props.request.approvalCount}/{this.props.approversCount}</td>
            <td>
              {
                this.props.request.complete ? null : (
                  <button className="ui positive basic button" onClick={this.onApprove}>
                    Approve
                  </button>
                )
              }
            </td>
            <td>
              {
                this.props.request.complete ? null : (
                  <button className="ui primary basic button" onClick={this.onFinalize}>
                    Finalize
                  </button>
                )
              }
            </td>
          </tr>
        ) : (
          <tr>
            <td>{this.props.id}</td>
            <td>{this.props.request.description}</td>
            <td>{web3.utils.fromWei(this.props.request.value, 'ether')}</td>
            <td>{this.props.request.recipient}</td>
            <td>{this.props.request.approvalCount}/{this.props.approversCount}</td>
            <td>
              {
                this.props.request.complete ? null : (
                  <button className="ui positive basic button" onClick={this.onApprove}>
                    Approve
                  </button>
                )
              }
            </td>
            <td>
              {
                this.props.request.complete ? null : (
                  <button className="ui primary basic button" onClick={this.onFinalize}>
                    Finalize
                  </button>
                )
              }
            </td>
          </tr>
        )
    )
  }
}

export default RequestRow;
