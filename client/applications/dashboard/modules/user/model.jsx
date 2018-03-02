import './style/index.less';

import React from 'react';

class Model extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="garen-module-user">
        <h1><a href="/home" data-type="router" >Current: User, Go to: Home</a></h1>
      </div>
    );
  }

}

module.exports = Model;
