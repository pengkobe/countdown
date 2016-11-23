# redux demo : reading
> 一个新闻阅读App，作者已经持续维护将近一年，一定有很多值得学习的地方

### 初窥
大部分代码都没有用到 react-redux，用到的几个模块有
1. main
2. Category

全局代码中有使用

```javascript
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
```

### redux-saga
作者没有使用redux-thunk，而使用了 redux-saga，据说这东西非常好写测试代码。  
文档：https://yelouafi.github.io/redux-saga/docs/introduction/BeginnerTutorial.html  


### container
containers：容器层，注入state的地方，建立UI组件与state的关联，
作者用容器包了一层。如果有需要页面中用到多个组件拼成，也通过容器包一层，达到复用。app入口也在这里。

### 一些笔记
* bindActionCreators，参考:http://www.cnblogs.com/ZSG-DoBestMe/p/5280198.html    
  把 action creators 转成拥有同名 keys 的对象，但使用 dispatch 把每个 action creator 包围起来，这样可以直接调用它们。   
  定义的时候绑定 action creators，你就可以使用一个唯一的 store 实例来对应所有请求了  
  疑问：作者并没有使用dispatch，那家伙是怎么调用成功的呢  

### 参考
http://richardcao.me/2016/07/05/Talk-About-Reading/   
http://richardcao.me/2016/09/07/React-Native-With-Redux-Refactor/  
redux中文文档:http://cn.redux.js.org/  
