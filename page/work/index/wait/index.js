var app = getApp()

Page({
  data: {
    items: [],
    search: '',
    status: 1,
    active: false,

    tabs: [{
      title: '待审批'
    },
    {
      title: '已审批'
    }]
  },
  onShow() {
    this.listShow()
  },
  listShow() {
    dd.showLoading()

    dd.httpRequest({
      url: app.globalData.domain + '/approversPel/selectApproversList',
      method: 'POST',
      dataType: 'json',
      data: {
        pageNum: 1,
        pageSize: 20,
        status: this.data.status,
        search: this.data.search
      },
      success: (res) => {
        console.log('successWait----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailWait----", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },

  handleSearch(e) {
    this.setData({
      search: e.detail.value
    })
  },
  clearSearch() {
    this.setData({
      search: '',
      active: false
    })
    this.listShow()
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
    this.listShow()
    dd.hideKeyboard()
  },

  onItemClick({ index }) {
    var approvalId = this.data.items[index].approvalId
    var status = this.data.items[index].status
    dd.navigateTo({ url: `./details/index?approvalId=${approvalId}&status=${status}` })
  },

  handleTabClick({ index }) {
    switch (index) {
      case 0:
        this.setData({
          status: 1
        });
        this.listShow();
        break;
      case 1:
        this.setData({
          status: 2
        });
        this.listShow();
        break;
    }
  },
  handleTabChange({ index }) {

  }
})