import React from 'react';
import { Input, Select, AutoComplete, Tooltip } from 'antd';

const { TextArea, Search } = Input;
const Option = Select.Option;

const InputGroup = Input.Group; 

class InputModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: props.hide,
      value: '',
      groupInput: props.defaultValue || (props.data && props.data[0])
    };
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

  onChange(type) {
    let inputValue = null;
    switch(type) {
      case 'input':
        inputValue = this[type].input.value;
        break;
      case 'textarea':
        inputValue = this[type].textAreaRef.value;
        break;
      case 'searchInput':
        inputValue = this[type].input.input.value;
    }

    this.setState({
      value: inputValue
    });
  }

  //input: this.inputRef.input.value
  //textArea: this.inputRef.textAreaRef.value
  //search: this.inputRef.input.input.value
  //search.enterButton: 可选值(true, false(默认), 任意字符串(比如Search))
  //size: 指高度

  initialize(props) {
    let styleWidth = { width: props.width };

    switch(props.type) {
      case 'input':
        return <Tooltip
          trigger={['focus']}
          title={props.__[props.tipTitle]}
          placement="topLeft"
          overlayClassName="numeric-input">
          <Input style={styleWidth}
            ref={ input => this[props.type] = input}
            placeholder={props.__[props.placeholder]}
            onChange={this.onChange.bind(this, props.type)}/>
        </Tooltip>;
      case 'textarea':
        return <TextArea style={styleWidth}
          rows={props.rows || 4}
          ref={ input => this[props.type] = input}
          onChange={this.onChange.bind(this, props.type)}/>;
      case 'searchInput':
        return <Search
          style={styleWidth}
          ref={ input => this[props.type] = input}
          placeholder={props.__[props.placeholder]}
          enterButton={props.enterButton || false}
          onSearch={this.onChange.bind(this, props.type)} />;
      case 'groupInput':
        return <InputGroup>
          <Select
            defaultValue={props.__[props.defaultValue] || props.__[props.data[0]]}
            onChange={this.selectChange.bind(this)}>
            {
              props.data && props.data.map((dt, index) => <Option key={index} value={dt}>{props.__[dt]}</Option>)
            }
          </Select>
          <AutoComplete
            style={styleWidth}
            onChange={this.handleChange.bind(this)}
            placeholder={props.__[props.placeholder]}
          />
        </InputGroup>;
      default:
        break;
    }
  }

  selectChange(value) {
    this.setState({
      groupInput: value
    });
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  render() {
    let props = this.props,
      state = this.state,
      className = 'modal-row label-row';

    if (props.type === 'textarea') {
      className += ' textarea-row';
    } else {
      className += ' input-row';
    }

    className += state.hide ? ' hide' : '';

    return <div className={ className }>
      <div>{props.label}</div>
      <div>{this.initialize(props)}</div>
    </div>;
  }
}

export default InputModal;
