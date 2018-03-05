import React from 'react';
import { Upload, Button, Icon} from 'antd';

class Uploading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      action: props.action
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(checked) {
    this.setState({
      checked: checked
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (let index in this.state) {
      if (this.state[index] !== nextState[index]) {
        return true;
      }
    }
    return false;
  }

  componentDidUpdate() {
    this.props.onAction(this.props.field, this.state);
  }

  render() {
    let props = this.props,
      state = this.state;
    let className = 'modal-row input-row';
    if (props.is_long_label) {
      className += ' label-row long-label-row';
    } else {
      className += ' label-row';
    }
    if (this.state.hide) {
      className += ' hide';
    }

    return (
      <div className={className}>
        <div>
          {props.label}
        </div>
        <Upload {...props}
          action={state.action}>
          <Button>
            <Icon type="upload"/>上传
          </Button>
        </Upload>
      </div>
    );
  }
}

export default Uploading;
