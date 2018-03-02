import './style/index.less';

import React from 'react';

import Main from 'client/components/main/index';

import config from './config.json';

class Model extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    config: config
  };

  componentWillMount() {

  }

  componentDidMount() {

  }

  

  render() {
    const state = this.state;
    return (
      <div className="garen-module-home">
        <Main
          config={state.config}
        />
      </div>
    );
  }

}

module.exports = Model;
