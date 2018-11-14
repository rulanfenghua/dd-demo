let app = getApp()

Page({
  data: {
    data: '',
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

    dd.httpRequest({
      url: app.globalData.domain + '/integralGoods/selectIntegralGoodsKYIntegral',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successMarket----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailMarket----", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
      }
    })
    this.showList()
  },

  showList() {
    dd.showLoading()

    dd.httpRequest({
      url: app.globalData.domain + '/integralGoods/selectIntegralGoodsList',
      method: 'POST',
      dataType: 'json',
      data: {
        pageSize: 20,
        pageNum: 1
      },
      success: (res) => {
        console.log('successMarketList----', res)
        this.setData({
          items: res.data.data.list
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
  },
  onReachBottom() {
    this.showList()
  }
})