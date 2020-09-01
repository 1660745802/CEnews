// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
/*
 * 增 新闻收藏
 * 入参 username, news
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    return await db.collection('collection').add({
      data: {
        _openid: wxContext.OPENID,
        username: event.username,
        news: event.news,
      }
    })
}