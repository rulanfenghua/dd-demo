let app = getApp()

Page({
  data: {
    data: '',
    items: [],

    width: '',
    height: '',
    windowHeight: '',
    bottomHeight: '',

    goods: [],
    sum: 0
  },
  onReady() {
    
  },
  onShow() {
    dd.getSystemInfo({
      success: (res) => {
        var width = res.windowWidth / 2 - 21
        var height = width / 2 * 3 - 10
        var windowHeight = res.windowHeight

        this.setData({
          width: width,
          height: height,
          windowHeight: windowHeight
        })
      }
    })

    dd.httpRequest({
      url: app.globalData.domain + '/integralGoods/selectIntegralGoodsKYIntegral',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successMarket----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailMarket----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '好的'
        })
      },
      complete: () => {
      }
    })
    this.showList()
  },

  showList() {
    dd.showLoading({content: '加载中...'})

    dd.httpRequest({
      url: app.globalData.domain + '/integralGoods/selectIntegralGoodsList',
      method: 'POST',
      dataType: 'json',
      data: {
        pageSize: 1000,
        pageNum: 1
      },
      success: (res) => {
        console.log('successMarketList----', res)
        
        var items = res.data.data.list
        items.forEach((item) => {
          if (this.data.goods.some((good) => good.goodId == item.goodId)) {
            item.active = true
          } else {
            items.active = false
          }
        })
        this.setData({
          items: items
        })
        // dd.createSelectorQuery().select('#bottom').boundingClientRect().exec((ret) => {
        //   var bottomHeight = this.data.goods.length == 0 ? '' : ret[0].height
        //   console.log('botttomHeight', bottomHeight)
        //   this.setData({
        //     bottomHeight: bottomHeight
        //   })
        // })
      },
      fail: (res) => {
        console.log("httpRequestFailMarketList----", res)
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
  onReachBottom() {
    this.showList()
  },

  change() {
    dd.alert({ content: '正在测试，敬请期待', buttonText: '好的' })
  },

  choose(e) {
    console.log(e)
    // var items = this.data.items
    // items.forEach((value) => {
    //   if (value.goodId == item.goodId) {
    //     value.active = true
    //   }
    // })
    var item = e.currentTarget.dataset.item
    var goods = this.data.goods
    if (item.active) {
      dd.showToast({
        type: 'exception',
        content: '您已经选择了一个了',
      })
      return
    }
    goods.push(item)

    var sum = 0
    goods.forEach((good) => {
      sum += good.dhIntegral
    })

    this.setData({
      goods: goods,
      sum: sum
    })
    this.showList()
  },
  delete(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var goods = this.data.goods

    var index = goods.findIndex((good) => good.goodId == id)
    goods.splice(index, 1)
    var sum = 0
    goods.forEach((good) => {
      sum += good.dhIntegral
    })

    this.setData({
      goods: goods,
      sum: sum
    })
    this.showList()
  },

  confirm() {
    dd.alert({ content: '正在测试，敬请期待', buttonText: '好的' })
  }
})