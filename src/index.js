//引入核心库
import React from "react";
import "./assets/css/reset_mobile.css"
import "./assets/js/rem"
//引入DOM库
import ReactDOM from "react-dom";

//引入全局样式
import "./index.css";
import 'antd/dist/antd.css';
//引入主组件
import App from "./App.js";

//引入路由相关插件，让浏览器可以解析当前的路由插件
//BrowserRouter相当于history模式
//如果想用hash模式，就用HashRouter
import { BrowserRouter } from "react-router-dom";
//利用render函数进行渲染
ReactDOM.render(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>,
    document.getElementById("root")
);
