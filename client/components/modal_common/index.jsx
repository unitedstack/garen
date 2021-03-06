require('./style/index.less');

import React from 'react';
import ReactDOM from 'react-dom';
import Base from './base';

function modal(props) {

  let container = null;

  (function() {
    let doc = document,
      root = doc.getElementById('modal-container');

    if (!root) {
      root = doc.createElement('div');
      root.id = 'modal-container';

      doc.body.appendChild(root);
    }

    if(props.destroyPrevious && root.childNodes.length > 1) {
      let previousModal = root.lastChild;
      previousModal.parentNode.removeChild(previousModal);
    }

    container = doc.createElement('div');
    root.appendChild(container);
  })();

  function destory() {
    ReactDOM.unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
  }

  function onAfterClose() {
    destory();
  }

  let _props = Object.assign({}, props, {
    onAfterClose: onAfterClose
  });

  return ReactDOM.render(<Base {..._props}/>, container);
}

export default modal;
