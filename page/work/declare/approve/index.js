Page({
  data: {
    options: {},
    
    objectArray: [
      {
        id: 0,
        name: '美国',
      },
      {
        id: 1,
        name: '中国',
      },
      {
        id: 'from',
        name: '巴西',
      },
      {
        id: 3,
        name: '日本',
      },
    ],
    arrIndexFrom: 0,
    arrIndexApp: 0,
    arrIndexTo: 0,

    filePaths: [],
  },

  onLoad(options) {
    console.log(options)

    this.setData({
      options: options
    })
  },
  formSubmit(e) {
    console.log('formSubmit----', e.detail.value)

    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/work/addIntegralApprover',
      method: 'POST',
      dataType: 'json',
      data: {
        
      },
      success: (res) => {
        console.log('successApp----', res)
      },
      fail: (res) => {
        console.log("httpRequestFailApp---", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },

  changeFrom(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndexFrom: e.detail.value,
    });
  },
  changeApp(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndexApp: e.detail.value,
    });
  },
  changeTo(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndexTo: e.detail.value,
    });
  },

  chooseImage() {
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 2,
      success: (res) => {
        // dd.alert({
        //   content: JSON.stringify(res),
        // });
        console.log(res.filePaths)
        if (res && res.filePaths) {
          this.setData({
            filePaths: res.filePaths,
          });
        }
      },
      fail: () => {
        dd.showToast({
          content: '取消选择', // 文字内容
        });
      }
    })
  },
})