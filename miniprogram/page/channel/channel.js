Page({
    data :{
        china:{icon_font:"t-icon t-icon-chinamap",url:'../newslist/newslist?url=china', content:"国 内"},
        world:{icon_font:"t-icon t-icon-guoji",url:'../newslist/newslist?url=world', content:"国 际"},
        society:{icon_font:"t-icon t-icon-shehui",url:'../newslist/newslist?url=society', content:"社 会"},
        law:{icon_font:"t-icon t-icon-falvshengming",url:'../newslist/newslist?url=law', content:"法 治"},
        life:{icon_font:"t-icon t-icon-life_food",url:'../newslist/newslist?url=life', content:"生 活"},
        amusment:{icon_font:"t-icon t-icon-yule",url:'../newslist/newslist?url=ent', content:"文 娱"},
        science:{icon_font:"t-icon t-icon-keji",url:'../newslist/newslist?url=tech', content:"科 技"},
        economy:{icon_font:"t-icon t-icon-caijing",url:'../newslist/newslist?url=economy', content:"经 济"},
        edu:{icon_font:"t-icon t-icon-jiaoyu",url:'../newslist/newslist?url=edu', content:"教 育"},
        health:{icon_font:"t-icon t-icon-health",url:'../newslist/newslist?url=health', content:"健 康"},
        rollData:{icon_font:"t-icon t-icon-junshi",url:'../newslist/newslist?url=rollData', content:"军 事"},
        morenews:{icon_font:"t-icon t-icon-yonghuxinxianniu",url:'../newslist/newslist?url=news', content:"更 多"},
        wordslist: [],   //查询显示的备选单词项列表 
      },
      
      //获取输入的内容 
      searchInput:function(e){
        let value = e.detail.value;
        this.setData({
          inputText: value
        })
        this.getResult(value)
      },
      // 对获取的内容进行查询，获得结果
      getResult:function(q){
        var that = this;
        let url = `${"https://dict.youdao.com/suggest?le=eng&doctype=json&q="}${q}`   //q为传入的要查询的值
        wx.request({
          url: url,
          success: function(res) {
            let data = res.data.data
            var wordslist = []
            for(let i in data['entries']){
              wordslist.push([data['entries'][i].entry, data['entries'][i].explain])  //将单词名和释义加入wordlist
            }
            that.setData({wordslist: wordslist})
          }
        })
      },
      // 清空输入内容
      clearInput:function(){
        this.setData({
          inputText:''
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