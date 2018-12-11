var app = getApp()

Page({
  data: {
    loading: false,
    
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
    toFilePaths: [],

    showFilter: false,
    to: [],

    data: 0, // 表扬积分
  },

  onLoad() {
    // dd.httpRequest({
    //   url: app.globalData.domain + '/work/declareBehaviorDetail/approverPel',
    //   method: 'POST',
    //   dataType: 'json',
    //   success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
    //     console.log('successApps----', res)
    //     this.setData({
    //       apps: res.data.data
    //     })
    //   },
    //   fail: (res) => {
    //     console.log("httpRequestFailApps----", res)
    //     dd.alert({
    //       content: JSON.stringify(res),
    //       buttonText: '确定'
    //     })
    //   },
    //   complete: () => {
    //   }
    // })

    // dd.httpRequest({
    //   url: app.globalData.domain + '/work/selectSysUser',
    //   method: 'POST',
    //   dataType: 'json',
    //   success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
    //     console.log('successUser----', res)
    //     var user = []
    //     user.push(res.data.data)

    //     this.setData({
    //       user: user
    //     })
    //   },
    //   fail: (res) => {
    //     console.log("httpRequestFailUser----", res)
    //     dd.alert({
    //       content: JSON.stringify(res),
    //       buttonText: '确定'
    //     })
    //   },
    //   complete: () => {
    //   }
    // })
  },
  onShow() {
    dd.httpRequest({
      url: app.globalData.domain + '/leader/leaderAvailableIntegral',
      method: 'POST',
      dataType: 'json',
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successPoints----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailPoints----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
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
    // var from = that.data.user[values.detail.value.from].userId
    // var to = that.data.users[e.detail.value.to].userId
    var to = []
    that.data.to.forEach((item) => {
      to.push(item.userId)
    })
    // var apps = that.data.apps[values.detail.value.app].userId
    var approvalTitle = values.detail.value.title
    var approvalContent = values.detail.value.content

    // console.log(!approvalTitle || !approvalContent || !points)

    if (!approvalTitle || !approvalContent || !points) {
      dd.showToast({
        type: 'fail',
        duration: 3000,
        content: '请您填写关键内容'
      })
      that.setData({
        loading: false
      })
      return
    }
    if (to.length == 0) {
      dd.showToast({
        type: 'fail',
        duration: 3000,
        content: '请您选择奖扣员工'
      })
      that.setData({
        loading: false
      })
      return
    }
    if (points * to.length > this.data.data) {
      dd.showToast({
        type: 'fail',
        duration: 3000,
        content: '您的表扬积分不足'
      })
      that.setData({
        loading: false
      })
      return
    }

    console.log('toFilePaths', that.data.toFilePaths)

    dd.httpRequest({
      url: app.globalData.domain + '/leader/leaderIntegral',
      method: 'POST',
      dataType: 'json',
      data: {
        addIntegral: points,
        approvalImg: that.data.toFilePaths,
        spRemark: textarea,
        typeId: typeId,
        from: to,
        approvalTitle: approvalTitle,
        approvalContent: approvalContent,
        dateTime: ''
      },
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successApp----', res)
        dd.showToast({
          duration: 3000,
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
          buttonText: '确定'
        })
      },
      complete: () => {
        that.setData({
          loading: false
        })
      }
    })
  },
  uploadImage(values, fnSubmit) {
    // 表单验证
    var points = values.detail.value.points
    var approvalTitle = values.detail.value.title
    var approvalContent = values.detail.value.content
    if (!approvalTitle || !approvalContent || !points) {
      dd.showToast({
        type: 'fail',
        duration: 3000,
        content: '请您填写关键内容'
      })
      this.setData({
        loading: false
      })
      return
    }

    let success = 0
    let _this = this
    let toFilePaths = []
    for (let index = 0; index < this.data.filePaths.length; index++) {
      dd.uploadFile({
        url: app.globalData.domain + '/upload/uploadFile',
        fileType: 'image',
        fileName: 'file',
        filePath: this.data.filePaths[index],
        success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
          success++
          console.log('dbImg', res)
          var regex = /:"(.*)","msg"/
          var path = res.data.match(regex)[1]
          toFilePaths.push(path)
          if (success == _this.data.filePaths.length) {
            _this.setData({
              toFilePaths: toFilePaths
            })
            // console.log(_this.data.toFilePaths)
            fnSubmit(values, _this)
          }
        },
        fail: function(res) {
          dd.alert({
            content: JSON.stringify(res),
            buttonText: '确定'
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
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('chooseImage', res)
        if (res && res.apFilePaths) {
          this.setData({
            filePaths: res.apFilePaths,
          })
          console.log(this.data.filePaths)
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
  showFilter() {
    this.setData({
      showFilter: !this.data.showFilter,
    })
  },
  to(to) {
    this.setData({
      to: to
    })
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
  },

  // 图片组件
  load() {
    this.setData({
      loading: false
    })
  },
  filePaths(toFilePaths) {
    this.setData({
      toFilePaths: toFilePaths
    })
  }
})