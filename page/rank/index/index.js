let app = getApp()

Page({
  data: {
    items: [],

    tabs: [
      { title: '按日' },
      { title: '按月' },
      { title: '按季' },
      { title: '按年' }
    ],
    tabsFilter: [
      { title: '部门' },
      { title: '职位' },
      { title: '积分类型' },
      { title: '时间' }
    ],

    times: 1,
    show: false,
    active: false,
    showFilter: false,
    search: '',

    deptId: '',
    postId: '',
    typeId: '',

    // width: '',
    height: ''
  },
  onLoad() {
    dd.httpRequest({
      url: app.globalData.domain + '/rank/selectDept',
      method: 'POST',
      dataType: 'json',
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successRankDept----', res)
        var data = res.data.data
        data.unshift({
          id: '',
          name: '全部',
          checked: 'true'
        })
        this.setData({
          'tabsFilter[0].tags': data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRankDept----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
      }
    })

    dd.httpRequest({
      url: app.globalData.domain + '/rank/selectPost',
      method: 'POST',
      dataType: 'json',
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successRankPost----', res)
        var data = res.data.data
        data.unshift({
          id: '',
          name: '全部',
          checked: 'true'
        })
        this.setData({
          'tabsFilter[1].tags': data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRankPost----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
      }
    })

    dd.httpRequest({
      url: app.globalData.domain + '/rank/selectType',
      method: 'POST',
      dataType: 'json',
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successRankType----', res)
        var data = res.data.data
        data.unshift({
          id: '',
          name: '全部',
          checked: 'true'
        })
        this.setData({
          'tabsFilter[2].tags': data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRankType----", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
      }
    })
  },
  onShow() {
    dd.getSystemInfo({
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        // var width = res.windowWidth
        var height = res.windowHeight - 84
        this.setData({
          // width: width,
          height: height
        })
      }
    })

    this.showList()
  },
  onReachBottom() {
    this.showList()
  },

  showList() {
    dd.showLoading({content: '加载中...'})
    dd.httpRequest({
      url: app.globalData.domain + '/rank/index',
      method: 'POST',
      data: {
        pageNum: 1,
        pageSize: 1000,
        deptId: this.data.deptId,
        postId: this.data.postId,
        typeId: this.data.typeId,
        times: this.data.times,
        spTime1: '',
        spTime2: '',
        search: this.data.search
      },
      dataType: 'json',
      success: (res) => {if (res.data && res.data.code == 2018) {dd.showToast({content: res.msg, duration: 3000 }); dd.reLaunch({url: '/page/register/index/index'}) }
        console.log('successRank----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRank---", res)
        dd.alert({
          content: JSON.stringify(res),
          buttonText: '确定'
        })
      },
      complete: () => {
        dd.hideLoading()
      }
    })
    console.log(this.data)
  },

  onItemClick({index}) {
    console.log('list点击', index)
  },
  handleTabClick({ index }) {
    this.setData({
      times: index + 1
    })

    this.showList()
  },
  handleTabChange({ index }) {
    this.setData({
      items: index + 1
    })

    this.showList()
  },

  showSearch() {
    this.setData({
      show: !this.data.show
    })
  },
  handleSearch(e) {
    this.setData({
      search: e.detail.value
    })
    // this.showList()
  },
  clearSearch() {
    this.setData({
      search: '',
      active: false,
      show: false
    })
    this.showList()
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
    this.showList()
    dd.hideKeyboard()
  },

  showSelect() {
    this.setData({
      showFilter: true
    })
  },
  handleTabFilterClick({ index }) {
  },
  handleTabFilterChange({ index }) { },

  // filter部分页面逻辑
  onSubmit(e) {
    for (var prop in e.detail.value) {
      switch (prop) {
        case 'tags0':
          this.setData({'deptId': e.detail.value[prop] })
          break;
        case 'tags1':
          this.setData({ 'postId': e.detail.value[prop] })
          break;
        case 'tags2':
          this.setData({ 'typeId': e.detail.value[prop] })
          break;
      }
    }
    
    this.showList()
    this.setData({
      showFilter: false
    })
  },
  onReset(e) {
    this.setData({
      deptId: '',
      postId: '',
      typeId: ''
    })

    this.showList()
  },
  radioChange(e) {
  },

  back() {
    this.setData({
      showFilter: false
    })
  }
})