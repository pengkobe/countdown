# redux
> 本项目并没有使用到redux，但是计划使用redux改造。


## 为什么用redux
React 只是 DOM 的一个抽象层，并不是 Web 应用的完整解决方案。也就是说，只用 React 没法写大型应用。
### 注意事项
本项目规模比较小，并没有到使用redux的程度，只是为了试验redux。


## 什么情况下使用
* 用户的使用方式复杂
* 不同身份的用户有不同的使用方式（比如普通用户和管理员）
* 多个用户之间可以协作
* 与服务器大量交互，或者使用了WebSocket
* View要从多个来源获取数据  

从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux。
* 某个组件的状态，需要共享
* 某个状态需要在任何地方都可以拿到
* 一个组件需要改变全局状态
* 一个组件需要改变另一个组件的状态


## 基本概念
### Store
存储数据

### State
保存状态

### Action
反应View事件

### Action Creator()
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

### store.dispatch()
是 View 发出 Action 的唯一方法，接受一个 Action 对象作为参数，将它发送出去。

### Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

###　纯函数
纯函数是函数式编程的概念，必须遵守以下一些约束。
* 不得改写参数
* 不能调用系统 I/O 的API
* 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果

### store.subscribe()
Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数


## 中间件与异步操作
中间件（middleware）能让 Reducer 在异步操作结束后自动执行
### 中间件的概念
中间件应该添加在*dispatch*阶段。
### 中间件的用法
```javascript
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```
### applyMiddlewares()
```javascript
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}
```
### 异步操作的基本思路
* 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
* 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染
### redux-thunk 中间件
使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```

### redux-promise 中间件
方法1

```javascript
const fetchPosts = 
  (dispatch, postTitle) => new Promise(function (resolve, reject) {
     dispatch(requestPosts(postTitle));
     return fetch(`/some/API/${postTitle}.json`)
       .then(response => {
         type: 'FETCH_POSTS',
         payload: response.json()
       });
});
```

方法2

```javascript
import { createAction } from 'redux-actions';

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    // 发出同步 Action
    dispatch(requestPosts(selectedPost));
    // 发出异步 Action
    dispatch(createAction(
      'FETCH_POSTS', 
      fetch(`/some/API/${postTitle}.json`)
        .then(response => response.json())
    ));
  }
```  

## react-redux
> 首先，react-redux 和 redux 是两个不同的东西。

### UI 组件
* 只负责 UI 的呈现，不带有任何业务逻辑
* 没有状态（即不使用this.state这个变量）
* 所有数据都由参数（this.props）提供
* 不使用任何 Redux 的 API

### 容器组件
* 负责管理数据和业务逻辑，不负责 UI 的呈现
* 带有内部状态
* 使用 Redux 的 API

### connect()
用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。

```javascript
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```

### mapStateToProps()
建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。

```javascript
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
```

### mapDispatchToProps()
用来建立 UI 组件的参数到store.dispatch方法的映射。

```javascript
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
// 写出对象后
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
```

### <Provider> 组件
可以让容器组件拿到state，唯一功能就是传入store对象。


### React-Router 路由库
```javascript
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
```


## Store 的实现
```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```


## Reducer 的拆分
Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。


## 工作流程
![redux_work_flow](./img/redux_work_flow.jpg)


## demo
https://github.com/reactjs/redux/tree/master/examples/counter

## 试验
1. redux试验:  
   https://github.com/ruanyf/jstraining/blob/master/demos/README.md#jsx  
   - Redux 要求 UI 的渲染组件都是纯组件，即不包含任何状态（this.state）的组件。
   ```javascript
    <div className="index">
        <p>{this.props.text}</p>
        <input
            defaultValue={this.props.name}
            onChange={this.props.onChange}
        />
    </div>
   ```
   - 进行数据处理、并包含状态的组件，称为"容器组件"。Redux 使用connect方法，自动生成 UI 组件对应的"容器组件"。
   ```javascript
    const App = connect(
        mapStateToProps,
        mapDispatchToProps
    )(MyComponent);
   ```
   - mapStateToProps函数返回一个对象，表示一种映射关系，将 UI 组件的参数映射到state。
   ```javascript
   function mapStateToProps(state) {
        return {
            text: state.text,
            name: state.name
        };
    }
   ```
   - mapDispatchToProps函数也是返回一个对象，表示一种映射关系，但定义的是哪些用户的操作应该当作Action，传给Store。
   ```javascript
   function mapDispatchToProps(dispatch) {
        return {
            onChange: (e) => dispatch({
            type: 'change',
            payload: e.target.value
            })
        }
    }
   ```
   - reducer函数用来接收action，算出新的state。
   ```javascript
    function reducer(state = {
            text: '你好，访问者',
            name: '访问者'
            }, action) {
            switch (action.type) {
                case 'change':
                    return {
                        name: action.payload,
                        text: '你好，' + action.payload
                    };
            }
    }
    ```  
    - Store 由 Redux 提供的 createStore 方法生成，该方法接受 reducer 作为参数。为了把 Store传 入组件，
    必须使用 Redux 提供的Provider组件在应用的最外面，包裹一层。
    ```javascript
        const store = createStore(reducer);

        ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.body.appendChild(document.createElement('div'))
        );
    ```


## 教程参考
http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html  
http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html  
http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html