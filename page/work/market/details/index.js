let app = getApp()

Page({
  data: {
    options: {},
    imgs: [],

    data: '0'
  },

  onLoad(options) {
    console.log(options)
    var imgs = options.goodLbImg.split(',')
    this.setData({
      options: options,
      imgs: imgs
    })
  },
  onShow() {
    dd.httpRequest({
      url: app.globalData.domain + '/integralGoods/selectIntegralGoodsDetailRecordCountNum/' + this.data.options.goodId,
      method: 'POST',
      dataType: 'json',
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successMarketDetails----', res)
        this.setData({
          data: res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailMarketDetails----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
      }
    })
  },

  change() {
    // dd.alert({ content: '正在测试，敬请期待', buttonText: '确定' })
    if (this.data.options.goodKc == 0) {
      dd.showToast({
        type: 'exception',
        duration: 3000,
        content: '没有存货了',
      })
      return
    }
    if (this.data.options.dhIntegral > this.data.options.data) {
      dd.alert({
        content: '您的积分不足，请赚取积分后再做兑换！'
      })
      return
    }
    dd.confirm({
      title: '温馨提示',
      content: `确定兑换 ${this.data.options.goodName} 吗？`,
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
              goodId: this.data.options.goodId
            },
            success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
              console.log('successMarketChange----', res)
              dd.showToast({
                type: 'success',
                duration: 3000,
                content: '兑换成功',
              })
            },
            fail: (res) => {
              console.log("httpRequestFailMarketChange----", res)
              dd.alert({
                content: JSON.stringify(res),
                buttonText: '确定'
              })
            },
            complete: () => {
              dd.hideLoading()
              dd.navigateBack()
            }
          })
        }
      }
    })
  },
  toDetails() {
    var id = this.data.options.goodId
    dd.navigateTo({ url: `../logs/index?id=${id}` })
  },
})