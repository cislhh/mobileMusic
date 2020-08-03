import React, { Component } from "react";
import "../../assets/css/rank.css";
//引入路由导航链接
import { getHotList } from "../../util/axios";
class Rank extends Component {
    constructor() {
        super();
        this.state = {
            // 歌单列表
            rankList: [],
            //获取热歌榜更新时间
            hotTime: ""
        };
    }
    componentDidMount() {
        this.gethotlist()
    }
    //获取热歌榜更新时间
    //封装一个事件转化函数
    formatTime(timer) {
        let date = new Date(timer)
        //年份
        let year = date.getFullYear()
        let month = (date.getMonth() + 1 + '').padStart(2, '0')
        //天数
        let day = (date.getDate() + '').padStart(2, '0')
        //小时
        let hours = (date.getHours() + '').padStart(2, '0')
        //分钟
        let minutes = (date.getMinutes() + '').padStart(2, '0')
        //秒数
        let seconds = (date.getSeconds() + '').padStart(2, '0')
        return `${month}月${day}日`
    }
    //获取热歌榜事件
    gethotlist(){
        getHotList()
        .then(res=>{
            
            let hotList = res.playlist.tracks.filter((item,i)=>i<20)
            this.setState({
                hotTime:res.playlist.updateTime,
                rankList: hotList
            })
            console.log(this.state.rankList)
        })
    }
    //动态路由跳转方法
    goPlay(id, name) {
        // console.log(this, "rank");
        //在props属性中有路由的属性方法
        this.props.history.push(`/play?id=${id}&name=${name}`);
    }
    render() {
        const { rankList, hotTime } = this.state;
        return (
            <div className="rank">
                {/* <h1>我是排行榜</h1> */}
                <div className="bgImg">
                    <div className="rTitle"></div>
                    <div className="hottime">更新日期：{this.formatTime(hotTime)}</div>
                </div>

                <ul>
                    {rankList.map((item,i) => {
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
                                <div className="songLeft">
                                    {
                                        i<9?"0"+(i+1):i+1
                                    }
                                </div>
                                <div className="songRight">
                                    {item.name}
                                    <div className="songArtist">
                                        {
                                                    item.ar ?
                                                        item.ar.map(item => {
                                                        return <span key={item.id}>{item.name}</span>
                                                        })
                                                        : ''
                                                }-{item.al.name}
                                        </div>
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
