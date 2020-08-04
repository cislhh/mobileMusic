import React, { Component } from "react";

// //引入swipercss
// import 'swiper/css/swiper.min.css'
// //引入推荐组件的css
// import '../assets/css/recommend.css'
// import 'swiper/js/swiper.min.js'
// //调用swiper插件
// import Swiper from 'swiper'


import { personalized, banner, getNewSongs } from '../../util/axios'
import "../../assets/css/home.css";
import axios from "axios";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 歌单列表
            rankList: [],
            remdList: [],
            bannerList: [],
        };
    }
    componentDidMount(){
        axios.all([personalized({limit:6}),getNewSongs(), banner()])
        .then(axios.spread((remdList,rankList,bannerList)=>{
            if(remdList.code===200){
                this.setState({
                    remdList:remdList.result
                })
            }
            
            if(remdList.code===200){
                this.setState({
                    rankList:rankList.result
                })
            }
// console.log(bannerList)
            // //获取轮播图
            // if (bannerList.code === 200) {
            //     //可以通过filter 对数组进行过滤
            //     let banners = bannerList.banners.filter((item, i) => i < 4)
            //     this.setState({
            //         bannerList: banners
            //     }, () => {
            //         let swiper = new Swiper('.swiper-container', {
            //             autoplay: {
            //                 delay: 2000,
            //             },
            //             loop: true,
            //             pagination: {
            //                 el: '.swiper-pagination',
            //             },
            //         });
            //     })
            // }
        }))
    }
    //动态路由跳转方法
    goPlay(id,name) {
        // this.props.history.push(`/play?id=${id}&name=${name}`)
        this.props.history.push({
            pathname:"/play",
            state:{
                id
            }
        })
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
                                    <img src={item.picUrl} alt="" />
                                    <p>{item.name}</p>
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
                                        item.name
                                    )}
                                >
                                    <div className="songRight">
                                        {item.name}
                                        <div className="songArtist">
                                        {
                                                    item.song.artists ?
                                                        item.song.artists.map(item => {
                                                        return <span key={item.id}>{item.name}</span>
                                                        })
                                                        : ''
                                                }-{item.song.album.name}
                                        </div>
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
