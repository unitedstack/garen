import React from 'react';
import { Switch} from 'antd';

class Switchs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedChildren: props.checkedChildren,
      unCheckedChildren: props.unCheckedChildren,
      disabled: props.disabled,
      loading: props.loading,
      size: props.size,
      checked: props.defaultChecked ? props.defaultChecked : false
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
    let className = 'modal-row switch-row';
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
        <div>
          <Switch defaultChecked={state.checked}
            size={state.size}
            disabled={state.disabled}
            loading={state.loading}
            checkedChildren={state.checkedChildren}
            unCheckedChildren={state.unCheckedChildren}
            checked={state.checked}
            onChange={this.onChange}/>
        </div>
      </div>
    );
  }
}

export default Switchs;
