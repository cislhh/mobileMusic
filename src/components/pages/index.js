import React, { Component } from "react";
//引入要渲染的组件
import Home from "../views/home";
import Rank from "../views/rank";
import Search from "../views/search";

//CSS
import "../../assets/css/index.css";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="index">
                <div className="title">
                    <span className="tName">优音乐</span>
                </div>
                
                {/* <h1>index</h1> */}
                <div className = "tabBar">
                    <NavLink to="/index/home" activeClassName="select">首页</NavLink>
                    <NavLink to="/index/rank" activeClassName="select">排行榜</NavLink>
                    <NavLink to="/index/search" activeClassName="select">搜索</NavLink>
                </div>

                {/* 二级路由出口 */}
                <Switch>
                    <Route path="/index/home" component={Home}></Route>
                    <Route path="/index/rank" component={Rank}></Route>
                    <Route path="/index/search" component={Search}></Route>

                    <Redirect to="/index/home"></Redirect>
                </Switch>
            </div>
        );
    }
}
export default Index;
