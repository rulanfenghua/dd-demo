var app = getApp()

Page({
  data: {
    items: [],
    search: '',
    status: 0,
    active: false,

    has: true, // 点赞标识
    user: {}
  },
  onShow() {
    this.listShow()
  },
  listShow() {
    dd.showLoading({ content: '加载中...' })

    dd.httpRequest({
      url: app.globalData.domain + '/lovePraise/lovePraiseList',
      method: 'POST',
      dataType: 'json',
      data: {
        search: this.data.search
      },
      success: (res) => {
        if (res.data && res.data.code == 2018) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }) }
        console.log('successLike----', res)
        var has = true
        var list = res.data.data.userList
        var user = res.data.data.user
        if (res.data.data.loveUser) {
          has = false
        }
        if (user.remark) {
          user.count = user.remark.split(',').length
        } else {
          user.count = 0
        }
        list.forEach((item) => {
          console.log(item)
          if (item.remark) {
            item.count = item.remark.split(',').length
          } else {
            item.count = 0
          }

          if (item.userId == res.data.data.loveUser) {
            item.liked = true
          } else {
            item.liked = false
          }
        })
        this.setData({
          items: list,
          user: user,
          has: has
        })
      },
      fail: (res) => {
        console.log('httpRequestFailLike----', res)
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

  onItemClick({index}) {
    console.log(index)
    if (!this.data.has) {
      dd.showToast({ content: '您的点赞机会已经用完了', duration: 3000 })
      return
    }
    dd.httpRequest({
      url: app.globalData.domain + '/lovePraise/updataUser',
      method: 'POST',
      dataType: 'json',
      data: {
        userId: index.userId
      },
      success: (res) => {
        if (res.data && res.data.code == 2018) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }) }
        console.log('successLikePost----', res)
        dd.showToast({ content: '点赞成功', duration: 3000 })
        this.listShow()
      },
      fail: (res) => {
        console.log('httpRequestFailLikePost----', res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
      }
    })
  }
})