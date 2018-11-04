let app = getApp()

Page({
  data: {
    hideList: true
  },
  onLoad() {
    dd.showLoading()
    dd.getAuthCode({
      success: (res) => {
        dd.httpRequest({
          url: app.globalData.domain + '/loginAuto',
          method: 'POST',
          data: {
            authCode: res.authCode
          },
          dataType: 'json',
          success: (res) => {
            console.log('successAuto----', res)
            app.globalData.level = res.level
            dd.switchTab({
              url: '/page/home/index/index'
            })
          },
          fail: (res) => {
            console.log("httpRequestFailAuto---", res)
            dd.alert({
              content: JSON.stringify(err)
            })
          },
          complete: () => {
            dd.hideLoading()
          }
        })
      },
      fail: (err) => {
        console.log("getAuthCodeFailAuto---", err)
        this.setData({
          hideList: false
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },
  formSubmit(e) {
    console.log('formSubmit----', e.detail.value)

    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/login',
      method: 'POST',
      data: {
        phone: e.detail.value.phone,
        password: e.detail.value.password
      },
      dataType: 'json',
      success: (res) => {
        console.log('success----', res)
        app.globalData.level = res.level
        dd.switchTab({
          url: '/page/home/index/index'
        })
      },
      fail: (res) => {
        console.log("httpRequestFail---", res)
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