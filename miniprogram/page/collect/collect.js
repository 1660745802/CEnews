const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        newslist: [], // 收藏新闻列表记录
        last_time: null,
    },
    // 获取收藏记录
    getList:function(){
        var that = this;
        wx.cloud.callFunction({
            name: "getCollection",
            success: function(res) {
                that.setData({newslist: res.result.data.reverse()})
            }
        })
    },
    // 删除单条收藏记录
    deleteCollection: function (e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除此条收藏吗？',
            success: function (res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        name: "deleteCollection",
                        data: {news: that.data.newslist[e.currentTarget.dataset.id].news},
                        success: function(res2) {
                            wx.showToast({
                                title: '删除成功',
                            })
                            that.getList();
                        }
                    })
                }
            }
        });
    },
    // 清空收藏记录
    deleteAll: function(e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除所有收藏吗？(左划记录删除单条)',
            success: function (res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        name: "deleteAllCollection",
                        success: function(res2) {
                            wx.showToast({
                                title: '删除成功',
                            })
                            that.getList();
                        }
                    })
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList()
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
    // 页面刷新
    onPullDownRefresh: function () {
        if(new Date().getTime() - this.data.last_time >= 3000) {
            this.getList()
            this.setData({last_time: new Date().getTime()});
            wx.showToast({
                title: '刷新成功',
                icon : "none",
                duration: 1000
            })
        }
        else wx.showToast({
                title: '操作太快了, 等一会吧',
                icon : "none",
                duration: 1000
        })
        wx.stopPullDownRefresh()
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