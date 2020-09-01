var app = getApp();
// miniprogram/page/newslist/newslist.js
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    list: [],
    content: [], 
    news_num: 5,   // 显示新闻数
    type: "news",  
    imgUrl: null
  },
  // 获取首页顶部图
  getDaytext:function(){
    var that = this;
    wx.request({
      url: 'https://open.iciba.com/dsapi/',
      success: function(result) {
        that.setData({
          imgUrl: result.data.fenxiang_img
        })
      },
    })
  },
  // 删除再添加记录(改变历史记录的顺序)
  bindHistory: function (e) {
      var that = this;
      wx.cloud.callFunction({
          name: "deleteHistory",
          data: {news: that.data.list[e.currentTarget.dataset.id]},
          success: function() {
              wx.cloud.callFunction({
                  name: "addHistory",
                  data: {
                      username: app.globalData.userInfo.nickName,
                      news: that.data.list[e.currentTarget.dataset.id],
                  },
              })
          }
      })
  },
  // 获取当前scroll，判断是否显示返回顶部按钮
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  // 点击返回顶部
  back_top: function(){
    wx.pageScrollTo({
      duration: 870,
      scrollTop: 0,
    }),
    this.onPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取新闻列表
  onLoad: function (options) {
    var that = this;
    this.getDaytext();
    wx.request({
      url: 'https://news.cctv.com/2019/07/gaiban/cmsdatainterface/page/###_1.jsonp?cb=###'.replace(RegExp('###', 'g'), that.data.type),
      method: 'GET',
      success: function(res) {
        var obj = res.data.substring(31 + that.data.type.length, res.data.length - 5), content = []
        // 处理原始数据
        obj = obj.split("},{")
        for(var i in obj) obj[i] = '{'.concat(obj[i].concat('}'));
        for(var i in obj) obj[i] = JSON.parse(obj[i]);
        for(var i in obj) obj[i].focus_date = obj[i].focus_date.substring(5, 16);
        for(var i in obj) if(obj[i].url.indexOf('photo') == -1 && obj[i].url.indexOf('tv.cctv') == -1) content.push(obj[i])
        that.setData({content: content, list: content.slice(0, that.data.news_num)});
      }
    })
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
  // 页面刷新，获取最新新闻
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      currentTab : 0,
      news_num: 5
    })
    wx.request({
      url: 'https://news.cctv.com/2019/07/gaiban/cmsdatainterface/page/###_1.jsonp?cb=###'.replace(RegExp('###', 'g'), that.data.type),
      method: 'GET',
      success: function(res) {
        var obj = res.data.substring(31 + that.data.type.length, res.data.length - 5), content = []
        obj = obj.split("},{")
        for(var i in obj) obj[i] = '{'.concat(obj[i].concat('}'));
        for(var i in obj) obj[i] = JSON.parse(obj[i]);
        for(var i in obj) obj[i].focus_date = obj[i].focus_date.substring(5, 16);
        for(var i in obj) if(obj[i].url.indexOf('photo') == -1 && obj[i].url.indexOf('tv.cctv') == -1) content.push(obj[i])
        that.setData({content: content, list: content.slice(0, that.data.news_num)});
        wx.showToast({
          title: '刷新成功',
          icon : "none",
          duration: 1000
        })
      }
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // 下划到底加载新闻，直到最大数
  onReachBottom: function () {
    var that = this;
    var news_num = that.data.news_num + 5;
    if(news_num >= that.data.content.length){
      wx.showToast({
        title: '已经到底了╯︿╰',
        icon : "none",
        duration: 1500
      })
    }
    else that.setData({list: that.data.content.slice(0, news_num), news_num: news_num});
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})