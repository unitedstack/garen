import './style/index.less';

import ReactDOM from 'react-dom';
import React from 'react';
import Model from './model';
import { Router } from 'react-router-dom';
import __  from 'locale/client/dashboard.lang.json';
import history from 'client/utils/history';

// for init
const pathList = history.getPathList();
// 判断isPathValid
if(pathList.length < 1) {
  history.push('/home');
}

ReactDOM.render(
  <Router history={history}>
    <Model __={__} />
  </Router>,
  document.getElementById('container')
);
