var app = getApp()

Page({
  data: {
    options: {},
    loading: false,
    height: '',
    
    users: [],
    apps: [],
    user: [], // 申请人

    pointsArray: [],
    arrIndexFrom: 0,
    arrIndexApp: 0,
    arrIndexTo: 0,
    arrIndexPoints: 0,

    filePaths: [],

    showFilter: false,
    active: false,
    search: '',

    to: []
  },

  onLoad(options) {
    console.log(options)

    var pointsArray = []
    var median = parseInt(options.min ? options.min : '0')
    pointsArray.push(median)
    while (median < parseInt(options.max)) {
      median += 10
      pointsArray.push(median)
    }

    this.setData({
      options: options,
      pointsArray: pointsArray
    })

    // dd.httpRequest({
    //   url: app.globalData.domain + '/work/declareBehaviorDetail/selectAllUser',
    //   method: 'POST',
    //   dataType: 'json',
    //   data: {
    //     pageSize: 1000,
    //     pageNum: 1
    //   },
    //   success: (res) => {
    //     console.log('successUsers----', res)
    //     var users = res.data.data.list

    //     this.setData({
    //       users: users
    //     })
    //   },
    //   fail: (res) => {
    //     console.log("httpRequestFailUsers----", res)
    //     dd.alert({
    //       content: JSON.stringify(res),
    //       buttonText: '好的'
    //     })
    //   },
    //   complete: () => {
    //   }
    // })

    this.allUsers()

    dd.httpRequest({
      url: app.globalData.domain + '/work/declareBehaviorDetail/approverPel',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successApps----', res)
        this.setData({
          apps: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailApps----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '好的'
        })
      },
      complete: () => {
      }
    })

    dd.httpRequest({
      url: app.globalData.domain + '/work/selectSysUser',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successUser----', res)
        var user = []
        user.push(res.data.data)

        this.setData({
          user: user
        })
      },
      fail: (res) => {
        console.log("httpRequestFailUser----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '好的'
        })
      },
      complete: () => {
      }
    })
  },
  onShow() {
    dd.getSystemInfo({
      success: (res) => {
        // var width = res.windowWidth
        var height = res.windowHeight
        this.setData({
          // width: width,
          height: height
        })
      }
    })
  },

  allUsers() {
    dd.showLoading({ content: '加载中...' })
    dd.httpRequest({
      url: app.globalData.domain + '/work/declareBehaviorDetail/selectAllUser',
      method: 'POST',
      dataType: 'json',
      data: {
        pageSize: 1000,
        pageNum: 1,
        search: this.data.search
      },
      success: (res) => {
        console.log('successUsers----', res)
        var users = res.data.data.list

        this.setData({
          users: users
        })
      },
      fail: (res) => {
        console.log("httpRequestFailUsers----", res)
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

  formSubmit(e) {
    console.log('formSubmit----', e.detail.value)
    this.setData({
      loading: true
    })

    var points = this.data.pointsArray[e.detail.value.points]
    var textarea = e.detail.value.textarea
    var typeId = this.data.options.type
    var from = this.data.user[e.detail.value.from].userId
    // var to = this.data.users[e.detail.value.to].userId
    var to = []
    this.data.to.forEach((item) => {
      to.push(item.userId)
    })
    var apps = this.data.apps[e.detail.value.app].userId
    var approvalTitle = this.data.options.title
    var approvalContent = this.data.options.content
    var approvalId = this.data.options.id

    dd.httpRequest({
      url: app.globalData.domain + '/work/addIntegralApprover',
      method: 'POST',
      dataType: 'json',
      data: {
        addIntegral: points,
        approvalImg: [],
        spRemark: textarea,
        typeId: typeId,
        from: [from],
        to: to,
        apps: [apps],
        approvalTitle: approvalTitle,
        approvalContent: approvalContent,
        approvalId: approvalId
      },
      success: (res) => {
        console.log('successApp----', res)
        dd.showToast({
          content: '申请成功', // 文字内容
        })
        dd.navigateBack({
          delta: 2
        })
      },
      fail: (res) => {
        console.log("httpRequestFailApp----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '好的'
        })
      },
      complete: () => {
        this.setData({
          loading: false
        })
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
  changePoints(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndexPoints: e.detail.value,
    });
  },

  chooseImage() {
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 9,
      success: (res) => {
        // dd.alert({
        //   content: JSON.stringify(res),
        // });
        console.log(res)
        if (res && res.apfilePaths) {
          this.setData({
            filePaths: res.apfilePaths,
          });
        }
      },
      fail: () => {
        dd.showToast({
          content: '取消选择', // 文字内容
        })
      }
    })
  },

  // 多选组件
  addFilter() {
    this.setData({
      showFilter: true
    })
  },

  showSelect() {
    
  },

  handleSearch(e) {
    this.setData({
      search: e.detail.value
    })
    this.allUsers()
  },
  clearSearch() {
    this.setData({
      search: '',
      active: false,
    })
    this.allUsers()
    dd.hideKeyboard()
  },
  focusSearch() {
    this.setData({
      active: true
    })
  },
  blurSearch() {
    this.setData({
      active: false
    })
  },
  doneSearch() {
    this.allUsers()
    dd.hideKeyboard()
  },

  back() {
    this.setData({
      showFilter: false
    })
  },
  onReset(e) {
    this.setData({
      to: []
    })
  },
  onSubmit(e) {
    console.log('onSubmit', e.detail.value.to);

    this.setData({
      to: e.detail.value.to,
      showFilter: false
    })
  },
  onChange(e) {
  },

  deleteUser(e) {
    // 删除头像
    console.log(e)

    // 由于无法传值废弃
  }
})