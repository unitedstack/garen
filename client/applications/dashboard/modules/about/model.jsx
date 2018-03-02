import './style/index.less';

import React from 'react';
import {Button} from 'antd';
import createModal from './pop/create/index';

class Model extends React.Component {

  constructor(props) {
    super(props);

    ['onAction'].forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  onAction() {
    createModal();
  }

  render() {
    return (
      <div className="garen-module-about">
        <h1>About</h1>
        <Button type="primary" onClick={this.onAction}>Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
      </div>
    );
  }

}

module.exports = Model;
