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
        "icon": "",
        "text": "考勤"
      },
      {
        "icon": "",
        "text": "工作日志"
      },
      {
        "icon": "",
        "text": "悬赏任务"
      },
      {
        "icon": "",
        "text": "申报积分"
      },
      {
        "icon": "",
        "text": "公告"
      },
      {
        "icon": "",
        "text": "爱心点赞"
      },
      {
        "icon": "",
        "text": "积分申诉"
      },
      {
        "icon": "",
        "text": "自由奖扣"
      },
      {
        "icon": "",
        "text": "经营哲学"
      },
      {
        "icon": "",
        "text": "水平考核"
      },
      {
        "icon": "",
        "text": "积分商城"
      },
      {
        "icon": "",
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
      url: app.globalData.domain + '/work',
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