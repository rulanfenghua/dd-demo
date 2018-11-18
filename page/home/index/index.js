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
          buttonText: '好的'
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
          buttonText: '好的'
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
        pageNum: '1',
        pageSize: '20'
      },
      success: (res) => {
        console.log('successHomeList----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log('httpRequestFailHomeList---', res)
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

  rankTo() {
    dd.switchTab({
      url: '/page/rank/index/index'
    })
  },
  onItemClick({index}) {
    console.log('list点击', index)
  }
})
