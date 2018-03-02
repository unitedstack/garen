const React = require('react');
import { Transfer} from 'antd';

class Shuttle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: props.mockData,
      targetKeys: props.targetKeys,
      selectedKeys: [],
      showSearch: props.showSearch,
      titles: props.titles
    };

    this.onChange = this.onChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.filterOption = this.filterOption.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onChange(nextTargetKeys, direction, moveKeys) {
    this.setState({ targetKeys: nextTargetKeys });
  }

  onSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  }

  onScroll(direction, e) {
  }

  filterOption(inputValue, option) {
    return option.description.indexOf(inputValue) > -1;
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (let index in this.state) {
      if (this.state[index] !== nextState[index]) {
        return true;
      }
    }
    return false;
  }

  componentDidMount() {
    this.setState({
      titles: this.state.titles.map(item => this.props.__[item])
    });
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
        <div>
          <Transfer
            titles={state.titles}
            showSearch={state.showSearch}
            dataSource={state.mockData}
            targetKeys={state.targetKeys}
            selectedKeys={state.selectedKeys}
            onChange={this.onChange}
            onSelectChange={this.onSelectChange}
            onScroll={this.onScroll}
            filterOption={this.filterOption}
            render={item => item.title}/>
        </div>
      </div>
    );
  }
}

export default Shuttle;
