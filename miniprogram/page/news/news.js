// miniprogram/page/news/news.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',  
    focus_date: '',  //新闻日期
    content: [],     // 中文新闻内容
    englishContent: [],   // 英文新闻内容
    biaodian: [],  // 标点
    images: [],  // 新闻对应图片
    imgHeis:[],  // 图片集每一张对应的高度
    current: 0,  
    collected: false,  //文章收藏状态
    hid: [],  // 每一段落下标
    show: false,  // 查词框展示状态
    word:"",
    word_tip: [],   // 查询单词的释义
    ukphone:"",   // 对应单词音标
    usphone:"",
    word_collected: false,  //单词收藏状态
  },
  //获取轮播图片高度，调整swiper高度 
  imgH:function(e){
    // 获取屏幕宽度，以满足100%宽度，按比例计算图片高度
    var winWid = wx.getSystemInfoSync().windowWidth; 
    var imgh = e.detail.height;
    var imgw = e.detail.width;
    var imgHei = winWid*imgh/imgw + "px"
    var imgHeis = this.data.imgHeis
    // 将高度绑定至对应图片
    imgHeis[e.target.dataset['id']] = imgHei
    this.setData({
      imgHeis: imgHeis
    })
  },
  // 获取轮播current
  getCurrent:function(e){
    this.setData({
      current: e.detail.current
    })
  },
  // 文章收藏
  collectTap:function(e) {
    // 判断用户是否登录
    var that = this
    if(app.globalData.userInfo === null){
      wx.showModal({
        title: '提示',
        content: '您还未进行登录操作，请先登录！',
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../page/mine/mine',
            })
          } 
          // 用户点击取消
          else if (res.cancel) {
          }
        }
      })
    }
    // 判断收藏状态，添加或删除文章收藏
    else if(that.data.collected) {
      wx.cloud.callFunction({
        name: "deleteCollection",
        data: {
            username: app.globalData.userInfo.nickName,
            news: that.data.options,
        },
        success:function(){
          that.setData({collected: false})
        }
      })
    }
    else {
      wx.cloud.callFunction({
        name: "addCollection",
        data: {
            username: app.globalData.userInfo.nickName,
            news: that.data.options,
        },
        success:function(){
          that.setData({collected: true})
        }
      })
    }
  },
  // 将中文新闻内容翻译成英文
  translate:function(i){
    var that = this;
    let url = `${"https://fanyi.youdao.com/translate?doctype=json&i="}${this.data.content[i].replace("%", '')}` //‘%’在此翻译源中会产生错误，因此过滤
    wx.request({
      url: url,
      success:function(res){
        let data = res.data.translateResult[0]
        // 英文内容分为单词，空格和标点
        var englishContent = that.data.englishContent, english_text = '', biaodian = that.data.biaodian
        for (let x in data){
          english_text += data[x].tgt
        }
        // 将单词和标点分开，实现单个单词的点击
        englishContent[i] = english_text.match(RegExp(/[a-zA-Z]+/, 'g'))
        biaodian[i] = english_text.split(RegExp(/[a-zA-Z]+/, 'g'))
        that.setData({
          englishContent: englishContent,
          biaodian: biaodian
        })
      }
    })
  },
  // 获取单独段落
  trans:function(e){
    var a = this.data.hid;
    a[e.currentTarget.dataset.id] = true
    this.translate(e.currentTarget.dataset.id)
    this.setData({hid: a});
  },
  // 获取查词结果：对应单词释义，音标
  dictRes:function(word){
    var that = this;
    let url = `${"https://dict.youdao.com/jsonapi?q="}${word}`
    wx.request({
      url: url,
      success:function(res){
        var trs = res.data.ec.word[0].trs
        var tips = []
        for (let i in trs){
          var explain = trs[i]['tr'][0]['l']["i"][0]
          tips.push(explain)
        }
        that.setData({
          word_tip: tips,
          ukphone: res.data.ec.word[0].ukphone,
          usphone: res.data.ec.word[0].usphone
        })
      },
    })
  },
  // 显示查词框
  showDict: function (e) {
    var that = this
    this.setData({
        show: true,
        word: e.currentTarget.dataset.word
    })
    this.dictRes(e.currentTarget.dataset.word)
    // 查询单词是否收藏
    wx.cloud.callFunction({
      name: "countword",
      data: {word: e.currentTarget.dataset.word},
      success: function(res){
        that.setData({word_collected: res.result.total > 0})
      }
    })
  },
  // 关闭查词框显示
  close(){
    this.setData({
      show: false
    })
  },
  //单词收藏
  word_collect: function(e) {
    var that = this
    // 已收藏，删除单词收藏
    if(that.data.word_collected) {
      wx.cloud.callFunction({
        name: "deleteword",
        data:{word:that.data.word},
        success: function(){
          that.setData({word_collected: false})
        }
      })
    }
    // 未收藏，添加单词收藏
    else {
      wx.cloud.callFunction({
        name: "addword",
        data:{word:that.data.word, word_tip: that.data.word_tip, word_phone: that.data.ukphone},
        success: function(){
          that.setData({word_collected: true})
        }
      })
    }
  },
  /**s
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({options: {
      url: options.url,
      image: options.image,
      title: options.title
    }});
    // 获取并提取新闻内容
    wx.request({
      url: options.url,
      method: 'GET',
      success: function(res) {
          var content = res.data, images, content
          content = content.substring(content.indexOf('<!--repaste.body.begin-->'),content.indexOf('<!--repaste.body.end-->')) // 找到正文
          images = content.match(RegExp(/(?<=<img src=")(.*?)(?=" alt="")/, 'g')) // 提取图片
          for(var i in images) images[i] = 'https:'.concat(images[i]);
          if(images == null) that.setData({images: [options.image]})
          else that.setData({images: images})
          // 获取正文
          if(content.indexOf("playerParas);") > 0)content = content.substr(content.indexOf("playerParas);") + 13)
          content = content.replace(RegExp(/(&).*?(;)/, 'g'), '')
          content = content.replace(RegExp(/(<).*?(>)/, 'g'), '')
          content = content.replace(RegExp('网传图片', 'g'), '')
          content = content.replace("\n\n", "\n")
          content = content.split('\n')
          var news = [], hid = [], englishnews = [], biaodian = []
          for(var i in content ) if((content[i] + "###").indexOf("###") > 1){ // 去除空行
            news.push(content[i].replace("　", "  "));
            // 初始化that.data部分内容
            hid.push(false);
            englishnews.push([]);
            biaodian.push([]);
          }
          that.setData({title: options.title, focus_date: options.date, content: news, englishContent: englishnews, biaodian: biaodian, hid: hid})
      }
    });
    wx.cloud.callFunction({
      name: "countCollection",
      data: {
          username: app.globalData.userInfo.nickName,
          news: that.data.options,
      },
      success:function(res){
        that.setData({collected: res.result.total > 0})
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.data.title,
      path: '/page/user?id=123'
    }
  }
})