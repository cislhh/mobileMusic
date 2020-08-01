import React, { Component } from "react";
import "../../assets/css/play.css";
import qs from "querystring";
import { clear } from "_sisteransi@1.0.5@sisteransi";
class Play extends Component {
    constructor(props) {
        super(props);
        // console.log(this)
        this.state = {
            music: require("../../assets/music/米津玄師 - LOSER.mp3"),
            musicUrl:
                "http://m701.music.126.net/20200801145057/a347073fa26933ac846a500764a964fb/jdyyaac/535b/0208/5358/d1223043d95be596c846d23417cee968.m4a",
            flag: false,
            circle_num: 0,
            imgTurnDeg: 0,
            timer: null
        };

        this.audio = React.createRef();
        this.imgTurn = React.createRef();
    }
    componentDidMount(){
        this.goPlay()
    }
    //点击碟片区域可以控制音乐的播放
    goPlay() {
        if (this.state.flag === true) {
            clearInterval(this.state.timer);
            this.audio.current.pause();
            this.setState({
                flag: false
            });
        } else {
            this.turnDisc();
            this.audio.current.play();
            this.setState({
                flag: true
            });
        }
    }
    //创建一个定时器，这个定时器负责控制碟片的持续旋转
    turnDisc() {
        clearInterval(this.state.timer);
        this.state.timer = setInterval(() => {
            this.imgTurn.current.style.transform = `rotate(${this.state.imgTurnDeg}deg)`;
            this.setState({
                imgTurnDeg: (this.state.imgTurnDeg += 1)
            });
        }, 30);
    }

    //点击返回首页
    goHome(e) {
        e.stopPropagation();
        clearInterval(this.state.timer);
            this.audio.current.pause();
            this.setState({
                flag: false
            });
        this.props.history.push(`/index/home`);
    }
    render() {
        let queryStr = this.props.location.search.slice(1);
        let obj = qs.parse(queryStr);
        const { music, musicUrl } = this.state;
        return (
            <div className="play" onClick={this.goPlay.bind(this)}>
                <div>
                    {/* <button onClick={()=>this.props.history.go(-1)}>返回</button> */}
                    <h6 onClick={this.goHome.bind(this)}>U音乐</h6>
                    <div className="play_disc">
                        <div className="imgTurn" ref={this.imgTurn}>
                            <div className="cdRom"></div>
                            <div className="songImg"></div>
                        </div>
                        <div className="btnPlay">
                            <audio
                                ref={this.audio}
                                autoPlay
                                src={music}
                            ></audio>
                        </div>
                    </div>
                    <div className="play_songInfo">
                        <div className="title">{obj.name}</div>
                        <div className="info">{/* 歌词 */}</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Play;
