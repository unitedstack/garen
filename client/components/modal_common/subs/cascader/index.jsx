// Cascader 级连选择

import React from 'react';
import { Cascader } from 'antd';

class CascaderModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data || [],
      value: [],
      hide: props.hide || false
    };

    this.onChange = this.onChange.bind(this);
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

  componentDidUpdate() {
    this.convertLang(this.props.__, this.state.data);
    this.props.onAction(this.props.field, this.state);
  }

  getLangValue(lang, obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      let strs = '';
      obj.forEach((str) => {
        strs += lang[str];
      });

      return strs;
    } else {
      return obj;
    }
  }

  convertLang(lang, options) {
    options.forEach((opt) => {
      opt.label = this.getLangValue(lang, opt.label);
      if (opt.children) {
        this.convertLang(lang, opt.children);
      }
    });
  }

  render() {
    let props = this.props,
      state = this.state,
      __ = props.__;

    let className = 'modal-row input-row label-row';
    if (this.state.hide) {
      className += ' hide';
    }

    return <div className={className}>
      <div>{props.label}</div>
      <div>
        <Cascader options={state.data} onChange={this.onChange} placeholder={__[props.placeholder]} />
      </div>
    </div>;
  }
}

export default CascaderModal;
