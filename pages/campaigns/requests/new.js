import React, { Component } from 'react';

import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: ''
  }

  static async getInitialProps(props){
    return { address: props.query.address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        this.state.description,
        web3.utils.toWei(this.state.value, 'ether'),
        this.state.recipient
      ).send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {

    }
  }

  render(){
    return(
      <Layout>
        <h1>Create a New Reqest</h1>
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </div>
          <div className="field">
            <label>Value in Ether</label>
            <input
              type="text"
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <div className="field">
            <label>Recipient</label>
            <input
              type="text"
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            />
          </div>
          <button className="ui button" type="submit">Create</button>
        </form>
      </Layout>
    )
  }
}

export default RequestNew;
