const app = getApp();

// miniprogram/page/history/history.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        datelist: null,
        newslist: null,
        last_time: 0,
    },
    // 清空历史记录
    deleteAll: function(e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除所有历史记录吗？(左划记录删除单条)',
            success: function (res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        name: "deleteAllHistory",
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
    // 删除单条历史记录
    deleteHistory: function (e) {
        var that = this;
        var date = e.currentTarget.dataset.item
        wx.showModal({
            title: '提示',
            content: '确定要删除此条历史记录吗？',
            success: function (res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        name: "deleteHistory",
                        data: {news: that.data.newslist[date][e.currentTarget.dataset.id]},
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
    // 更新历史记录 删除再添加记录(改变历史记录的顺序)
    bindHistory: function (e) {
        var that = this;
        var date = e.currentTarget.dataset.item
        wx.cloud.callFunction({
            name: "deleteHistory",
            data: {news: that.data.newslist[date][e.currentTarget.dataset.id]},
            success(res) {
                wx.cloud.callFunction({
                    name: "addHistory",
                    data: {
                        username: app.globalData.userInfo.nickName,
                        news: that.data.newslist[date][e.currentTarget.dataset.id],
                    },
                })
            }
        })
    },
    // 获取云数据库存储的历史记录
    getList:function(){
        var that = this;
        wx.cloud.callFunction({
            name: "getHistory",
            success: function(res) {
                var list = res.result.data.reverse()
                var datelist = [], newslist = {}, date, date2, tmp = []
                for(var i in list) { // 根据日期对数据进行区分
                    date2 = (new Date(list[i].upTime).getMonth() + 1).toString() + '-' + new Date(list[i].upTime).getDate().toString()
                    if (date != date2 && date != undefined) {
                        datelist.push(date)
                        newslist[date] = tmp;
                        tmp = []
                    }
                    tmp.push(list[i].news)
                    date = date2;
                }
                datelist.push(date)
                newslist[date] = tmp;
                that.setData({datelist: datelist, newslist: newslist})
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList();
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