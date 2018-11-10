let app = getApp()

Page({
  data: {
    items: []
  },
  onShow() {
    this.listShow()
  },
  listShow() {
    dd.showLoading()

    dd.httpRequest({
      url: app.globalData.domain + '/work/approverLog',
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: (res) => {
        console.log('successLogsList----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailLogsList---", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },
  onItemClick({index}) {
    console.log('list点击',index)
  }
})