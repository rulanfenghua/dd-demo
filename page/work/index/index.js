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
        "icon": "/image/城市.svg",
        "text": "考勤"
      },
      {
        "icon": "/image/使用文档.svg",
        "text": "工作日志"
      },
      {
        "icon": "/image/执行反馈.svg",
        "text": "悬赏任务"
      },
      {
        "icon": "/image/测试申请.svg",
        "text": "申报积分"
      },
      {
        "icon": "/image/广播.svg",
        "text": "公告"
      },
      {
        "icon": "/image/赞.svg",
        "text": "爱心点赞"
      },
      {
        "icon": "/image/提案审批.svg",
        "text": "积分申诉"
      },
      {
        "icon": "/image/待办事项.svg",
        "text": "自由奖扣"
      },
      {
        "icon": "/image/配网引导.svg",
        "text": "经营哲学"
      },
      {
        "icon": "/image/问题解答.svg",
        "text": "水平考核"
      },
      {
        "icon": "/image/商城.svg",
        "text": "积分商城"
      },
      {
        "icon": "/image/奖品.svg",
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