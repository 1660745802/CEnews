var app=getApp();
// miniprogram/page/feedback/feedback.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        last_time: 0,
    },
    // 获取并上传反馈内容，返回相应提示
    bindFormSubmit: function(e) {
    const db = wx.cloud.database()
    const suggestion = db.collection("suggestions")
    if(e.detail.value.textarea == '')
        wx.showToast({
            title: '这明明什么都没有鸭。(╬▔皿▔)凸',
            icon : "none",
            duration: 1500
        })
    else if(new Date().getTime() - this.data.last_time >= 60000) {
        var time = new Date().getTime
        suggestion.add({
            data: {
                username: app.globalData.userInfo.nickName,
                suggestion: e.detail.value.textarea,
                upTime: time
            }
        })
        wx.showToast({
            title: '感谢您的支持, 我们会虚心采纳。(～￣▽￣)～',
            icon : "none",
            duration: 1500
        })
        this.setData({last_time: new Date().getTime()});
    }
    else
        wx.showToast({
            title: '刚才才提交过啦, 等会再来吧。(￣_￣|||)',
            icon : "none",
            duration: 1500
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