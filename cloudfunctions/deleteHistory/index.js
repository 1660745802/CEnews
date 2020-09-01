// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
/*
 * 删 浏览历史
 * 入参 news
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    return await db.collection('history').where({
      _openid: wxContext.OPENID,
      news: event.news
    }).remove()
}