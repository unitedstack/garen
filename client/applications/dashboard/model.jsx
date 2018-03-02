import React from 'react';
import SideMenu from 'client/components/side_menu/index';
import { Switch, Route, Redirect } from 'react-router-dom';
// global <a> href delegate
import 'client/utils/router_delegate';
import history from 'client/utils/history';
import loader from './cores/loader';
const configs = loader.configs;

class Model extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    menus: [],
    currentModule: history.getPathList()[0]
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidMount() {
    // listen history for changing side menu selected.
    history.listen(h => {
      this.setState({
        currentModule: history.getPathList()[0]
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!(nextState !== this.state);
  }

  componentWillUpdate() {
    console.time('UDS');
  }

  componentDidUpdate() {
    console.timeEnd('UDS');
  }

  _filterMenu(item) {
    let ret = item;
    configs.routers.some((m) => {
      if (item === m.key) {
        ret = m.link;
        return true;
      }
      return false;
    });
    return ret;
  }

  getMenus() {
    let menus = {};
    menus.defaultOpenKeys = configs.default_openKeys;
    menus.defaultSelectedKeys = [this.state.currentModule];
    menus.modules = configs.modules;

    return menus;
  }

  render() {
    const modules = loader.modules;
    const menus = this.getMenus();

    return (
      <div id="wrapper">
        <div id="navbar">
          <h1 style={{marginLeft: 20, color: '#fff'}}>NAVBAR {this.state.currentModule}</h1>
        </div>
        <div className="main-content">
          <Route children={({ location }) => (
            <div className="halo-com-menu">
              <SideMenu location={location} items={menus}/>
            </div>
          )}/>
          <div id="main-wrapper" className="main-wrapper">
            <div id="main">
              <Switch>
                {
                  Object.keys(modules).map((m, i) => {
                    return <Route key={i} path={`/${m}`} component={modules[m]} />;
                  })
                }
                <Redirect to="/home"/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Model;
