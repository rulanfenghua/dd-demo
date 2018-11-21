var app = getApp()

Page({
  data: {
    loading: false,
    height: '',
    
    users: [],
    apps: [],
    user: [], // 申请人
    types: [
      {
        type: '品德积分',
        typeId: 1
      },
      {
        type: '业绩积分',
        typeId: 2
      },
      {
        type: '行为积分',
        typeId: 3
      }
    ],

    arrIndexFrom: 0,
    arrIndexApp: 0,
    arrIndexTo: 0,
    arrIndexType: 2,

    filePaths: [],

    showFilter: false,
    active: false,
    search: '',

    to: []
  },

  onLoad() {
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
    let that = this

    if (!this.data.filePaths.length) {
      this.submit(e, that)
    }
    else {
      this.uploadImage(e, this.submit)
    }
  },
  submit(values, that) {
    console.log('this', that)
    var points = values.detail.value.points
    var textarea = values.detail.value.textarea
    var typeId = that.data.types[values.detail.value.types].typeId
    var from = that.data.user[values.detail.value.from].userId
    // var to = that.data.users[e.detail.value.to].userId
    var to = []
    that.data.to.forEach((item) => {
      to.push(item.userId)
    })
    var apps = that.data.apps[values.detail.value.app].userId
    var approvalTitle = values.detail.value.title
    var approvalContent = values.detail.value.content

    if (!approvalTitle || !approvalContent || !points) {
      dd.showToast({
        type: 'fail',
        content: '请您填写关键内容'
      })
      that.setData({
        loading: false
      })
      return
    }

    dd.httpRequest({
      url: app.globalData.domain + '/free/freeIntegralApprover',
      method: 'POST',
      dataType: 'json',
      data: {
        addIntegral: points,
        approvalImg: that.data.filePaths,
        spRemark: textarea,
        typeId: typeId,
        from: [from],
        to: to,
        apps: [apps],
        approvalTitle: approvalTitle,
        approvalContent: approvalContent
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
        that.setData({
          loading: false
        })
      }
    })
  },
  uploadImage(value, fnSubmit) {
    let success = 0
    let _this = this
    let toFilePaths = []
    for (let index = 0; index < this.data.filePaths.length; index++) {
      dd.uploadFile({
        url: app.globalData.domain + '/upload/uploadFile',
        fileType: 'image',
        fileName: 'file',
        filePath: this.data.filePaths[index],
        success: (res) => {
          success++
          console.log(res)
          toFilePaths.push(res.data.data)
          if (success == _this.data.filePaths.length) {
            _this.setData({
              toFilePaths: toFilePaths
            })
            fnSubmit(value, _this)
          }
        },
        fail: function(res) {
          dd.alert({
            content: JSON.stringify(res),
            buttonText: '好的'
          })
          _this.setData({
            loading: false
          })
        },
      })
    }
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
      arrIndexType: e.detail.value,
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
    // this.allUsers()
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

    // var users = this.data.users
    // var index = users.findIndex((item) => item.userId == this.data.to[e.target.dataset.index].userId)
    // users[index].checked = false
    // console.log(index, users)
    // this.setData({
    //   users: users
    // })

    // var to = this.data.to
    // to.splice(e.target.dataset.index, 1)
    // this.setData({
    //   to: to
    // })
  }
})