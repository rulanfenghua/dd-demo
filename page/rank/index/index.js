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
      success: (res) => {
        console.log('successRankDept----', res)
        this.setData({
          'tabsFilter[0].tags': res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRankDept----", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
      }
    })

    dd.httpRequest({
      url: app.globalData.domain + '/rank/selectPost',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successRankPost----', res)
        this.setData({
          'tabsFilter[1].tags': res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRankPost----", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
      }
    })

    dd.httpRequest({
      url: app.globalData.domain + '/rank/selectType',
      method: 'POST',
      dataType: 'json',
      success: (res) => {
        console.log('successRankType----', res)
        this.setData({
          'tabsFilter[2].tags': res.data.data
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRankType----", res)
        dd.alert({
          content: JSON.stringify(res)
        })
      },
      complete: () => {
      }
    })
  },
  onShow() {
    dd.getSystemInfo({
      success: (res) => {
        // var width = res.windowWidth
        var height = res.windowHeight - 124
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
    dd.showLoading()
    dd.httpRequest({
      url: app.globalData.domain + '/rank/index',
      method: 'POST',
      data: {
        pageNum: 1,
        pageSize: 20,
        deptId: this.data.deptId,
        postId: this.data.postId,
        typeId: this.data.typeId,
        times: this.data.times,
        spTime1: '',
        spTime2: '',
        search: this.data.search
      },
      dataType: 'json',
      success: (res) => {
        console.log('successRank----', res)
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log("httpRequestFailRank---", res)
        dd.alert({
          content: JSON.stringify(res)
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
    console.log(index)
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