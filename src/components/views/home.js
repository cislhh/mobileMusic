import React, { Component } from "react";

import "../../assets/css/home.css";
class Home extends Component {
    constructor(props) {
        super(props);
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
            remdList: [
                {
                    id: 1,
                    imgUrl: require("../../assets/images/1.jpg"),
                    msg: "放空时间到那个世界"
                },
                {
                    id: 2,
                    imgUrl: require("../../assets/images/2.jpg"),
                    msg: "放空时间到那个世界"
                },
                {
                    id: 3,
                    imgUrl: require("../../assets/images/3.jpg"),
                    msg: "放空时间到那个世界"
                },
                {
                    id: 4,
                    imgUrl: require("../../assets/images/4.jpg"),
                    msg: "放空时间到那个世界"
                },
                {
                    id: 5,
                    imgUrl: require("../../assets/images/5.jpg"),
                    msg: "放空时间到那个世界"
                },
                {
                    id: 6,
                    imgUrl: require("../../assets/images/6.jpg"),
                    msg: "放空时间到那个世界"
                }
            ]
        };
    }
    //动态路由跳转方法
    goPlay(id,name) {
        this.props.history.push(`/play?id=${id}&name=${name}`)
    }
    render() {
        const { remdList, rankList } = this.state;
        return (
            <div className="home">
                <div className="remd_tl">推荐歌单</div>
                <div className="remd_list">
                    <ul>
                        {remdList.map(item => {
                            return (
                                <li key={item.id}>
                                    <img src={item.imgUrl} alt="" />
                                    <p>{item.msg}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="remd_tl">最新音乐</div>
                <div className="new_music">
                    <ul>
                        {rankList.map(item => {
                            return (
                                <li
                                    className="songList"
                                    key={item.id}
                                    onClick={this.goPlay.bind(
                                        this,
                                        item.id,
                                        item.songName
                                    )}
                                >
                                    <div className="songRight">
                                        {item.songName}
                                        <span className="icon_play"></span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
export default Home;
