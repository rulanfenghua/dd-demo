let app = getApp()

Page({
  data: {
    items: [],
    data: {}
  },
  onShow() {
    dd.showLoading()
    var home = false
    var list = false

    dd.httpRequest({
      url: app.globalData.domain + '/home',
      method: 'POST',
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
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        home = true
        if (home && list) {
          dd.hideLoading()
        }
      }
    })
    dd.httpRequest({
      url: app.globalData.domain + '/home/list',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successHomeList----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailHomeList---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        list = true
        if (home && list) {
          dd.hideLoading()
        }
      }
    })
  },
  onReachBottom() {
    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/home/list',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successHome----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailHome---", res)
        dd.alert({
          content: JSON.stringify(err)
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