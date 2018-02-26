import React from 'react';
import SideMenu from 'client/components/side_menu/index';
import { Switch, Route, Redirect } from 'react-router-dom';
import loader from './cores/loader';
const configs = loader.configs;

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillUpdate() {
    console.time('UDS');
  }

  componentDidUpdate() {
    console.timeEnd('UDS');
  }

  render() {
    const modules = loader.modules;
    return (
      <div id="wrapper">
        <Route children={({ location }) => (
          <div className="halo-com-menu">
            <SideMenu location={location} configs={configs}/>
          </div>
        )}/>
        <div className="main-wrapper">
          <Switch>
            {
              Object.keys(modules).map((m, i) => {
                return <Route key={i} path={`/${m}`} component={modules[m]} />;
              })
            }
            <Redirect exact from="/" to="/home"/>
          </Switch>
        </div>
      </div>
    );
  }

}

module.exports = Model;
