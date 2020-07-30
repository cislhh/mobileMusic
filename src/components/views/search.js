import React, { Component } from "react";
import "../../assets/css/search.css";
import { from } from "_array-flatten@2.1.2@array-flatten";
class Serch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findMsg: "",
            findText: [
                {
                    id: 1,
                    msg: "无滤镜"
                },
                {
                    id: 2,
                    msg: "周杰伦"
                },
                {
                    id: 3,
                    msg: "祖娅纳惜"
                },
                {
                    id: 4,
                    msg: "一曲终将万骨枯"
                },
                {
                    id: 5,
                    msg: "上半年流行音乐排行榜"
                },
                {
                    id: 6,
                    msg: "2020毕业音乐会"
                }
            ]
        };
        this.error_ico = React.createRef();
        this.find_input = React.createRef();
    }
    
    //根据是否输入内容判断是否出现取消符号
    errorIco(e) {
        this.setState({
            findMsg:e.target.value
        })
        if (!this.find_input.current.value == "") {
            this.error_ico.current.style.display = "block";
        }else{
            this.error_ico.current.style.display = "none";
        }
    }
    //点击errorico，清除输入框的值
    errorClear(){
        this.setState({
            findMsg:""
        })
        this.error_ico.current.style.display = "none";
        this.find_input.current.value=""
    }
    //点击热门搜索标签添加到搜索栏
    findAdd(id) {
        this.error_ico.current.style.display = "block";
        this.setState({
            findMsg: this.state.findText[id - 1].msg
        });
        this.find_input.current.value=this.state.findText[id - 1].msg
    }
    render() {
        const { findText} = this.state;
        return (
            <div className="search">
                <form className="sea_input">
                    <div className="sea_inputcover">
                        <i className="sea_fdico"></i>
                        <input
                            type="text"
                            placeholder="搜索歌曲、歌手、专辑"
                            className="sea_find"
                            ref={this.find_input}
                            onChange={this.errorIco.bind(this)}
                        />
                        <div className="sea_close">
                            <i
                                className="sea_closeIco"
                                ref={this.error_ico}
                                onClick={this.errorClear.bind(this)}
                            ></i>
                        </div>
                    </div>
                </form>
                <div className="sea_hot">
                    <h6>热门搜索</h6>
                    <ul>
                        {findText.map(item => {
                            return (
                                <li
                                    onClick={this.findAdd.bind(this, item.id)}
                                    className="hot_tag"
                                    key={item.id}
                                >
                                    {item.msg}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
export default Serch;
