var app = getApp()

Page({
  data: {
    data: {},
    options: {},

    items: [],
    activeIndex: 1,
    failIndex: 0
  },

  onLoad(options) {
    console.log(options)

    this.setData({
      options: options
    })
  },

  onShow() {
    this.listShow()
  },

  listShow() {
    dd.showLoading()
    var approvalId = this.data.options.approvalId

    dd.httpRequest({
      url: app.globalData.domain + '/work/approverLogDetail/' + approvalId,
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: (res) => {
        console.log('successLogsDetail----', res)

        var items = []
        items.push({
          title: `${res.data.data.userName}  提交审批`,
          description: `${res.data.data.userDept}  ${res.data.data.sqTime}`
        })
        if (res.data.data.spTime && res.data.data.status == 1) {
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
        console.log("httpRequestFailLogsDetail----", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },
})