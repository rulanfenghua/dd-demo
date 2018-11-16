var app = getApp()

Page({
  data: {
    items: [],
    search: '',
    active: false,
    url: '/work/declareBehavior',

    tabs: [{
        title: '行为积分'
      },
      {
        title: '品德积分'
      },
      {
        title: '业绩积分'
    }]
  },
  onShow() {
    this.listShow()
  },

  listShow() {
    dd.showLoading()

    dd.httpRequest({
      url: app.globalData.domain + this.data.url,
      method: 'POST',
      dataType: 'json',
      data: {
        pageNum: 1,
        pageSize: 20,
        search: this.data.search
      },
      success: (res) => {
        console.log('successDeclare----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailDeclare----", res)
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
    console.log('list点击', index)

    var title = this.data.items[index].behaviorTitle
    var content = this.data.items[index].behaviorContent
    var type = this.data.items[index].typeId
    var max = this.data.items[index].zuiDuoIntegral
    var min = this.data.items[index].zuiShaoIntegral
    var id = this.data.items[index].behaviorId
    var url = `./approve/index?title=${title}&content=${content}&type=${type}&max=${max}&min=${min}&id=${id}`

    dd.navigateTo({
      url: url
    })
  },
  handleTabClick({ index }) {
    switch (index) {
      case 0 :
      this.setData({
        url: '/work/declareBehavior'
      });
      this.listShow();
      break;
      case 1 :
      this.setData({
        url: '/work/declareMoral'
      });
      this.listShow();
      break;
      case 2:
      this.setData({
        url: '/work/declareResults'
      });
      this.listShow();
      break;
    }
  },
  handleTabChange({ index }) {

  }
}) 