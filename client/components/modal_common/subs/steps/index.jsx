import React from 'react';
import { Steps, Icon } from 'antd';

const Step = Steps.Step;

class StepsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      icons: props.icons,
      status: props.status || 'process'
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
    let state = this.state,
      props = this.props,
      steps = [],
      __ = props.__;

    steps = props.title.map((t, index) => ({
      title: t,
      content: <div>faskfl</div>
    }));

    return(
      <div>
        <Steps size={props.size || 'large'} progressDot={props.progressDot || false} current={state.current} status={state.status}>
          {
            props.title ? steps.map((step, index) => {
              return <Step key={index} title={step.title}
                icon={state.icons && state.icons[index] ? <Icon type={state.icons[index]} /> : null}
                description={props.description && props.description[index] ? __[props.description[index]] : null} />;
            }) : null
          }
        </Steps>
        <div className="steps-content">{steps[state.current].content}</div>
      </div>
    );
  }
}

export default StepsModal;
