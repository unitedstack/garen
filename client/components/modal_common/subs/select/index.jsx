import React from 'react';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

class SelectModal extends React.Component {
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

  initialize(props, state) {
    switch(props.type) {
      case 'select':
        return state.data.map((d, index) => <Option key={d.id} value={d.id}>{d.name || '(' + d.id.substring(0, 8) + ')'}</Option>);
      case 'optionGroup':
        return state.data.map((opt, index) =>
          <OptGroup key={opt.id} label={opt.name}>
            {
              opt.children && opt.children.map(child => <Option key={child.id} value={child.id}>{child.name || '(' + child.id.substring(0, 8) + ')'}</Option>)
            }
          </OptGroup>
        );
      default:
        break;
    }
  }

  render() {
    let state = this.state,
      props = this.props,
      styleWidth = { width: props.width };

    let className = 'modal-row select-row label-row';

    return(
      <div className={className}>
        <div>{props.label}</div>
        <div>
          <Select value={state.value} style={styleWidth} disabled={state.disabled} onChange={this.onChange}>
            { state.data && this.initialize(props, state) }
          </Select>
        </div>
      </div>
    );
  }
}

export default SelectModal;
