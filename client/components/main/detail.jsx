import './style/index.less';
import React from 'react';
import { Link } from 'react-router-dom';
import history from 'client/utils/history';

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return (
      <div className="detail-box">
        <Link to={`/${history.getPathList()[0]}`}>关闭</Link>
        <h1>Detail</h1>
        {
          Object.keys(props.row).map((r, i) => <div key={i}>{`${r}: ${props.row[r]}`}</div>)
        }
      </div>
    );
  }
}

export default Detail;
