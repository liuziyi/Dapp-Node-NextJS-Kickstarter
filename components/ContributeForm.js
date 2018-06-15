import React, { Component } from 'react';

import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address); // the actual contract instance

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      // Refresh the page
      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });

  }

  render(){
    const errorMessage = this.state.errorMessage ? (
      <div className="ui warning message">
        <i className="close icon"></i>
        <div className="header">
          Opps, something went wrong!
        </div>
        {this.state.errorMessage}
      </div>
    ) : (<div></div>)

    const button = this.state.loading ? (
      <button className="ui button loading" type="submit">Create</button>
    ) : (<button className="ui button" type="submit">Create</button>)

    return(
      <div>
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>Amount to Contribute (in ether)</label>
            <input
              type="text"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          {button}
        </form>
        {errorMessage}
      </div>
    )
  }
}

export default ContributeForm;
