const React = require('react');
import { Tooltip, Button} from 'antd';

class ToolTip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrowPointAtCenter: props.arrowPointAtCenter,
      placement: props.placement
    };
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
        <Tooltip 
          placement={state.placement}
          arrowPointAtCenter={state.arrowPointAtCenter}
          title={props.__[props.title]}>
          <Button>{props.__[props.text]}</Button>
        </Tooltip>
      </div>
    );
  }
}

export default ToolTip;
