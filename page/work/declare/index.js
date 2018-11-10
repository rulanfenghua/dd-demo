var app = getApp()

Page({
  ...Dropdown,
  data: {
    items: [],
    value: '',

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
    dd.showLoading()
    var list = false
    var tabs = false

    dd.httpRequest({
      url: app.globalData.domain + '/work/declare/tabs',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successDeclareTabs----', res)
        // this.setData({
        //   'dropdownSelectData.listData[0].data': res.data.data.behavior,
        //   'dropdownSelectData.listData[1].data': res.data.data.moral,
        //   'dropdownSelectData.listData[2].data': res.data.data.performance
        // })
      },
      fail: (res) => {
        console.log("httpRequestFailDeclareTabs---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        list = true
        if (list && tabs) {
          dd.hideLoading()
        }
      }
    })
    dd.httpRequest({
      url: app.globalData.domain + '/work/declare',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successDeclare----', res)
        this.setData({
          items: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailDeclare---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        tabs = true
        if (list && tabs) {
          dd.hideLoading()
        }
      }
    })
  },

  onItemClick({ index }) {
    console.log('list点击', index)

    var title = this.data.items[index].title
    var content = this.data.items[index].content
    var url = `./approve/index?title=${title}&content=${content}`

    console.log(url)
    dd.navigateTo({
      url: url
    })
  },
  handleTabClick({ index }) {

  },
  handleTabChange({ index }) {

  }
}) 