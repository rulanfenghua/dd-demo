let app = getApp()

Page({
  data: {
    items: [],
    data: {},
    first: {}
  },
  onShow() {
    dd.httpRequest({
      url: app.globalData.domain + '/home/index',
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: (res) => {
        console.log('successHome----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log('httpRequestFailHome----', res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
      }
    })

    dd.httpRequest({
      url: app.globalData.domain + '/home/indexFirst',
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: (res) => {
        console.log('successHomeFirst----', res)
        this.setData({
          first: res.data.data
        })
      },
      fail: (res) => {
        console.log('httpRequestFailHomeFirst----', res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
      }
    })

    this.listShow()
  },
  onReachBottom() {
    this.listShow()
  },

  listShow() {
    dd.showLoading({content: '加载中...'})

    dd.httpRequest({
      url: app.globalData.domain + '/home/list',
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      data: {
        pageNum: 1,
        pageSize: 1000
      },
      success: (res) => {
        console.log('successHomeList----', res)
        res.data.data.list.forEach((item) => {
          item.approvalImg1 = item.approvalImg1.split(',')
        })
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log('httpRequestFailHomeList---', res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },

  rankTo() {
    dd.switchTab({
      url: '/page/rank/index/index'
    })
  },
  onItemClick({index}) {
    console.log('list点击', index)

    var approvalId = this.data.items[index].approvalId
    dd.navigateTo({ url: `/page/work/index/logs/details/index?approvalId=${approvalId}` })
  },

  preview(e) {
    console.log(e)
    dd.previewImage({
      current: e.target.dataset.index,
      urls: this.data.items.approvalImg1
    })
  }
})
