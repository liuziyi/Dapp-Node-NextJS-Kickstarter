import React from 'react';
import Head from 'next/head';
import Header from './Header';

export default (props) => {
  return (
    <div className="ui container">
      <Head>
        <title>Kickstart</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"/>
      </Head>
      <Header/>
      {props.children}
    </div>
  )
}
