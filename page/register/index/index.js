let app = getApp()

Page({
  data: {
    hideList: true,
    authCode: ''
  },
  onLoad() {
    dd.showLoading({content: '加载中...'})
    dd.getAuthCode({
      success: (res) => {
        dd.httpRequest({
          url: app.globalData.domain + '/empp/login',
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
  //   const _this = this
  //   dd.getStorage({
  //     key: 'login',
  //     success(res) {
  //       console.log("storage----", res)
  //       if (res.data) {
  //         dd.showLoading({ content: '登陆中...' })
  //         dd.httpRequest({
  //           url: app.globalData.domain + '/user/login',
  //           method: 'POST',
  //           data: {
  //             phone: res.data.phone,
  //             password: res.data.password
  //           },
  //           dataType: 'json',
  //           success: (res) => {
  //             console.log('success----', res)

  //             if (res.data.code == 0) {
  //               app.globalData.level = res.data.msg
  //               dd.switchTab({
  //                 url: '/page/home/index/index'
  //               })
  //             } else {
  //               _this.setData({
  //                 hideList: false
  //               })
  //               dd.alert({
  //                 content: res.data.msg,
  //                 buttonText: '好的'
  //               })
  //             }
  //           },
  //           fail: (res) => {
  //             console.log("httpRequestFail----", res)
  //             dd.alert({
  //               content: JSON.stringify(res),
  //               buttonText: '好的'
  //             })
  //           },
  //           complete: () => {
  //             dd.hideLoading()
  //           }
  //         })
  //       } else {
  //         _this.setData({
  //           hideList: false
  //         })
  //       }
  //     },
  //     fail(res) {
  //       dd.alert({
  //         content: JSON.stringify(res),
  //         buttonText: '好的'
  //       })
  //     }
  //   })
  // },
  formSubmit(e) {
    console.log('formSubmit----', e.detail.value)

    dd.showLoading({content: '登陆中...'})
    dd.httpRequest({
      url: app.globalData.domain + '/user/login',
      method: 'POST',
      data: {
        phone: e.detail.value.phone,
        password: e.detail.value.password
      },
      dataType: 'json',
      success: (res) => {
        console.log('success----', res)

        if (res.data.code == 0) {
          app.globalData.level = res.data.msg
          dd.setStorage({
            key: 'login',
            data: {
              phone: e.detail.value.phone,
              password: e.detail.value.password
            },
            success() {
              dd.switchTab({
                url: '/page/home/index/index'
              })
            }
          })
        } else {
          dd.alert({
            content: res.data.msg,
            buttonText: '好的'
          })
        }
      },
      fail: (res) => {
        console.log("httpRequestFail----", res)
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