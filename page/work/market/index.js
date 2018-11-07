let app = getApp()

Page({
  data: {
    data: {},
    items: [],

    width: '',
    height: ''
  },
  onShow() {
    dd.getSystemInfo({
      success: (res) => {
        var width = res.windowWidth/2 - 21
        var height = width/2*3 - 10
        this.setData({
          width: width,
          height: height
        })
      }
    })

    dd.showLoading()
    var data = false
    var items = false

    dd.httpRequest({
      url: app.globalData.domain + '/work/market',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successMarket----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailMarket---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        data = true
        if (data && items) {
          dd.hideLoading()
        }
      }
    })
    dd.httpRequest({
      url: app.globalData.domain + '/work/market/list',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successMarketList----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailMarketList---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        items = true
        if (data && items) {
          dd.hideLoading()
        }
      }
    })
  },
  onReachBottom() {
    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/work/market/list',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successMarketList----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailMarketList---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  }
})