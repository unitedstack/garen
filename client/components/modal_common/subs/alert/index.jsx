import React from 'react';
import { Alert } from 'antd';

class Error extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: !!props.hide
    };

    this.isProps = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.hide !== nextState.hide) {
      this.isProps = false;
    }

    if (this.state.hide === nextProps.hide ) {
      return false;
    }
    return true;
  }

  render() {
    let props = this.props,
      className = 'modal-row';

    if (this.isProps) {
      className += this.props.hide ? ' hide' : '';
    } else {
      className += this.state.hide ? ' hide' : '';
    }

    let type = props.tip_type;

    return (
      <div className={className}>
        <Alert type={type}
          message={props.message}
          showIcon
          style={{width: '466px'}} />
      </div>
    );
  }
}

export default Error;
