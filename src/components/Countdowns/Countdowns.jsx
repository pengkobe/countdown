import React, { Component, PropTypes } from 'react';
import { Spin, Button, Menu, Icon, Calendar   } from 'antd';
import Countdown from './Countdown';
import AddCountdown from './AddCountdown';
import styles from './Countdowns.less';
import classnames from 'classnames';
import { getCountdowns, deleteCountdown } from '../../services/Countdowns';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class CountdownsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // 倒计时列表
      list: [],
      loading: false,
      current: 'firstPage'
    };
  }
  // 加载countdown
  loadCountdowns() {
    this.setState({ loading: true });
    getCountdowns("").then(({ jsonResult }) => {
      this.setState({
        list: jsonResult.data,
        countdowns: null,
        loading: false,
      });
    })
  }
  // 添加countdown
  handleAdd = (model) => {
    let newList = this.state.list.map(cd => {
      return cd;
    });
    newList.unshift(model);
    newList = newList.sort(function (a, b) {
      let c = new Date(a.endtime).getTime();
      let d = new Date(b.endtime).getTime();
      return (c - d);
    });
    this.setState({
      list: newList,
    });
    const loading = this.state.loading;
    const list = newList;
    if (this.state.current == "completed") {
      let countdowns = filter({ list, loading }, 'completed');
      this.setState({
        countdowns: countdowns,
      });
    } else if (this.state.current == "firstPage") {
      let countdowns = filter({ list, loading }, 'firstPage');
      this.setState({
        countdowns: countdowns,
      });
    }
  }

  // 删除countdown
  handleDelete = (_id) => {
    const newList = [];
    this.state.list.map(cd => {
      if (_id === cd._id) {
        deleteCountdown(cd._id);
        // return { ...cd, isPrivate: !cd.isPrivate };
      } else {
        newList.push(cd);
        return cd;
      }
    });
    this.setState({
      list: newList,
    });
    const loading = this.state.loading;
    const list = newList;
    if (this.state.current == "completed") {
      let countdowns = filter({ list, loading }, 'completed');
      this.setState({
        countdowns: countdowns,
      });
    } else if (this.state.current == "firstPage") {
      let countdowns = filter({ list, loading }, 'firstPage');
      this.setState({
        countdowns: countdowns,
      });
    }
  }

  // 日历点击事件
  onPanelChange(value, mode) {
    console.log(value, mode);
  }

  getListData(value) {
    let dataList = this.state.list;
    let listLen = dataList.length;

    let nowDay = value.getDayOfMonth();
    let nowyear = value.getYear();// || value.getFullYear();
    let nowmonth = value.getMonth() + 1;

    let listData = [];
    for (let i = 0; i < listLen; i++) {
      let li = dataList[i]
      if (!li) {
        continue;
      }
      let endtime = new Date(li.endtime);
      let fullyear = endtime.getFullYear();
      let month = endtime.getMonth() + 1;
      let day = endtime.getDate();
      if (day == nowDay && month == nowmonth && fullyear == nowyear) {
        listData.push({ type: 'warning', content: li.event });
      }
    }
    return listData || [];
  }

  /**
   * 渲染日历视图：日
   */
  dateCellRender(value) {
    let listData = this.getListData(value);
    return (
      <ul className="{styles.c_events}">
        {
          listData.map((item, index) =>
            <li key={index}>
              <span className={`styles.c_event-${item.type}`}>●</span>
              {item.content}
            </li>
          )
        }
      </ul>
    );
  }
  // 月份视图显示
  getMonthData(value) {
    if (value.getMonth() === 8) {
      return 1394;
    }
  }
  monthCellRender(value) {
    let num = this.getMonthData(value);
    return num ? <div className="notes-month">
      <section>{num}</section>
      <span>待办事项数</span>
    </div> : null;
  }

  // 菜单切换
  handleClick(e) {
    this.setState({
      current: e.key,
    });
    if (e.key == "completed") {
      const {list, loading} = this.state;
      let countdowns = filter({ list, loading }, 'completed');
      this.setState({
        countdowns: countdowns,
      });
    } else if (e.key == "firstPage") {
      const {list, loading} = this.state;
      let countdowns = filter({ list, loading }, 'firstPage');
      this.setState({
        countdowns: countdowns,
      });
    }
  }

  componentDidMount() {
    // 云端加载
    this.loadCountdowns();
  }

  render() {
    const { location } = this.props;
    const { list, loading, current} = this.state;
    if (!this.state.countdowns) {
      this.state.countdowns = filter({ list, loading }, location.pathname);
    }
    // 过滤器
    const countdownsCls = classnames({
      [styles.countdowns]: true,
      [styles.invisible]: current != 'firstPage' && current != 'completed'
    });
    const calendarCls = classnames({
      [styles.invisible]: current != 'calendarView'
    });
    return (
      <div>
        <AddCountdown onAdd={this.handleAdd.bind(this) } />
        <Menu
          onClick={this.handleClick.bind(this) }
          selectedKeys={[this.state.current]}
          mode="horizontal">
          <Menu.Item key="firstPage">
            <Icon type="home" />首页
          </Menu.Item>
          <Menu.Item key="completed" >
            <Icon type="calendar" />已完成
          </Menu.Item>
          <Menu.Item key="calendarView" >
            <Icon type="calendar" />日历
          </Menu.Item>
        </Menu>
        <div className={countdownsCls}>
          <Countdowns
            countdowns={this.state.countdowns}
            onDelete={this.handleDelete.bind(this) } />
        </div>
        <Calendar
          className={calendarCls}
          dateCellRender={this.dateCellRender.bind(this) }
          monthCellRender={this.monthCellRender.bind(this) }
          onPanelChange={this.onPanelChange.bind(this) } />
      </div>
    );
  }
}

const Countdowns = ({ countdowns, onDelete}) => {
  const renderList = () => {
    const { list, loading } = countdowns;
    if (loading) {
      return <Spin />;
    }

    return (
      <div className={styles.list}>
        {list.map(item =>
          <Countdown key={item._id} data={item}
            onDelete={onDelete.bind(this, item._id) }
            />
        ) }
      </div>
    );
  };

  return (
    <div className={styles.normal}>
      {renderList() }
    </div>
  );
};

Countdowns.propTypes = {};

/* 过滤器，按日期/级别过滤 */
function filter(countdowns, pathname) {
  if (!(countdowns.list instanceof Array)) {
    return { ...countdowns, list: [] };
  }
  const newList = countdowns.list.filter(countdown => {
    if (!countdown) {
      return false;
    }
    let begin = new Date();
    let end = new Date(countdown.endtime);

    if (pathname === '/actived') {
      return !countdown.isComplete;
    }
    if (pathname === 'completed') {
      if (end.getTime() < begin.getTime()) {
        return true;
      } else {
        return false;
      }
    }
    if (end.getTime() < begin.getTime()) {
      return false;
    } else {
      return true;
    }
  });

  return { ...countdowns, list: newList };
}

export default CountdownsContainer;
