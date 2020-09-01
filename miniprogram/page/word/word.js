// miniprogram/page/word/word.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        wordlist: [],
    },
    // 获取用户收藏单词
    getlist: function() {
      var that=this
        wx.cloud.callFunction({
            name:"getword",
            success:function(res){
                var wordlist = res.result.data
                for(var i in wordlist) wordlist[i].word_collected=true
                console.log(wordlist) 
                that.setData({wordlist: wordlist})
            }
        })
    },
    // 取消单词收藏
    word_collect: function(e) {
        var that = this
        var wordlist = that.data.wordlist
        if(wordlist[e.currentTarget.dataset.id].word_collected) {
          console.log(wordlist[e.currentTarget.dataset.id].word)
          wx.cloud.callFunction({
            name: "deleteword",
            data:{word: wordlist[e.currentTarget.dataset.id].word},
            success: function(){
                console.log("success")
                wordlist[e.currentTarget.dataset.id].word_collected = false
                that.setData({wordlist: wordlist})
            }
          })
        } 
        // 取消收藏后点击重新添加
        else {
          wx.cloud.callFunction({
            name: "addword",
            data:{word:wordlist[e.currentTarget.dataset.id].word, word_tip: wordlist[e.currentTarget.dataset.id].word_tip, word_phone: wordlist[e.currentTarget.dataset.id].word_phone},
            success: function(){
                wordlist[e.currentTarget.dataset.id].word_collected = true
                that.setData({wordlist: wordlist})
            }
          })
        }
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getlist();
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
      this.getlist();
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