import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

class RadioModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: props.disabled || false,
      value: props.value,
      data: props.data
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate() {
    this.props.onAction(this.props.field, this.state);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
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
      props = this.props,
      className = 'modal-row input-row label-row';

    return (
      <div className={className}>
        <div>{props.label}</div>
        <div>
          <RadioGroup disabled={state.disabled} onChange={this.onChange} value={this.state.value}>
            {
              state.data && state.data.map((d, index) => <Radio key={d.id} value={d.id}>{d.name || '(' + d.id.substring(0, 8) + ')'}</Radio>)
            }
          </RadioGroup>
        </div>
      </div>
    );
  }
}

export default RadioModal;
