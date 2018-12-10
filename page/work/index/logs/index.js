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
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successLogsList----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailLogsList----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },
  onItemClick({ index }) {
    console.log('list点击', index)

    var approvalId = this.data.items[index].approvalId
    dd.navigateTo({ url: `./details/index?approvalId=${approvalId}` })
  }
})