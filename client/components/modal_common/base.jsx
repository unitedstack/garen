const React = require('react');

import { Modal, Button, Alert } from 'antd';

import Steps from './subs/steps/index';
import Cascader from './subs/cascader/index';
import DatePicker from './subs/datePicker/index';
import Input from './subs/input/index';
import InputNumber from './subs/inputNumber/index';
import Radio from './subs/radio/index';
import Select from './subs/select/index';

let refs = {};

class ModalBase extends React.Component {

  constructor(props) {
    super(props);

    this.__ = props.__;

    this.state = {
      disabled: this.props.config.btn.disabled,
      visible: true,
      loading: false,
      errorHide: true
    };

    ['onConfirm', 'onCancel', 'onAction'].forEach(m => {
      this[m] = this[m].bind(this);
    });
    // this.onPop = this.onPop.bind(this);
  }

  onAction(field, state) {
    //console.log(999)
    let that = this;
    
    setTimeout(function() {
      that.props.onAction(field, state, refs);
    }, 0);
  }

  initialize() {
    let props = this.props;

    return props.config.fields.map((m) => {
      m.label = this.__[m.field];
      m.__ = this.__;

      this[m.field] = React.createRef();

      let subComs = {
        'steps': Steps,
        'cascader': Cascader,
        'datePicker': DatePicker,
        'input': Input,
        'textarea': Input,
        'searchInput': Input,
        'groupInput': Input,
        'inputNumber': InputNumber,
        'radio': Radio,
        'select': Select,
        'optionGroup': Select
      };

      let Sub = subComs[m.type];

      return Sub ? <Sub key={m.field} ref={ this[m.field] } {...m} onAction={this.onAction}/> : null;
    });
  }

  componentDidMount() {
    let that = this;
    
    setTimeout(function() {
      that.props.config.fields.forEach(f => refs[f.field] = that[f.field].value);
      that.props.onInitialize && that.props.onInitialize(refs);
    }, 0);
    
  }

  onConfirm() {
    /*this.props.config.fields.forEach((m) => {
      if (m.required && (m.type === 'input' || m.type === 'textarea') && !refs[m.field].state.value && !refs[m.field].state.hide) {
        refs[m.field].setState({
          error: true
        });
        isEmpty = true;
      }
    });
    if (isEmpty) {
      return;
    }

    this.refs.btn.setState({
      disabled: true
    });*/
    this.setState({ loading: true });
    this.props.onConfirm && this.props.onConfirm(refs, (success, errorMessage, scrollToErrorMsg) => {
      if (success) {
        this.setState({
          visible: false
        });
      } else {
        if (errorMessage) {
          this.setState({
            errorMessage: errorMessage,
            errorHide: false
          });
          this.setState({
            loading: false
          });
        }
      }

    });
  }

  // onPop() {
  //   deleteModal({
  //     title: '删除通用弹窗测试',
  //     content: '测试，这是内容区域',
  //     deleteText: '删除',
  //     cancelText: '取消',
  //     onDelete: function(data, cb) {
  //       console.log('触发删除事件:', data);
  //       setTimeout(function() {
  //         cb(true);
  //       }, 1000);
  //     },
  //     parent: this.refs.modal
  //   });
  // }

  onCancel() {
    this.setState({
      visible: false
    });
    this.props.onCancel && this.props.onCancel(refs);
  }

  render() {
    let props = this.props,
      state = this.state,
      __ = this.__;

    let title = props.config.title.map(function(m) {
      return __[m];
    }).join('');

    this.modalRef = React.createRef();

    return (
      <Modal ref={ this.modalRef } title={title} visible={state.visible}
        onOk={this.onConfirm} onCancel={this.onCancel}
        footer={[
          <Button key="confirm" type="primary" loading={state.loading} onClick={this.onConfirm}>{__.confirm}</Button>,
          <Button key="cancel" onClick={this.onCancel}>{__.cancel}</Button>
        ]}>
        { this.initialize() }
        <Alert showIcon message={state.errorMessage} className={state.errorHide ? 'hide' : ''} type="error" />
      </Modal>
    );
  }
}

module.exports = ModalBase;
