// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  '/api/todos': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: [
          {
            id: 1,
            text: '学习 antd',
            isComplete: true,
          },
          {
            id: 2,
            text: '学习 ant-tool',
          },
          {
            id: 3,
            text: '学习 dora',
          },
        ],
      });
    }, 500);
  },
  '/api/countdowns': function(req, res) {
    setTimeout(function() {
      res.json({
        success: true,
        data: [
          {
            id: 1,
            text: '学习 antd',
            isComplete: true,
          },
          {
            id: 2,
            text: '学习 ant-tool',
          }
        ],
      });
    }, 500);
  },
};
