var mongodb = require('./db'),
  ObjectID = require('mongodb').ObjectID;

function Countdown(c) {
  // 开始时间
  this.begintime = c.begintime;
  // 结束时间
  this.endtime = c.endtime;
  // 事件
  this.event = c.event;
  // 类型 生日
  this.type = c.type;
  // 详情
  this.detail = c.detail;
  // 重要性评级 1-7,用于标色
  this.level = c.level;
  // 循环周期(1234)(周月年一次)
  this.cycle = c.cycle;

  this.isPrivate = c.isPrivate;
};

module.exports = Countdown;

//存储
Countdown.prototype.save = function (callback) {
  //要存入数据库的用户信息文档
  var countdown = {
    begintime: this.begintime,
    endtime: this.endtime,
    event: this.event,
    detail: this.detail,
    type: this.type,
    level: this.level,
    cycle: this.cycle,
    isPrivate: this.isPrivate
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('countdown', function (err, collection) {
      if (err) {
        db.close();
        return callback(err);
      }
      collection.insert(countdown, {
        safe: true
      }, function (err, doc) {
        db.close();
        if (err) {
          return callback(err);
        }
        callback(null, countdown);//成功！err 为 null，并返回存储后信息
      });
    });
  });
};

Countdown.getByCondition = function (condition, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('countdown', function (err, collection) {
      if (err) {
        db.close();
        return callback(err);
      }
      collection.count(condition, function (err, total) {
        collection.find(condition).sort({
          endtime: 1,
        }).toArray(function (err, docs) {
          db.close();
          if (err) {
            return callback(err);
          }
          callback(null, docs, total);
        });
      });
    });
  });
};

Countdown.remove = function (_id, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('countdown', function (err, collection) {
      if (err) {
        db.close();
        return callback(err);
      }
      collection.remove({
        "_id": new ObjectID(_id)
      }, {
          w: 1
        }, function (err) {
          db.close();
          if (err) {
            return callback(err);
          }
          callback(null);
        });
    });
  });
};
