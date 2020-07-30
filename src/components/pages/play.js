import React, { Component } from "react";
import "../../assets/css/play.css";
import qs from 'querystring'
class Play extends Component {
    constructor(props) {
        super(props);
        // console.log(this)
        this.state = {};
    }
    render() {
        let queryStr = this.props.location.search.slice(1)
        console.log(queryStr)
        let obj = qs.parse(queryStr)
        console.log(obj)
        return (
            <div className="play">
                <div>
                    <button onClick={()=>this.props.history.go(-1)}>返回</button>
                </div>
                <h2>当前歌曲id是{obj.id}</h2>
                <h2>当前歌曲名字是{obj.name}</h2>
            </div>
        );
    }
}
export default Play;
