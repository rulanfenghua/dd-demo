let app = getApp()

Page({
  data: {
    items: [],

    tabs: [
      { title: '按日' },
      { title: '按月' },
      { title: '按季' },
      { title: '按年' }
    ]
  },
  onShow() {
    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/rank',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successRank----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRank---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },
  onReachBottom() {
    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/rank',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successRank----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRank---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },

  onItemClick({index}) {
    console.log('list点击', index)
  },
  handleTabClick({ index }) {

  },
  handleTabChange({ index }) {

  }
})