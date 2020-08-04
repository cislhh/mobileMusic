import React, { Component } from "react";
import "../../assets/css/play.css";
import qs from "querystring";
import axios from "axios";
import { getLyric, getUrl, getSongDetail } from "../../util/axios";
class Play extends Component {
    constructor(props) {
        super(props);
        // console.log(this)
        this.state = {
            // music: require("../../assets/music/米津玄師 - LOSER.mp3"),
            // musicUrl:
            //     "http://m701.music.126.net/20200801145057/a347073fa26933ac846a500764a964fb/jdyyaac/535b/0208/5358/d1223043d95be596c846d23417cee968.m4a",
            songUrl: "",
            lyric: "",
            songDetail: "",
            songBg:"",

            flag: false,
            circle_num: 0,
            imgTurnDeg: 0,
            timer: null
        };

        this.audio = React.createRef();
        this.imgTurn = React.createRef();
    }
    componentDidMount() {
        console.log(this.state.flag)
        this.goPlay();
        // console.log(this.props.location.state.id)
        axios
            .all([
                getLyric({ id: this.props.location.state.id }),
                getUrl({ id: this.props.location.state.id }),
                getSongDetail({ ids: this.props.location.state.id })
            ])
            .then(
                axios.spread((lyric, songUrl, songDetail) => {
                    console.log(lyric, "歌词");
                    console.log(songUrl, "音乐地址");
                    console.log(songDetail, "songDetail");
                    if (lyric.code === 200) {
                        this.setState({
                            lyric: lyric.lrc.lyric
                        });
                    }
                    if (songUrl.code === 200) {
                        this.setState({
                            songUrl: songUrl.data[0].url
                        });
                    }
                    if (songDetail.code === 200) {
                        this.setState({
                            songDetail: songDetail.songs[0],
                            songBg:songDetail.songs[0].al.picUrl
                        });
                    }
                })
            );
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
        const { lyric, songUrl, songDetail,songBg } = this.state;
        return (
            <div>
                <div className="play_bd" style={{
                backgroundImage:`url(${songBg})`,
            }}></div>
                <div className="play" onClick={this.goPlay.bind(this)}>
                    <h6 onClick={this.goHome.bind(this)}>U音乐</h6>
                    <div className="play_disc">
                        <div className="imgTurn" ref={this.imgTurn}>
                            <div className="cdRom"></div>
                            <div className="songImg">
                                {songDetail.al ? (
                                    <img
                                        style={{
                                            width: "3rem",
                                            borderRadius: "50%"
                                        }}
                                        src={songDetail.al.picUrl}
                                        alt=""
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="btnPlay">
                            <audio
                                ref={this.audio}
                                autoPlay
                                src={songUrl}
                            ></audio>
                        </div>
                    </div>
                    <div className="play_songInfo">
                        <div className="title">
                            {songDetail.al ? (
                                <div>
                                    {songDetail.al.name}-{songDetail.ar[0].name}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="info">{lyric}</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Play;
