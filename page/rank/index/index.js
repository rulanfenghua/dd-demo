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
      {
        title: '选项',
      },
      {
        title: '选项二',
      },
      { title: '3 Tab' },
      { title: '4 Tab' },
      { title: '5 Tab' },
    ],

    times: 1,
    show: false,
    active: false,
    showFilter: false,
    search: '',

    selectedLables: ',疾病医疗,',
    tags: [
      {
        label: '意外医疗',
        selected: false,
        onChange: 'onTagChange1',
      },
      {
        label: '疾病医疗',
        selected: true,
        onChange: 'onTagChange2',
      },
      {
        label: '疾病住院',
        selected: false,
        onChange: 'onTagChange3',
      },
    ]

    // width: '',
    // height: ''
  },
  onShow() {
    // dd.getSystemInfo({
    //   success: (res) => {
    //     var width = res.windowWidth
    //     var height = res.windowHeight
    //     this.setData({
    //       width: width,
    //       height: height
    //     })
    //   }
    // })

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
        deptId: '',
        postId: '',
        typeId: '',
        times: this.data.times,
        spTime1: '',
        spTime2: '',
        searchName: this.data.search
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
  handleTabClick({ index }) {
    console.log(index)
  },
  handleTabChange({ index }) { },

  // filter部分页面逻辑
  onTagChange(selected, index) {
    console.log(selected, index)
    const tempTag = [].concat(this.data.tags);
    tempTag[index].selected = !selected;
    const labels = tempTag.map((item) => item.selected ? item.label : '').join(',');
    this.setData({
      tags: tempTag,
      selectedLables: labels,
    });
  }
})