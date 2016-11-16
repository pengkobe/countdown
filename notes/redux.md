# redux
> 本项目并没有使用到redux，但是计划使用redux改造。

### 注意事项（RYF）



### 教程
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
