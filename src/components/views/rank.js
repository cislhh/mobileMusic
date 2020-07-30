import React, { Component } from "react";
import "../../assets/css/rank.css";
//引入路由导航链接
import { NavLink } from "react-router-dom";
class Rank extends Component {
    constructor() {
        super();
        this.state = {
            // 歌单列表
            rankList: [
                {
                    id: 1,
                    songName: "爸爸妈妈"
                },
                {
                    id: 2,
                    songName: "海底"
                },
                {
                    id: 3,
                    songName: "心之语"
                },
                {
                    id: 4,
                    songName: "你好再见"
                },
                {
                    id: 5,
                    songName: "苏格拉底"
                }
            ],
            //获取热歌榜更新时间
            // hotTime:this.getHotTime()
            hotTime: ""
        };
    }
    componentDidMount() {
        this.getHotTime();
    }
    //获取热歌榜更新时间
    getHotTime() {
        let time = new Date();
        let m = time.getMonth() + 1;
        if (m < 10) {
            m = "0" + m;
        }
        let d = time.getDate();
        // return `${m}月${d}日`
        this.setState({
            hotTime: `${m}月${d}日`
        });
    }

    //动态路由跳转方法
    goPlay(id,name) {
        // console.log(this, "rank");
        //在props属性中有路由的属性方法
        this.props.history.push(`/play?id=${id}&name=${name}`)
    }
    render() {
        const { rankList, hotTime } = this.state;
        return (
            <div className="rank">
                {/* <h1>我是排行榜</h1> */}
                <div className="bgImg">
                    <div className="rTitle"></div>
                    <div className="hottime">更新日期：{hotTime}</div>
                </div>

                <ul>
                    {rankList.map(item => {
                        return (
                            <li className="songList" key={item.id} onClick = {this.goPlay.bind(this,item.id,item.songName)}>
                                <div className="songLeft">{item.id}</div>
                                <div className="songRight">
                                    {item.songName}
                                    <span className="icon_play"></span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
export default Rank;
