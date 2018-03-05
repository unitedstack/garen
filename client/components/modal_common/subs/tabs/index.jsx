import React from 'react';
import { Tabs} from 'antd';
const TabPane = Tabs.TabPane;

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: props.panes
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(activeKey) {
    this.setState({
      activeKey: activeKey
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

    let className = 'modal-row tab-row';
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
        <Tabs
          defaultActiveKey="1"
          onChange={this.onChange}>
          {state.panes && state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
        </Tabs>
      </div>
    );
  }
}

export default Tab;
