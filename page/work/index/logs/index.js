let app = getApp()

Page({
  data: {
    items: []
  },
  onShow() {
    this.listShow()
  },
  listShow() {
    dd.showLoading({content: '加载中...'})

    dd.httpRequest({
      url: app.globalData.domain + '/work/approverLog',
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
  },
  onItemClick({index}) {
    console.log('list点击',index)

    var approvalId = this.data.items[index].approvalId
    dd.navigateTo({ url: `./details/index?approvalId=${approvalId}` })
  }
})