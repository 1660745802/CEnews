// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
/*
 * 删 收藏单词
 * 入参 word
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    return await db.collection('word').where({
      _openid: wxContext.OPENID,
      word: event.word
    }).remove()
}