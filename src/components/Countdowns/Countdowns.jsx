import React, { Component, PropTypes } from 'react';
import { Spin, Modal ,Button  } from 'antd';
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
      visible: false,
    };
    this.showModal.bind(this);
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
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel() {
    this.setState({ visible: false });
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
      <Button type="primary" onClick={this.showModal.bind(this)}>
        添加计时器
      </Button>
      <Countdowns countdowns={countdowns} onToggleComplete={this.handleToggleComplete} />
      <Modal ref="modal"
        visible={this.state.visible}
        title="添加计时器" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
        footer={[
          <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>返 回</Button>,
          <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
            提 交
          </Button>,
        ]}>
        <AddCountdown />
      </Modal>
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
