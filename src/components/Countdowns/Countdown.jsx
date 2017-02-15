import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Countdown.less';
import { Checkbox, Rate, Button } from 'antd';

class Countdown extends Component {

  constructor(props) {
    super(props);
    const { begintime, endtime, _id} = this.props.data;
    let end = new Date(endtime);
    let begin = new Date();
    let timestr = timeSub(begin, end);
    // 这里无须格式化，本身可以计算精确到秒
    // let timestr = timeSub(begin, formatTime(end)); 
    this.state = {
      timestr: timestr,
      end: end,
      _id: _id,
      intervalID: 0,
      isComplete:false
    };
  }

  componentDidMount() {
    let begin = new Date();
    let end = this.state.end;
    if (end.getTime() > begin.getTime()) {
      let id = setInterval(function (params) {
        if (begin.getTime() > end.getTime()) {
            clearInterval(id);
            this.setState({ isComplete:true });
        }
        begin = new Date();
        this.setState({ timestr: timeSub(begin, end) });
      }.bind(this), 1000);
      this.setState({ intervalID: id });
    } else {
      this.setState({ isComplete:true });
    }
  }
  /** 必须清除.否则会报错 */
  componentWillUnmount(){
    clearInterval(this.state.intervalID);
  }

  delete() {
    clearInterval(this.state.intervalID);
    this.props.onDelete();
  }

  render() {
    const { event, detail, begintime, endtime,
      type, isPrivate, level, cycle } = this.props.data;
    const isComplete =  this.state.isComplete;
    const todoCls = classnames({
      [styles.normal]: false,
      [styles.htmltransition]: true,
      [styles.isComplete]:isComplete,
      [styles.todoCls]: true,
    });
    return (
      <div>
      <div className={todoCls}>
        <div className={styles.event}>
            {event}
            <Checkbox checked={isPrivate}  />
            <div className={styles.detail}>
            {detail}&nbsp;
        </div>
        </div>
        <div className={styles.timecountLabel}>
          <span className={styles.timecountDay}>{this.state.timestr.day}</span>天
          <span className={styles.timecountHour}>{this.state.timestr.hour}</span>小时
          <span className={styles.timecountMinute}>{this.state.timestr.minute}</span>分
          <span className={styles.timecountSecond}>{this.state.timestr.second}</span>秒
        </div>
        <div className={styles.eventLevel}>
          <Rate disabled value={level} />
        </div>
         <Button className={styles.deleteButton} type="primary" size="small" 
         shape="circle-outline" icon="cross"  onClick={this.delete.bind(this) } >
         </Button>
      </div>
        <hr/>
      </div>
    );
  }
}


function timeSub(begintime, endtime) {
  let t = endtime.getTime() - begintime.getTime();
  let d = Math.floor(t / 1000 / 60 / 60 / 24);
  let h = Math.floor(t / 1000 / 60 / 60 % 24);
  let m = Math.floor(t / 1000 / 60 % 60);
  let s = Math.floor(t / 1000 % 60);
  return { day: d, hour: h, minute: m, second: s };
}

/** 
 * 废弃
 */
function formatTime(datetime) {
  let fullyear = datetime.getFullYear();
  let month = datetime.getMonth() + 1;
  let day = datetime.getDate();
  let hour = datetime.getHours();
  let minute = datetime.getMinutes();
  //存储各种时间格式，方便以后扩展
  let createtime = {
    day: fullyear + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day),
  }
  return new Date(createtime.day);
}

export default Countdown;
