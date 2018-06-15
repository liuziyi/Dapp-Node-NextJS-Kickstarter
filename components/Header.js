import React from 'react';

import { Link } from '../routes';

export default () => {
  return (
    <div className="ui menu" style={{ marginTop: '20px' }}>
      <Link route="/">
        <a className="item">Kickstart</a>
      </Link>
      <div className="right menu">
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </div>
    </div>
  )
}
