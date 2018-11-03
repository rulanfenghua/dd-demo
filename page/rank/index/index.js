let app = getApp()

Page({
  data: {
    items: []
  },
  onShow() {
    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/rank',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successRank----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRank---", res)
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
    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/rank',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successRank----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRank---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },
  onItemClick({index}) {
    console.log('list点击', index)
  }
})