//app.js
App({
  globalData:{
    userInfo: null  //用户信息
  },
  onLaunch: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo){
      this.globalData.userInfo = userInfo;
    }

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'li1660745802-xpoq1',
        traceUser: true,
      })
    }
  },
  //获取信息并存到本地
  initUserInfo:function(res,res1){
    var info = {
      nickName: res.nickName,   
      avatarUrl: res.avatarUrl,
      openid: res1
    }
    this.globalData.userInfo = info
    wx.setStorageSync('userInfo',info)
  }
})
