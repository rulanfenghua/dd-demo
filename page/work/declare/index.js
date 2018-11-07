import Dropdown from '/components/dropdown'

var app = getApp()

Page({
  ...Dropdown,
  data: {
    items: [],
    value: '',

    dropdownSelectData: {
      active: false,
      selectedNav: 0,
      listData: [
        {
          nav: "行为积分",
          selectedItem: '',
          data: []
        },
        {
          nav: "品德积分",
          selectedItem: '',
          data: []
        },
        {
          nav: "业绩积分",
          selectedItem: '',
          data: []
        }
      ]
    }
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
        this.setData({
          'dropdownSelectData.listData[0].data': res.data.data.behavior,
          'dropdownSelectData.listData[1].data': res.data.data.moral,
          'dropdownSelectData.listData[2].data': res.data.data.performance
        })
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

  onDropdownNavItemTap(e, index) {
    const {
      selectedNav,
      active
    } = this.data.dropdownSelectData

    let nextactive = !active;
    if (selectedNav !== index) {
      nextactive = true
    }

    this.setData({
      dropdownSelectData: {
        ...this.data.dropdownSelectData,
        active: nextactive,
        selectedNav: index
      }
    })
  },
  catchDropdownNavItemTap(e, parentIndex, index, title) {
    const {
      listData
    } = this.data.dropdownSelectData

    const data = listData[parentIndex]

    data.selectedItem = index

    // dd.showToast({
    //   content: `你选中了第${parentIndex + 1}个tab的第${index + 1}个元素`, // 文字内容
    //   success: (res) => {

    //   },
    // })
    this.setData({
      dropdownSelectData: {
        ...this.data.dropdownSelectData,
        active: false,
        listData
      }
    })
  },
  catchDropdownBgTap(e) {
    this.setData({
      active: false
    })
  },

  handleInput(value) {

  },
  handleClear(value) {

  },
  handleFocus() {

  },
  handleBlur() {

  },
  handleCancel() {

  },
  handleSubmit(value) {

  }
}) 