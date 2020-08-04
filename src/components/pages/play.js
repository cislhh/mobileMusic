import React, { Component } from "react";
import "../../assets/css/play.css";
import $ from "jquery";
import axios from "axios";
import { getLyric, getUrl, getSongDetail } from "../../util/axios";
class Play extends Component {
    constructor(props) {
        super(props);

        this.state = {
            songUrl: "",
            lyric: "",
            songDetail: "",
            songBg: "",
            playTime: "00.00",

            flag: false,
            circle_num: 0,
            imgTurnDeg: 0,
            timer: null
        };

        this.audio = React.createRef();
        this.btnPlay = React.createRef();
        this.imgTurn = React.createRef();
    }
    componentDidMount() {
        this.goPlay();
        axios
            .all([
                getLyric({ id: this.props.location.state.id }),
                getUrl({ id: this.props.location.state.id }),
                getSongDetail({ ids: this.props.location.state.id })
            ])
            .then(
                axios.spread((lyric, songUrl, songDetail) => {
                    if (lyric.code === 200) {
                        let obj = {};
                        let lyricInfo = lyric.lrc.lyric;
                        //创建一个去除数组[]的正则
                        let reg = /\[(.*?)](.*)/g;
                        // console.log(lyricInfo);
                        //把字符串的每一处[]符号 都替换掉
                        lyricInfo.replace(reg, (a, b, c) => {
                            b = b.slice(0, 5);
                            obj[b] = c;
                        });
                        console.log(obj);

                        this.setState(
                            {
                                lyric: obj
                            },
                            () => {
                                let audio = this.audio.current;
                                audio.ontimeupdate = () => {
                                    //currentTime 当前正在播放的时间
                                    // console.log(audio.currentTime,"我正在播放")
                                    let nowTime = this.tranTime(
                                        audio.currentTime
                                    );
                                    if (nowTime in this.state.lyric) {
                                        this.setState(
                                            {
                                                playTime: nowTime
                                            },
                                            () => {
                                                //歌词滚动
                                                this.moveLyric();
                                            }
                                        );
                                    }
                                };
                            }
                        );
                    }
                    if (songUrl.code === 200) {
                        this.setState({
                            songUrl: songUrl.data[0].url
                        });
                    }
                    if (songDetail.code === 200) {
                        console.log(songDetail)
                        this.setState({
                            songDetail: songDetail.songs[0],
                            songBg: songDetail.songs[0].al.picUrl
                        });
                    }
                })
            );
    }
    //封装一个时间转化的事件
    tranTime(timer) {
        let minute = (Math.floor(timer / 60) + "").padStart(2, "0");
        let second = (Math.floor(timer % 60) + "").padStart(2, "0");
        return `${minute}:${second}`;
    }
    //歌词滚动事件
    moveLyric() {
        //取出带active的p标签
        let active = document.getElementsByClassName("active")[0];
        console.log(active.offsetTop)
        //查找出active索引
        let index = $(".info_move")
            .children()
            .index(active);
        let offset = 31;
        if (active) {
            if (active.offsetTop > offset) {
                //移动Y 轴 
                $(".info_move").css("transform", `translateY(-${index * offset}px)`);
            }
        }
    }
    //点击碟片区域可以控制音乐的播放
    goPlay() {
        if (this.state.flag === true) {
            clearInterval(this.state.timer);
            this.audio.current.pause();
            this.btnPlay.current.style.backgroundImage = `url(${require("../../assets/images/play.png")})`;
            this.setState({
                flag: false
            });
        } else {
            this.turnDisc();
            // .play()是一个promise，直接播放会返回一个不阻止页面的错误，用catch捕捉一下即可
            this.audio.current.play().catch(error => {
                console.log("not");
            });

            this.btnPlay.current.style.backgroundImage = `url()`;
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
            if (this.state.imgTurnDeg >= 360) {
                this.setState({
                    imgTurnDeg: 0
                });
            }
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
        const { lyric, songUrl, songDetail, songBg, playTime } = this.state;
        return (
            <div>
                <div
                    className="play_bd"
                    style={{
                        backgroundImage: `url(${songBg})`
                    }}
                ></div>
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
                        <div className="btnPlay" ref={this.btnPlay}>
                            <audio
                                ref={this.audio}
                                autoPlay
                                src={songUrl}
                                controls
                            ></audio>
                        </div>
                    </div>
                    <div className="play_songInfo">
                        <div className="title">
                            {songDetail.al ? (
                                <div>
                                    {songDetail.name}-{songDetail.ar[0].name}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="info">
                            <div className="info_move">
                                {Object.entries(lyric).map((item, i) => {
                                    //当播放器时间和歌词的时间匹配的时候 加高亮
                                    if (playTime == item[0]) {
                                        return (
                                            <p key={i} className="active">
                                                {item[1]}
                                            </p>
                                        );
                                    } else {
                                        return <p key={i}>{item[1]}</p>;
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Play;
