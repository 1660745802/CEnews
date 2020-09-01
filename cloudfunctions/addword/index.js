// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
/*
 * 增 收藏单词
 * 入参 word, word_tip, word_phone
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    return await db.collection('word').add({
      data: {
        _openid: wxContext.OPENID,
        word: event.word,
        word_tip: event.word_tip,
        word_phone: event.word_phone
      }
    })
}