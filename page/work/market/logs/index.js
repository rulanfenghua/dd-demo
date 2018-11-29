let app = getApp()

Page({
  data: {
    options: {},
    items: []
  },
  onLoad(options) {
    console.log(options)

    this.setData({
      options: options
    })
  },
  onShow() {
    this.listShow()
  },
  listShow() {
    dd.showLoading({content: '加载中...'})

    var url = !this.data.options.id ? '/integralGoods/selectIntegralGoodsRecord' : '/integralGoods/selectIntegralGoodsDetailRecord/' + this.data.options.id
    dd.httpRequest({
      url: app.globalData.domain + url,
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      data: {
        pageSize: 1000,
        pageNum: 1
      },
      success: (res) => {
        console.log('successLogsList----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailLogsList----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '好的'
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  }
})