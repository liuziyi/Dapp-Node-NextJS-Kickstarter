import React, { Component } from 'react';

import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });

        Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
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

    return (
      <Layout>
        <h1>Create a New Campaign</h1>
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>Minimum Contribution (in wei)</label>
            <input
              type="text"
              value={this.state.minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })}
            />
          </div>
          {button}
        </form>
        {errorMessage}
      </Layout>
    )
  }
}

export default CampaignNew;
