var app = getApp()

Page({
  data: {
    loading: false,
    
    users: [],
    apps: [],
    user: [], // 申请人
    types: [],

    arrIndexFrom: 0,
    arrIndexApp: 0,
    arrIndexTo: 0,
    arrIndexType: 2,

    filePaths: [],
    toFilePaths: [],

    showFilter: false,
    to: [],

    data: 0, // 奖励积分
    pointsArray: [], // 积分选择
    arrIndexPoints: 0,

    date1: '',
    date2: '',
    date: ''
  },

  onLoad() {
    var date = this.format(Date.now(), 'yyyy-MM-dd')
    this.setData({
      date1: date,
      date2: date,
      date: date
    })

    dd.httpRequest({
      url: app.globalData.domain + '/rank/selectType',
      method: 'POST',
      dataType: 'json',
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}
        console.log('successType----', res)
        this.setData({
          types: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailUser----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});
      },
      complete: () => {
      }
    })

    // dd.showLoading({ content: '加载中...' })
    dd.httpRequest({
      url: app.globalData.domain + '/leader/leaderAvailableIntegral',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        if (res.data && res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }) }
        console.log('successPoints----', res)
        var pointsArray = []
        var max = 500
        var median = 0
        if (res.data.data <= 500) {
          max= res.data.data
        }
        
        pointsArray.push(median)
        while (median < parseInt(max)) {
          median += 10
          pointsArray.push(median)
        }

        this.setData({
          pointsArray: pointsArray,
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailPoints----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      },
      complete: () => {
        // dd.hideLoading()
      }
    })
  },
  onShow() {
    
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
    var points = that.data.pointsArray[values.detail.value.points]
    var textarea = values.detail.value.textarea
    var typeId = that.data.types[values.detail.value.types].id
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

    if (!approvalTitle || !points || !approvalContent) {
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
    if (points * 3 > this.data.data) {
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
      url: app.globalData.domain + '/releaseTask/saveReleTask',
      method: 'POST',
      dataType: 'json',
      data: {
        taskIntegral: points,
        // approvalImg: that.data.toFilePaths,
        remark: textarea,
        integralTypeId: typeId,
        deptId: to,
        title: approvalTitle,
        content: approvalContent,
        taskTypeId: 1, // 任务类型
        peopleNum: 3, // 抢单人数
        startTime: this.data.date1,
        endTime: this.data.date2
      },
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}
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
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});
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
        success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

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
          var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});
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
      arrIndexPoints: e.detail.value,
    });
  },

  chooseImage() {
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 9,
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

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
  },

  datePicker1() {
    dd.datePicker({
      format: 'yyyy-MM-dd',
      startDate: this.data.date,
      success: (res) => {
        console.log(res)
        if (res.date > this.data.date2) {
          this.setData({
            date1: res.date,
            date2: res.date
          })
        } else {
          this.setData({
            date1: res.date
          })
        }
      },
      fail: () => {
        dd.showToast({
          content: '取消选择', // 文字内容
        })
      }
    });
  },

  datePicker2() {
    dd.datePicker({
      format: 'yyyy-MM-dd',
      startDate: this.data.date1,
      success: (res) => {
        console.log(res)
        this.setData({
          date2: res.date
        })
      },
      fail: () => {
        dd.showToast({
          content: '取消选择', // 文字内容
        })
      }
    });
  },

  // 时间格式
  format(time, fmt) {
    var date = new Date(time)
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
})