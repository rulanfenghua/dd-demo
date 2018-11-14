let app = getApp()

Page({
  data: {
    items: [],

    tabs: [
      { title: '按日' },
      { title: '按月' },
      { title: '按季' },
      { title: '按年' }
    ],

    times: 1
  },
  onShow() {
    this.showList()
  },
  onReachBottom() {
    this.showList()
  },

  showList() {
    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/rank/index',
      method: 'POST',
      data: {
        pageNum: 1,
        pageSize: 20,
        deptId: '',
        postId: '',
        typeId: '',
        times: this.data.times,
        spTime1: '',
        spTime2: '',
        searchName: ''
      },
      dataType: 'json',
      success: (res) => {
        console.log('successRank----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRank---", res)
        dd.alert({
          content: JSON.stringify(res)
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
    this.setData({
      times: index + 1
    })

    this.showList()
  },
  handleTabChange({ index }) {
    this.setData({
      items: index + 1
    })

    this.showList()
  }
})