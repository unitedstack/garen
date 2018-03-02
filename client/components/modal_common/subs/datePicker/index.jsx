import React from 'react';
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class DatePickerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(date, dateString) {
    this.setState({
      value: date,
      dateString: dateString
    });
  }

  componentDidUpdate() {
    this.props.onAction(this.props.field, this.state);
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
    let props = this.props,
      state = this.state;
    //datePicker, monthPicker, RangePicker, weekPicker
    //showTime: rangePicker和datePicker生效

    let className = 'modal-row input-row label-row';

    let subComs = {
      'monthPicker': MonthPicker,
      'rangePicker': RangePicker,
      'weekPicker': WeekPicker,
      'datePicker': DatePicker
    };

    let Sub = subComs[props.pickerType];
    return <div className={className}>
      <div>{props.label}</div>
      <div>
        {
          Sub ? <Sub
            {...props}
            key={props.field}
            value={state.value}
            onChange={this.onChange}/> : null
        }
      </div>
    </div>;
  }
}

export default DatePickerModal;
