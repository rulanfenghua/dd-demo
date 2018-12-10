var app = getApp()

Page({
  data: {
    items: [],
    search: '',
    status: 0,
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
    dd.showLoading({content: '加载中...'})

    dd.httpRequest({
      url: app.globalData.domain + '/work/selectMyFq',
      method: 'POST',
      dataType: 'json',
      data: {
        pageNum: 1,
        pageSize: 1000,
        status: this.data.status, // tab栏审批未审批
        search: this.data.search
      },
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successWait----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log('httpRequestFailWait----', res)
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

  handleSearch(e) {
    this.setData({
      search: e.detail.value
    })
    // this.listShow()
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
          status: 0
        });
        this.listShow();
        break;
      case 1:
        this.setData({
          status: 1
        });
        this.listShow();
        break;
    }
  },
  handleTabChange({ index }) {

  }
})