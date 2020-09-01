# #云开发挑战赛#-CEnews-关于我啥也不懂来比赛这档事

## 作品简介

### 作品介绍
>CE双语新闻，中英无门槛快速阅读，文章点击自动翻译，最新资讯随时看，陌生单词一点明。

### 应用场景

> 本作品提供优质正规新闻，用中英双语呈现内容，随时收藏分享；遇见陌生单词，点击即可查询，支持添加至单词本，随时复习。当您空闲下来掏出手机想阅读最新资讯，又不想被“震惊”标题党轰炸时，当您想要学习英文，但又被生涩难懂的原文阻扰时，本作品便是您使最好的选择。

### 架构
  ![](https://raw.githubusercontent.com/1660745802/CEnews/master/jiagou.png)
  ![](https://raw.githubusercontent.com/1660745802/CEnews/master/jiagou1.png)
### 作品体验二维码
  ![](https://raw.githubusercontent.com/1660745802/CEnews/master/tiyan.jpg)
## 部署教程

1. 获取GitHub代码

   > `git clone https://github.com/1660745802/CEnews.git`

2. 将cloudfunctions内函数上传并部署到云端 

3. 添加数据库集合

   > collection
   > history
   > suggestions
   > word

   数据库结构

   + collection
     - username
     - news
       - image
       - title
       - url
   + history
     - username
     - upTime
     - news
       - brief
       - focus_date
       - image
       - keywords
       - title
       - url
   + suggestions
     - suggestion
     - username
   + word
     - word
     - word_phone
     - word_tip

4. 在开发工具本地设置中勾选不校验合法域名  
   或者在小程序管理页面中添加以下request合法域名:

   > https://api.ai.qq.com;https://btrace.qq.com;https://cm.l.qq.com;https://dict.youdao.com;https://fanyi.youdao.com;https://i.news.qq.com;https://img.lssdjt.com;https://lssdjt.com;https://military.cctv.com;https://new.qq.com;https://news.cctv.com;https://open.iciba.com;https://photo.cctv.com;https://tmt.tencentcloudapi.com;https://translate.google.cn;https://tv.cctv.com;
"# CEnews" 
"# CEnews" 
