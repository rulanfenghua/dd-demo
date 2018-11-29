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

    this.showList()
  },

  showList() {
    dd.showLoading({content: '加载中...'})

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
          item.goodImg = item.goodLbImg.split(',')[0]
          if (item.goodKc == 0) {
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

  logs() {
    dd.navigateTo({ url: './logs/index' })
  },
  change(e) {
    // dd.alert({ content: '正在测试，敬请期待', buttonText: '好的' })
    if (e.currentTarget.dataset.item.goodKc == 0) {
      dd.showToast({
        type: 'exception',
        content: '没有存货了',
      })
      return
    }
    if (e.currentTarget.dataset.item.dhIntegral > this.data.data) {
      dd.alert({
        content: '您的积分不足，请赚取积分后再做兑换！',
        buttonText: '好的'
      })
      return
    }
    dd.confirm({
      title: '温馨提示',
      content: `确定兑换 ${e.currentTarget.dataset.item.goodName} 吗？`,
      confirmButtonText: '兑换',
      cancelButtonText: '再看看',
      success: (result) => {
        if (result.confirm) {
          dd.showLoading({content: '兑换中...'})
          dd.httpRequest({
            url: app.globalData.domain + '/integralGoods/selectIntegralAddGoods',
            method: 'POST',
            dataType: 'json',
            data: {
              goodId: e.currentTarget.dataset.item.goodId
            },
            success: (res) => {
              console.log('successMarketChange----', res)
              dd.showToast({
                type: 'success',
                content: '兑换成功',
              })
            },
            fail: (res) => {
              console.log("httpRequestFailMarketChange----", res)
              dd.alert({
                content: JSON.stringify(res),
                buttonText: '好的'
              })
            },
            complete: () => {
              dd.hideLoading()
              this.showList()
            }
          })
        }
      }
    })
  },
  toDetails(e) {
    var goodId = e.currentTarget.dataset.item.goodId
    var goodName = e.currentTarget.dataset.item.goodName
    var goodKc = e.currentTarget.dataset.item.goodKc
    var ydhNum = e.currentTarget.dataset.item.ydhNum
    var goodLbImg = e.currentTarget.dataset.item.goodLbImg
    var dhIntegral = e.currentTarget.dataset.item.dhIntegral
    var data = this.data.data
    dd.navigateTo({ url: `./details/index?goodId=${goodId}&goodName=${goodName}&goodKc=${goodKc}&ydhNum=${ydhNum}&goodLbImg=${goodLbImg}&dhIntegral=${dhIntegral}&data=${data}` })
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