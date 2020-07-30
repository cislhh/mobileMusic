export default function toTime(timer) {
    let timeInfo = parseInt(timer)
    let date = new Date(timeInfo)
    //年份
    let year = date.getFullYear()
    //月份
    let month = (date.getMonth() + 1 + '').padStart(2, '0')
    //天数
    let day = (date.getDate() + '').padStart(2, '0')
    //小时
    let hours = (date.getHours() + '').padStart(2, '0')
    //分钟
    let minutes = (date.getMinutes() + '').padStart(2, '0')
    //秒数
    let seconds = (date.getSeconds() + '').padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}