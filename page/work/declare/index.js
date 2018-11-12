var app = getApp()

Page({
  data: {
    items: [],

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
    
    dd.httpRequest({
      url: app.globalData.domain + '/work/declareBehavior',
      method: 'POST',
      dataType: 'json',
      data: {
        pageNum: 1,
        pageSize: 20,
        search: ''
      },
      success: (res) => {
        console.log('successDeclare----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailDeclare---", res)
        dd.alert({
          content: JSON.stringify(err)
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
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

  },
  handleTabChange({ index }) {

  }
}) 