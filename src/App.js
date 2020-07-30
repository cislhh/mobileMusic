import React, { Component } from "react";
//引入App.css
import "./App.css"
//引入路由插件中的相关属性方法
import Index from './components/pages/index'
import Play from './components/pages/play'
import List from './components/pages/list'
//引入要渲染的组件
import {Switch,Route,Redirect} from "react-router-dom"
//App.js中不要写任何内容，会影响其它组件，但是可以用来渲染一级路由的出口

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="app">
               {/* 一级路由出口 */}
            <Switch>
                <Route path="/index" component={Index}></Route>
                <Route path="/play" component={Play}></Route>
                <Route path="/list" component={List}></Route>
                <Redirect to="/index"></Redirect>
            </Switch>
            </div>
        );
    }
}
export default App;
