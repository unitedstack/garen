import React from 'react';
import { InputNumber } from 'antd';

class InputNumberModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || props.min,
      min: props.min || 0,
      max: props.max,
      disabled: props.disabled || false
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate() {
    this.props.onAction(this.props.field, this.state);
  }

  onChange(value) {
    this.setState({
      value: value
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

  render() {
    let state = this.state,
      props = this.props;

    let className = 'modal-row input-row label-row';

    return (
      <div className={className}>
        <div>{props.label}</div>
        <div>
          <InputNumber
            min={state.min}
            max={state.max}
            step={props.step}
            disabled={state.disabled}
            defaultValue={props.defaultValue}
            onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default InputNumberModal;
