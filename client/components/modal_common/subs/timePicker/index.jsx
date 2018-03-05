import React from 'react';
import { TimePicker} from 'antd';

class Time extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allowEmpty: props.allowEmpty,
      disabled: props.disabled,
      use12Hours: props.use12Hours,
      valueString: '00:00:00',
      defaultTime: props.defaultTime
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(time, timeString) {
    this.setState({
      value: time,
      valueString: timeString
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
        <TimePicker
          allowEmpty={state.allowEmpty}
          disabled={state.disabled}
          use12Hours={state.use12Hours}
          defaultOpenValue={state.defaultTime}
          value={state.value}
          valueString={state.valueString}
          onChange={this.onChange}/>
      </div>
    );
  }
}

export default Time;
