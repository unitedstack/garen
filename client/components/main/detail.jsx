import './style/index.less';
import React from 'react';
import { Link } from 'react-router-dom';
import history from 'client/utils/history';

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  onClose() {
    // let path = router.getPathList();
    // router.pushState('/' + path.slice(0, 2).join('/'));
  }

  render() {
    return (
      <div className="detail-box">
        <Link to={`/${history.getPathList()[0]}`}>关闭</Link>
        <h1>Detail</h1>
      </div>
    );
  }
}

export default Detail;
