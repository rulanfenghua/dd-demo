let app = getApp()

Page({
  data: {
    hideList: true,
    authCode: ''
  },
  onLoad() {
    dd.showLoading()
    dd.getAuthCode({
      success: (res) => {
        dd.httpRequest({
          url: app.globalData.domain + '/emp/login',
          // url: app.globalData.domain + '/user/login',
          method: 'POST',
          // headers: { 'Content-Type': 'application/json' },
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
            console.log("httpRequestFailAuto----", res)
            dd.alert({
              content: JSON.stringify(res)
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
  // onLoad() {
  //   this.setData({
  //     hideList: false
  //   })
  // },
  // formSubmit(e) {
  //   console.log('formSubmit----', e.detail.value)

  //   dd.showLoading()
  //   dd.httpRequest({
  //     url: app.globalData.domain + '/user/login',
  //     method: 'POST',
  //     data: {
  //       phone: e.detail.value.phone,
  //       password: e.detail.value.password
  //     },
  //     dataType: 'json',
  //     success: (res) => {
  //       console.log('success----', res)

  //       if (res.data.code == 0) {
  //         app.globalData.level = res.level
  //         dd.switchTab({
  //           url: '/page/home/index/index'
  //         })
  //       } else {
  //         dd.alert({
  //           content: res.data.msg
  //         })
  //       }
  //     },
  //     fail: (res) => {
  //       console.log("httpRequestFail----", res)
  //       dd.alert({
  //         content: JSON.stringify(res)
  //       })
  //     },
  //     complete: () => {
  //       dd.hideLoading()
  //     }
  //   })
  // }
})