var app = getApp()

Page({
  data: {
    data: {},
    options: {},
    status: 0,

    items: [],
    activeIndex: 1,
    failIndex: 0
  },

  onLoad(options) {
    console.log(options)

    this.setData({
      options: options,
      status: options.status
    })
  },

  onShow() {
    this.listShow()
  },

  listShow() {
    dd.showLoading({content: '加载中...'})
    var approvalId = this.data.options.approvalId

    dd.httpRequest({
      url: app.globalData.domain + '/approversPel/selectApproversDetail/' + approvalId,
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: (res) => {
        console.log('successWaitDetail----', res)

        var items = []
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

        this.setData({
          data: res.data.data,
          items: items
        })
      },
      fail: (res) => {
        console.log("httpRequestFailWaitDetail----", res)
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

  todo() {
    var approvalId = this.data.options.approvalId
    var status = this.data.status

    dd.httpRequest({
      url: app.globalData.domain + '/approversPel/approversYesNo/' + approvalId +'/'+ status,
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: (res) => {
        console.log('successWaitDetailYes----', res)

        this.listShow()
      },
      fail: (res) => {
        console.log("httpRequestFailWaitDetailYes----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '好的'
        })
      },
      complete: () => {
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

  preview(e) {
    console.log(e)
    dd.previewImage({
      current: e.target.dataset.index,
      urls: this.data.data.approvalImg
    })
  }
})