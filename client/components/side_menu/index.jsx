import './style/index.less';

import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import { Link } from 'react-router-dom';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  render() {
    const props = this.props;
    const location = props.location;

    return (
      <div>
        {
          props.configs ?
          <div>
            <Menu
              defaultSelectedKeys={[location.pathname.split('/')[1] || 'home']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              style={{width: 180}}
            >
              {
                props.configs.modules.map(module => {
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
          </div> : null
        }
      </div>
    );
  }
}

module.exports = SideMenu;
