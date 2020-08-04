import http  from './axios'

// 封装接口
//封装一个推荐歌单的接口
export function personalized(params){
    return http.get('/personalized',{
        params
    })
}

//封装一个轮播图接口
export function banner(){
    return http.get('/banner')
}

//封装一个最新音乐的接口
export function getNewSongs(){
    return http.get('/personalized/newsong')
}

//封装一个热歌榜接口
export function getHotList(){
    return http.get('/playlist/detail?id=3778678')
}

//封装一个热搜列表
export function searchHot(){
    return http.get('/search/hot')
}

//封装一个搜索接口
export function searchInfo(params){
    return http.get('/search',{
        params
    })
}

//封装歌单详情
export function getPlayList(params){
    return http.get('/playlist/detail',{
        params
    })
}
//封装一个歌单评论接口
export function getPlayComment(params){
    return http.get('/comment/playlist',{
        params
    })
}

//封装一个歌词接口
export function getLyric(params){
    return http.get('/lyric',{
        params
    })
}
//获取音乐 url
export function getUrl(params){
    return http.get('/song/url',{
        params
    })
}
//获取歌曲详情
export function getSongDetail(params){
    return http.get('/song/detail',{
        params
    })
}