import React, { Component } from "react";
import "../../assets/css/search.css";
//调取接口地址
import { searchHot, searchInfo } from "../../util/axios";
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findMsg: "",
            rankList: [],
            findText: []
        };
        this.error_ico = React.createRef();
        this.find_input = React.createRef();
        this.sea_list = React.createRef();
        this.sea_hot = React.createRef();
    }
    componentDidMount() {
        this.get_search_hot();
    }
    goPlay(id, name) {
        // this.props.history.push(`/play?id=${id}&name=${name}`);
        this.props.history.push({
            pathname:"/play",
            state:{
                id
            }
        })
    }
    //根据是否输入内容判断是否出现取消符号
    errorIco(e) {
        this.setState({
            findMsg: e.target.value
        });
        if (!this.find_input.current.value == "") {
            this.error_ico.current.style.display = "block";
            this.sea_list.current.style.display = "block";
            this.sea_hot.current.style.display = "none";
        } else {
            this.error_ico.current.style.display = "none";
            this.sea_list.current.style.display = "none";
            this.sea_hot.current.style.display = "block";
        }
    }
    //点击errorico，清除值
    errorClear() {
        this.setState({
            findMsg: "",
            rankList: []
        });
        this.error_ico.current.style.display = "none";
        this.find_input.current.value = "";

        this.sea_list.current.style.display = "none";
        this.sea_hot.current.style.display = "block";
    }
    //点击热门搜索标签添加到搜索栏
    findAdd(id) {
        this.error_ico.current.style.display = "block";
        this.setState({
            findMsg: this.state.findText[id].first
        });
        this.find_input.current.value = this.state.findText[id].first;

        this.sea_list.current.style.display = "block";
        this.sea_hot.current.style.display = "none";
    }
    //封装一个搜索事件
    goSearch(keywords) {
        //给input赋值
        this.find_input.current.value = keywords;
        //调取搜索接口
        searchInfo({ keywords }).then(res => {
            if (res.code == 200) {
                console.log(res, "搜索结果");
                this.setState({
                    rankList: res.result.songs
                });
            }
        });
    }
    //获取热门搜索事件
    get_search_hot() {
        searchHot().then(res => {
            if (res.code == 200) {
                this.setState({
                    findText: res.result.hots
                });
            }
        });
        // console.log(this.state.findText, '热门标签')
    }
    //键盘事件
    enter(e) {
        if (e.keyCode === 13 && e.target.value != '') {
            console.log(e.target.value)
            //当用户输入回车的时候 要调取搜索接口
            this.goSearch(e.target.value)
        }
    }
    render() {
        const { findText, rankList } = this.state;
        return (
            <div className="search">
                <div className="sea_input">
                    <div className="sea_inputcover">
                        <i className="sea_fdico"></i>
                        <input
                            type="text"
                            placeholder="搜索歌曲、歌手、专辑"
                            className="sea_find"
                            ref={this.find_input}
                            onChange={this.errorIco.bind(this)}
                            onKeyUp={this.enter.bind(this)}
                        />
                        <div className="sea_close">
                            <i
                                className="sea_closeIco"
                                ref={this.error_ico}
                                onClick={this.errorClear.bind(this)}
                            ></i>
                        </div>
                    </div>
                </div>
                <div className="sea_hot" ref={this.sea_hot}>
                    <h6>热门搜索</h6>
                    <ul>
                        {findText.map((item, si) => {
                            return (
                                <li
                                    className="hot_tag"
                                    key={item.first}
                                    onClick={() => {
                                        this.findAdd(si);
                                        this.goSearch(item.first);
                                    }}
                                >
                                    {item.first}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="sea_list" ref={this.sea_list}>
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
                                            {item.artists
                                                ? item.artists.map(item => {
                                                      return (
                                                          <span key={item.id}>
                                                              {item.name}
                                                          </span>
                                                      );
                                                  })
                                                : ""}
                                            -{item.name}
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
export default Search;
