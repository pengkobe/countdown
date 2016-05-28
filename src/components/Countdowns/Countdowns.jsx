import React, { Component, PropTypes } from 'react';
import { Spin, Button  } from 'antd';
import Countdown from './Countdown';
import AddCountdown from './AddCountdown';
import styles from './Countdowns.less';
import { getAll } from '../../services/Countdowns';

class CountdownsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // 倒计时列表
      list: [],
      loading: false,
    };
  }

  loadCountdowns() {
    this.setState({ loading: true });
    getAll().then(({ jsonResult }) => {
      this.setState({
        list: jsonResult.data,
        loading: false,
      });
    })
  }

  // 状态切换(无用)
  handleToggleComplete = (id) => {
    const newList = this.state.list.map(countdown => {
      if (id === countdown.id) {
        return { ...countdown, isComplete: !countdown.isComplete };
      } else {
        return countdown;
      }
    });
    this.setState({
      list: newList,
    });
  }

componentDidMount() {
  // 云端加载
  this.loadCountdowns();
}

render() {
  const { location } = this.props;
  const { list, loading } = this.state;

  // location.pathname: 当前路径
  const countdowns = filter({ list, loading }, location.pathname);
  return (
    <div>
      <Countdowns countdowns={countdowns} onToggleComplete={this.handleToggleComplete} />
      <AddCountdown  />
    </div>
  );
}
}

const Countdowns = ({ countdowns, onToggleComplete }) => {
  const renderList = () => {
    const { list, loading } = countdowns;
    if (loading) {
      return <Spin />;
    }

    return (
      <div className={styles.list}>
        {list.map(item => <Countdown
          key={item.id}
          data={item}
          onToggleComplete={onToggleComplete.bind(this, item.id) }
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
  const newList = countdowns.list.filter(countdown => {
    if (pathname === '/actived') {
      return !countdown.isComplete;
    }
    if (pathname === '/completed') {
      return countdown.isComplete;
    }
    return true;
  });
  return { ...countdowns, list: newList };
}

export default CountdownsContainer;
