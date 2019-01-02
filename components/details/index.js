var app = getApp()

Component({
  props: {
    options: {},
    steps: true
  },
  data: {
    data: {},
    status: 0,

    items: [],
    activeIndex: 1,
    failIndex: 0,

    type: false, // 支票积分类型判断
  },

  didMount() {
    if (this.props.options.status) {
      this.setData({
        status: this.props.options.status
      })
    }
    this.listShow()
  },

  didUpdate() {
    
  },

  methods:{
    listShow() {
      dd.showLoading({ content: '加载中...' })
      var approvalId = this.props.options.approvalId

      dd.httpRequest({
        url: app.globalData.domain + '/approversPel/selectApproversDetail/' + approvalId,
        method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
        dataType: 'json',
        success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
          console.log('successWaitDetail----', res)
          var items = []
          if (!res.data.data.integralTypeId) {
            this.setData({
              type: true
            })
            items.push({
              title: `${res.data.data.appName}  开出积分支票`,
              description: `${res.data.data.appDept}  ${res.data.data.sqTime}`
            })
          } else {
            items.push({
              title: `${res.data.data.userName}  提交审批`,
              description: `${res.data.data.userDept}  ${res.data.data.sqTime}`
            })

            if (res.data.data.status == 1) {
              items.push({
                title: `${res.data.data.appName}  审批通过`,
                description: `${res.data.data.appDept}  ${res.data.data.spTime}`
              })

              this.setData({
                activeIndex: 2
              })
            } else if (res.data.data.status == 0) {
              items.push({
                title: `${res.data.data.appName}  审批中`,
                description: `${res.data.data.appDept}`
              })
            } else if (res.data.data.status == 2) {
              items.push({
                title: `${res.data.data.appName}  审批不过`,
                description: `${res.data.data.appDept}  ${res.data.data.spTime}`
              })

              this.setData({
                failIndex: 2
              })
            }
          }
          this.setData({
            data: res.data.data,
            items: items
          })
        },
        fail: (res) => {
          console.log("httpRequestFailWaitDetail----", res)
          var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});
        },
        complete: () => {
          dd.hideLoading()
        }
      })
    },

    todo(status) {
      dd.confirm({
        title: '提示',
        content: '确认审批吗？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          if (result.confirm) {
            var approvalId = this.props.options.approvalId
            var status = this.data.status
            dd.showLoading({
              content: '审批中...'
            })
            dd.httpRequest({
              url: app.globalData.domain + '/approversPel/approversYesNo/' + approvalId + '/' + status,
              method: 'GET',
              // headers: { 'Content-Type': 'application/json' },
              dataType: 'json',
              success: (res) => {
                if (res.data && res.data.code == 2018) {
                  dd.showToast({
                    content: res.msg,
                    duration: 3000
                  });
                  dd.reLaunch({
                    url: '/page/register/index/index'
                  })
                }
                console.log('successWaitDetailYes----', res)
                dd.showToast({
                  content: '审批成功',
                  duration: 3000
                })
                this.listShow()
              },
              fail: (res) => {
                console.log("httpRequestFailWaitDetailYes----", res)
                var content = JSON.stringify(res);
                switch (res.error) {
                  case 13:
                    content = '连接超时';
                    break;
                  case 12:
                    content = '网络出错';
                    break;
                  case 19:
                    content = '访问拒绝';
                }
                dd.alert({
                  content: content,
                  buttonText: '确定'
                });
              },
              complete: () => {
                dd.hideLoading()
              }
            })
          }
        }
      })
    },

    todoPass() {
      this.setData({
        status: 1
      })

      this.todo()
    },
    todoStop() {
      this.setData({
        status: 2
      })

      this.todo()
    },
    todoBack() {
      // this.setData({
      //   status: 3
      // })

      // this.todo()

      dd.navigateBack()
    },
    fromBack() {
      dd.confirm({
        title: '提示',
        content: '确认撤销吗？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (result) => {
          if (result.confirm) {
            var approvalId = this.props.options.approvalId
            dd.showLoading({
              content: '提交中...'
            })
            dd.httpRequest({
              url: app.globalData.domain + '/userMenu/selectDelMenu/' + approvalId,
              method: 'GET',
              // headers: { 'Content-Type': 'application/json' },
              dataType: 'json',
              success: (res) => {
                if (res.data && res.data.code == 2018) {
                  dd.showToast({
                    content: res.msg,
                    duration: 3000
                  });
                  dd.reLaunch({
                    url: '/page/register/index/index'
                  })
                }
                console.log('successWaitDetailYes----', res)
                dd.showToast({
                  content: '提交成功',
                  duration: 3000
                })
                dd.navigateBack()
              },
              fail: (res) => {
                console.log("httpRequestFailWaitDetailYes----", res)
                var content = JSON.stringify(res);
                switch (res.error) {
                  case 13:
                    content = '连接超时';
                    break;
                  case 12:
                    content = '网络出错';
                    break;
                  case 19:
                    content = '访问拒绝';
                }
                dd.alert({
                  content: content,
                  buttonText: '确定'
                });
              },
              complete: () => {
                dd.hideLoading()
              }
            })
          }
        }
      })
    },

    preview(e) {
      console.log(e)
      dd.previewImage({
        current: e.target.dataset.index,
        urls: this.data.data.approvalImg
      })
    }
  }
})