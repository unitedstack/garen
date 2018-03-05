import './style/index.less';

import React from 'react';
import { Button, Dropdown, Menu, Icon } from 'antd';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btns: {}
    };
  }

  formateBtns(btns) {
    let formatedBtns = {};

    let traverseChildren = (item, arr = []) => {
      let newArr = arr;
      if (item.children) {
        item.children.forEach((child) => {
          child.items.forEach((ele) => {
            arr = traverseChildren(ele, []);
            newArr.push(ele);
          });
        });
      }
      return newArr;
    };

    btns.forEach((btn) => {
      if (btn.dropdown) {
        btn.dropdown.items.forEach((item) => {
          item.items.forEach((_item) => {
            _item.type = 'dropdown';
            formatedBtns[_item.key] = _item;
            traverseChildren(_item).forEach((ele) => {
              formatedBtns[ele.key] = ele;
            });
          });
        });
      } else {
        formatedBtns[btn.key] = btn;
      }
    });

    this.setState({
      btns: formatedBtns
    });
  }

  onClickDropdownBtn(e, item) {
    this.props.onAction('btnList', 'click', {
      key: item.key
    });
  }

  onClickBtnList(e, key) {
    this.props.onAction('btnList', 'click', {
      key: key
    });
  }

  render() {
    let btns = this.props.btns;

    return (
      <div className="btn-list">
        {
          btns.map(btn => {
            if(btn.dropdown) {
              const menu = (
                <Menu>
                  <Menu.item key={btn.key}>{btn.value}</Menu.item>
                </Menu>
              );
              return <Dropdown overlay={menu}>
                <Button>
                  {btn.value[0]} <Icon type="down" />
                </Button>
              </Dropdown>;
            }
          })
        }
      </div>
    );
  }
}

module.exports = Detail;
