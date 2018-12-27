var app = getApp()

Page({
  data: {
    options: {},
    items: []
  },

  onLoad(options) {
    console.log(options)

    this.setData({
      options: options
    })
  },

  onDraw(ddChart, F2) {
    //dd-charts组件内部会回调此方法，返回图表实例ddChart
    //提示：可以把异步获取数据及渲染图表逻辑放onDraw回调里面
    var chartDataNew = []
    ddChart.clear()
    dd.httpRequest({
      url: app.globalData.domain + '/personal/indexEcharts',
      method: 'POST',
      data: {
        userId: this.data.options.userId
      },
      dataType: 'json',
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successEcharts----', res)
        
        chartDataNew.push({
          title: '扣除积分',
          points: res.data.data.delIntegral
        })
        chartDataNew.push({
          title: '奖励积分',
          points: res.data.data.addIntegral
        })
        chartDataNew.push({
          title: '基础积分',
          points: res.data.data.baseIntegral
        })
        chartDataNew.push({
          title: '总积分',
          points: res.data.data.countIntegral
        })
      },
      fail: (res) => {
        console.log("httpRequestFailEcharts----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
        ddChart.source(chartDataNew, {
          population: {
            tickCount: 5
          }
        })
        ddChart.coord({
          transposed: true
        })
        ddChart.axis('title', {
          line: F2.Global._defaultAxis.line,
          grid: null
        })
        ddChart.axis('points', {
          line: null,
          grid: F2.Global._defaultAxis.grid,
          label: function label(text, index, total) {
            var textCfg = {};
            if (index === 0) {
              textCfg.textAlign = 'left';
            } else if (index === total - 1) {
              textCfg.textAlign = 'right';
            }
            return textCfg;
          }
        })
        ddChart.interval().position('title*points')
        ddChart.render()
      }
    })
  },

  onShow() {
    this.listShow()
  },
  listShow() {
    dd.showLoading({content: '加载中...'})

    dd.httpRequest({
      url: app.globalData.domain + '/rank/selectPersonalList',
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      data: {
        pageNum: 1,
        pageSize: 1000,
        userId: this.data.options.userId
      },
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successHomeList----', res)
        res.data.data.list.forEach((item) => {
          item.approvalImg1 = item.approvalImg1.split(',')
        })
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log('httpRequestFailHomeList---', res)
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
  onItemClick({approvalId}) {
    console.log('list点击', approvalId)

    dd.navigateTo({ url: `/page/work/index/logs/details/index?approvalId=${approvalId}` })
  },
  preview(e) {
    console.log(e)
    dd.previewImage({
      current: e.target.dataset.index,
      urls: this.data.items.approvalImg1
    })
  }
})