var express = require('express');
var app = express.Router();

var Countdown = require('../models/countdown.js');

app.post('/all', function (req, res) {
  var haslogin = req.session.user ? 1 : 0;
  var query = {};
  console.log('login:'+req.session.user);
  if (!haslogin) {
    //query.isPrivate = false;
  }else{
  //  query.isPrivate = true;
  }

  Countdown.getByCondition(query, function (err, countdowns, total) {
    if (err) {
      countdowns = [];
      console.log(err);
      res.json({ success: false });
    }
    res.json({success: true,data:countdowns});
  });
});

app.post('/add', checkLogin);
app.post('/add', function (req, res) {
  var cobj = req.body;
  var countdown = new Countdown({
    begintime: cobj.begintime,
    endtime: cobj.endtime,
    event: cobj.event,
    detail: cobj.detail,
    type: cobj.type,
    level: cobj.level,
    cycle: cobj.cycle,
    isPrivate: cobj.isPrivate? true:false
  });
  countdown.save(function (err, model) {
    if (err) {
      console.log(err);
      res.json({ success: false });
    }else{
      res.json({success: true,data:model});
    }
  });
});

app.get('/:_id/delete', checkLogin);
app.get('/:_id/delete', function (req, res) {
    console.log('rm' + req.params._id);
    Countdown.remove(req.params._id, function (err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('back');
      }
      res.json({success:true});
    });
});


app.get('/edit', function (req, res) {
  res.json({ success: true });
});


function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录!');
    res.json({success:false});
   // res.redirect('/login');
    return;
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录!');
    res.json({success:false});
   // res.redirect('back');//返回之前的页面
    return;
  }
  next();
}
module.exports = app;
