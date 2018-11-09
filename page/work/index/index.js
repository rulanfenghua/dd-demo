var app = getApp()

Page({
  data: {
    listContent: [
      {
        "icon": "",
        "text": "发布任务"
      },
      {
        "icon": "",
        "text": "领导表扬"
      },
      {
        "icon": "",
        "text": "管理奖扣"
      },
      {
        "icon": "",
        "text": "发布公告"
      }
    ],
    listMain: [
      {
        "icon": "/image/city.png",
        "text": "考勤"
      },
      {
        "icon": "/image/page.png",
        "text": "工作日志"
      },
      {
        "icon": "/image/task2.png",
        "text": "悬赏任务"
      },
      {
        "icon": "/image/test.png",
        "text": "申报积分"
      },
      {
        "icon": "/image/call.png",
        "text": "公告"
      },
      {
        "icon": "/image/to.png",
        "text": "爱心点赞"
      },
      {
        "icon": "/image/app.png",
        "text": "积分申诉"
      },
      {
        "icon": "/image/free.png",
        "text": "自由奖扣"
      },
      {
        "icon": "/image/book.png",
        "text": "经营哲学"
      },
      {
        "icon": "/image/question.png",
        "text": "水平考核"
      },
      {
        "icon": "/image/mall.png",
        "text": "积分商城"
      },
      {
        "icon": "/image/gift.png",
        "text": "积分抽奖"
      }
    ],

    hidden: true,
    data: {}
  },
  onShow() {
    if (app.globalData.level == '0') {
      this.setData({
        hidden: false
      })
    }

    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/work/index',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successWork----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailWork---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },

  onContentClick(e) {
    console.log(e.detail)
  },
  onMainClick(e) {
    console.log(e.detail)

    switch (e.detail.index) {
      case 3:
        dd.navigateTo({url: '../declare/index'});
        break;
      case 10:
        dd.navigateTo({url: '../market/index'});
        break;
    }
  },
  logs() {

  },
  wait() {

  },
  initiate() {

  },
  copy() {
    
  }
})