let app = getApp()

Page({
  data: {
    items: [],
    data: {}
  },
  onShow() {
    dd.httpRequest({
      url: app.globalData.domain + '/home/index',
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: (res) => {
        console.log('successHome----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailHome---", res)
        dd.alert({
          content: JSON.stringify(res)
        })
        dd.hideLoading()
      },
      complete: () => {
      }
    })

    this.listShow()
  },
  onReachBottom() {
    this.listShow()
  },

  listShow() {
    dd.showLoading()

    dd.httpRequest({
      url: app.globalData.domain + '/home/list',
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      data: {
        pageNum: '1',
        pageSize: '20'
      },
      success: (res) => {
        console.log('successHomeList----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailHomeList---", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },

  rankTo() {
    dd.switchTab({
      url: '/page/rank/index/index'
    })
  },
  onItemClick({index}) {
    console.log('list点击',index)
  }
})