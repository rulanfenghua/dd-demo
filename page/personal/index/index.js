let app = getApp()

Page({
  data: {
    data: {},

    height: ''
  },
  onShow() {
    dd.getSystemInfo({
      success: (res) => {
        var height = res.windowHeight-65
        this.setData({
          height: height
        })
      }
    })

    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/personal',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successPersonal----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailPersonal---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },
})