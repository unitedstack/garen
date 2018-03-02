import './style/index.less';

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    items: this.props.items
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState.items !== nextProps.items ? nextProps : null;
  }

  render() {
    const items = this.state.items;
    return items ?
      <div>
        <Menu
          selectedKeys={items.defaultSelectedKeys}
          defaultOpenKeys={items.defaultOpenKeys}
          mode="inline"
          theme="dark"
          // 禁用Menu的点选功能，完全通过history.listen来操控selectedKeys
          selectable={false}
          style={{width: 180}}
        >
          {
            items.modules.map(module => {
              return !module.title ? module.items.map(item => <Menu.Item key={item}>
                <Link to={`/${item}`}><Icon type="pie-chart" />{item}</Link>
              </Menu.Item>) :
                <SubMenu key={module.title} title={<span><Icon type="mail" /><span>{module.title}</span></span>}>
                  {
                    module.items.map(item => <Menu.Item key={item}>
                      <Link to={`/${item}`}><Icon type="pie-chart" />{item}</Link>
                    </Menu.Item>)
                  }
                </SubMenu>;
            })
          }
        </Menu>
      </div> : null;
  }
}

module.exports = SideMenu;
