import './style/index.less';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Table, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import history from 'client/utils/history';
import Detail from './detail';
// import ButtonList from './button_list';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.tableColRender(this.props.config.table.columns);
  }

  state = {
    selectRow: history.getPathList().length > 1
      ? this.props.config.table.data.find(d => d.id === history.getPathList()[1])
      : {}
  };

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.visible) {
  //     return true;
  //   }
  //   return false;
  // }

  tableColRender(columns) {
    columns.map((column) => {
      switch (column.type) {
        case 'captain':
          column.render = (text, row, index) => {
            let formatData = column.formatter && column.formatter(text, row, index);
            if (!formatData) {
              let key = this.props.config.table.dataKey;
              formatData = text ? text : `(${row[key].substr(0, 8)})`;
            }
            return (
              <a className="captain" onClick={this.onClickCaptain.bind(this, row)}>
                {formatData}
              </a>
            );
          };
          break;
        default:
          break;
      }
    });
  }

  onClickCaptain(row, e) {
    e.preventDefault();
    const pathList = history.getPathList();
    // 没有二级路由的时候添加二级路由
    this.setState({
      selectRow: row
    }, () => {
      if(pathList.length < 2 || row.id !== pathList[1]) {
        history.push(`/${pathList[0]}/${row.id}`);
      } else {
        // 有二级路由的时候关闭二级路由
        history.push(`/${pathList[0]}`);
      }
    });
  }

  onChangTabs(key) {
    if(key === history.location.pathname.substring(1)) {
      return;
    }
    history.push(`/${key}`);
  }

  render() {
    const state = this.state,
      props = this.props,
      _config = props.config,
      tabs = _config.tabs,
      // btns = _config.btns,
      table = _config.table,
      columns = table.columns,
      data = table.data,
      detail = table.detail;
    
    const match = props.match;
    
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRowKeys);
      }
    };

    return (
      <div className="halo-com-main">
        <div className="margin-wrapper">
          {tabs ?
            <div className="submenu-tabs">
              <Tabs onTabClick={this.onChangTabs.bind(this)} >
                {
                  tabs.map(tab => <TabPane tab={tab.name} key={tab.key}></TabPane>)
                }
              </Tabs>
            </div> : null
          }
          <div className="operation-list">
            {/* <ButtonList btns={btns} /> */}
            <h1>ButtonList</h1>
          </div>
          <div className="table-box">
            {
              table ? <Table 
                loading={false}
                locale={{emptyText: '暂无数据'}}
                pagination={false}
                columns={columns}
                rowSelection={rowSelection}
                dataSource={data}
              /> : null
            }
          </div>
        </div>
        {
          detail ?
            <Route
              render={({location}) => (
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    classNames="slide"
                    timeout={300}
                  >
                    <Switch location={location}>
                      <Route exact path={`${match.path}/:id`} children={() => (
                        <Detail row={state.selectRow} />
                      )}/>
                      <Route render={() => <span></span>}/>
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          : null
        }
      </div>
    );
  }
}

module.exports = withRouter(Modal);
