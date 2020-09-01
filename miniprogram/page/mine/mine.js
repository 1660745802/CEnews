// miniprogram/page/mine/mine.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
      collect: {icon_font:"t-icon t-icon-qizhi_xian",url: '../collect/collect', content: '我的收藏'},
      word: {icon_font:"t-icon t-icon-favorite",url: '../word/word', content: '我的单词'},
      history: {icon_font:"t-icon t-icon-history",url: '../history/history', content: '浏览记录'},
      feedback: {icon_font:"t-icon t-icon-xiangxixinxi",url: '../feedback/feedback', content: '问题反馈'},
      loginstate: "登录",
      oneButton: [{text: '确定'}],
      userInfo: app.globalData.userInfo,  //获取的用户信息
    },

    // 获取用户登录信息：头像，名称，openid
    fetchInfo:function(){
      var that = this;
      wx.getUserInfo({
        success:function(res){
          wx.cloud.callFunction({
            name: "get_id",
            success:function(res1){
              app.initUserInfo(res.userInfo, res1.result.openid);
              that.setData({
              userInfo: app.globalData.userInfo
          });
        }
        })
      } 
      })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})