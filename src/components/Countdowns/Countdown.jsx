import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Countdown.less';
import { Checkbox, Rate  } from 'antd';

// const Countdown = ({ data}) => {
//   const { event, detail, begintime, endtime, type, isPrivate, level, cycle } = data;
//   var timestr = { day: 0, hour: 0, minute: 0, second: 0 };
//   if (endtime) {
//     var end = new Date(endtime);
//     var begin = new Date();
//     timestr = timeSub(begin, end);
//   }

//   const todoCls = classnames({
//     [styles.normal]: true,
//     [styles.isComplete]: isPrivate,
//   });

//   return (
//     <div className={todoCls}>
//       <div className={styles.checkbox}>
//         <Checkbox  checked={isPrivate}  />
//       </div>
//       <div className={styles.event}>
//         {event}
//       </div>
//       <div className={styles.detail}>
//         {detail}
//       </div>
//       <div className="timecount">
//         {timestr.day}天{timestr.hour}小时{timestr.minute}分{timestr.second}秒
//       </div>
//       <Rate disabled value={level}/>
//     </div>
//   );
// };

// Countdown.propTypes = {
//   data: PropTypes.object.isRequired,
// };


// function timeSub(begintime, endtime) {
//   var t = endtime.getTime() - begintime.getTime();
//   var d = Math.floor(t / 1000 / 60 / 60 / 24);
//   var h = Math.floor(t / 1000 / 60 / 60 % 24);
//   var m = Math.floor(t / 1000 / 60 % 60);
//   var s = Math.floor(t / 1000 % 60);
//   return { day: d, hour: h, minute: m, second: s };
// }


// export default Countdown;



class Countdown extends Component {

  constructor(props) {
    super(props);
    const { begintime, endtime} = this.props.data;
    var end = new Date(endtime);
   debugger;
    var begin = new Date();
    var timestr = timeSub(begin,  formatTime(end));
    this.state = {
      timestr: timestr,
      end: end
    };
  }

  componentDidMount() {
    // 云端加载
    setInterval(function (params) {
      var begin = new Date();
      this.setState({ timestr: timeSub(begin, this.state.end) });
    }.bind(this), 1000);
  }

  render() {
    const {  event, detail, begintime, endtime, type, isPrivate, level, cycle } = this.props.data;
    // var timestr = { day: 0, hour: 0, minute: 0, second: 0 };
    const todoCls = classnames({
      [styles.normal]: false,
      [styles.isComplete]: isPrivate,
    });
    return (
      <div className={todoCls}>
        <div className={styles.event}>
          {event}     <Checkbox  checked={isPrivate}  />
        </div>
        <div className={styles.detail}>
          {detail}
        </div>
        <div className={styles.timecountLabel}>
          <span className={styles.timecountDay}>{this.state.timestr.day}</span>天
          <span className={styles.timecountHour}>{this.state.timestr.hour}</span>小时
          <span className={styles.timecountMinute}>{this.state.timestr.minute}</span>分
          <span className={styles.timecountSecond}>{this.state.timestr.second}</span>秒
        </div>
        <Rate disabled value={level}/>
        <hr/>
      </div>
    );
  }
}


function timeSub(begintime, endtime) {
  var t = endtime.getTime() - begintime.getTime();
  var d = Math.floor(t / 1000 / 60 / 60 / 24);
  var h = Math.floor(t / 1000 / 60 / 60 % 24);
  var m = Math.floor(t / 1000 / 60 % 60);
  var s = Math.floor(t / 1000 % 60);
  return { day: d, hour: h, minute: m, second: s };
}
function formatTime(datetime) {
  var fullyear = datetime.getFullYear();
  var month = datetime.getMonth() + 1;
  var day = datetime.getDate();
  var hour = datetime.getHours();
  var minute = datetime.getMinutes();
  //存储各种时间格式，方便以后扩展
  var createtime = {
   // time: (hour < 10 ? '0' + hour : hour) + ":" + (minute < 10 ? '0' + minute : minute),
    day: fullyear + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day),
  }
  return new Date(createtime.day);
}

export default Countdown;