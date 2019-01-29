var app = getApp()

Page({
  data: {
    // listContent: [
    //   {
    //     "icon": "/image/nothing.png",
    //     "text": "发布任务"
    //   },
    //   {
    //     "icon": "/image/praise.png",
    //     "text": "积分表扬"
    //   },
    //   {
    //     "icon": "/image/manage.png",
    //     "text": "管理奖扣"
    //   },
    //   {
    //     "icon": "/image/push.png",
    //     "text": "发布公告"
    //   }
    // ],
    listContent: [
      {
        "icon": "/image/nothing.png",
        "text": "发布任务"
      },
      {
        "icon": "/image/manage.png",
        "text": "管理奖扣"
      }
    ],
    // listMain: [
    //   {
    //     "icon": "/image/city.png",
    //     "text": "考勤"
    //   },
    //   {
    //     "icon": "/image/page.png",
    //     "text": "工作日志"
    //   },
    //   {
    //     "icon": "/image/task2.png",
    //     "text": "悬赏任务"
    //   },
    //   {
    //     "icon": "/image/test.png",
    //     "text": "申报积分"
    //   },
    //   {
    //     "icon": "/image/call.png",
    //     "text": "公告"
    //   },
    //   {
    //     "icon": "/image/to.png",
    //     "text": "爱心点赞"
    //   },
    //   {
    //     "icon": "/image/app.png",
    //     "text": "积分申诉"
    //   },
    //   {
    //     "icon": "/image/free.png",
    //     "text": "自由奖扣"
    //   },
    //   {
    //     "icon": "/image/book.png",
    //     "text": "经营哲学"
    //   },
    //   {
    //     "icon": "/image/question.png",
    //     "text": "水平考核"
    //   },
    //   {
    //     "icon": "/image/mall.png",
    //     "text": "积分商城"
    //   },
    //   {
    //     "icon": "/image/gift.png",
    //     "text": "积分抽奖"
    //   }
    // ],
    listMain: [
      {
        "icon": "/image/task2.png",
        "text": "悬赏任务"
      },
      {
        "icon": "/image/test.png",
        "text": "申报积分"
      },
      {
        "icon": "/image/to.png",
        "text": "爱心点赞"
      },
      {
        "icon": "/image/free.png",
        "text": "自由奖励"
      },
      {
        "icon": "/image/app.png",
        "text": "积分申诉"
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
    data: {},

    count: 0, // 任务数量标识
  },
  onShow() {
    console.log('level', app.globalData.level)
    if (app.globalData.level != 'common' && app.globalData.level != 'admin') {
      this.setData({
        hidden: false
      })
    }

    dd.httpRequest({
      url: app.globalData.domain + '/task/selectTaskNum',
      method: 'GET',
      dataType: 'json',
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

        console.log('successNum----', res)
        this.setData({
          count: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailNum----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      },
      complete: () => {
      }
    })

    dd.showLoading({content: '加载中...'})
    dd.httpRequest({
      url: app.globalData.domain + '/work/countLogNun',
      method: 'POST',
      dataType: 'json',
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

        console.log('successWork----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailWork----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },

  onContentClick(e) {
    console.log(e.detail)

    switch (e.detail.index) {
      case 1:
        dd.navigateTo({url: '../take/index'})
        break;
      case 0:
        dd.navigateTo({url: '../publish/index'})
        break;
      case 2:
        // dd.alert({ content: '正在测试，敬请期待', buttonText: '确定' })
        // dd.navigateTo({url: '../take/index'})
        break;
      case 3:
        break;
    }
  },
  onMainClick(e) {
    console.log(e.detail)

    switch (e.detail.index) {
      case 1:
        dd.navigateTo({url: '../declare/index'})
        break;
      case 5:
        // dd.alert({ content: '正在测试，敬请期待', buttonText: '确定' })
        dd.navigateTo({url: '../market/index'})
        break;
      case 3:
        // dd.alert(
        //   {
        //     content: '正在测试，敬请期待',
        //     buttonText: '确定'
        //   }
        // )
        dd.navigateTo({ url: '../award/index' })
        break;
      case 6:
        // dd.alert({ content: '正在测试，敬请期待', buttonText: '确定' })
        break;
      case 2:
        dd.navigateTo({ url: '../like/index' })
        break;
      case 0:
        dd.navigateTo({ url: '../bounty/index' })
        break;
    }
  },
  logs() {
    dd.navigateTo({ url: './logs/index' })
  },
  wait() {
    dd.navigateTo({ url: './wait/index' })
  },
  initiate() {
    dd.navigateTo({ url: './from/index' })
  },
  copy() {
    dd.navigateTo({ url: './to/index' })
  }
})