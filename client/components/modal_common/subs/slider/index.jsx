import React from 'react';
import { Slider, InputNumber} from 'antd';

class Slide extends React.Component {
  constructor(props) {
    super(props);

    let initValue = props.value ? props.value : props.min;
    this.state = {
      value: initValue,
      inputValue: initValue,
      min: props.min,
      max: props.max,
      hide: !!props.hide,
      disabled: props.disabled ? props.disabled : false,
      error: false,
      eventType: null,
      text: props.text
    };

    this.onSliderChange = this.onSliderChange.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onChange(value) {
    this.setState({
      inputValue: value
    });
  }

  onSliderChange(value) {
    this.setState({
      inputValue: value
    });
  }

  render() {
    let props = this.props,
      state = this.state,
      min = state.min,
      max = state.max,
      disabled = state.disabled;

    let className = 'modal-row slider-row';
    if (props.is_long_label) {
      className += ' label-row long-label-row';
    } else {
      className += ' label-row';
    }
    if (state.hide) {
      className += ' hide';
    }

    return (
      <div className={className}>
        <div>
          {props.label}
        </div>
        <div className="slidearea">
          <Slider min={min} max={max} step={props.step} disabled={disabled} value={state.inputValue} onChange={this.onSliderChange} style={{width: '320px'}} />
          <InputNumber
            min={min}
            max={max}
            style={{ marginLeft: 12 }}
            value={this.state.inputValue}
            onChange={this.onChange}
          />
          <div className="range">{state.text ? state.text : (min + '-' + max + props.unit)}</div>
        </div>
      </div>
    );
  }
}

export default Slide;
