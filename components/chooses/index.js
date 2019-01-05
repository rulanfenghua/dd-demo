var app = getApp()

Component({
  props: {
    onTo: function onTo() {},
    onShowFilter: function onShowFilter() {},
    showFilter: false,
  },
  data: {
    height: '',

    active: false,
    search: '',
    to: [],
    changeTo: [],
    users: [],
    length: ''
  },

  didMount() {
    dd.showLoading({ content: '加载中...' })
    dd.httpRequest({
      // url: app.globalData.domain + '/work/declareBehaviorDetail/selectAllUser',
      // url: app.globalData.domain + '/work/declareBehaviorDetail/selectAllDeptUser',
      url: app.globalData.domain + '/leader/selectLeaderdepts',
      method: 'POST',
      dataType: 'json',
      data: {
        pageSize: 1000,
        pageNum: 1,
        search: this.data.search
      },
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

        console.log('successUsers----', res)
        var users = res.data.data.list
        this.setData({
          users: users,
          length: users.length
        })
      },
      fail: (res) => {
        console.log("httpRequestFailUsers----", res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});

      },
      complete: () => {
        dd.hideLoading()
      }
    })
    
    this.setData({
      to: []
    })
    
    dd.getSystemInfo({
      success: (res) => {

        var height = res.windowHeight
        this.setData({
          height: height
        })
      }
    })
  },
  didUpdate() {

  },

  methods: {
    allUsers() {
      dd.showLoading({ content: '加载中...' })
      dd.httpRequest({
        // url: app.globalData.domain + '/work/declareBehaviorDetail/selectAllUser',
        // url: app.globalData.domain + '/work/declareBehaviorDetail/selectAllDeptUser',
        url: app.globalData.domain + '/leader/selectLeaderdepts',
        method: 'POST',
        dataType: 'json',
        data: {
          pageSize: 1000,
          pageNum: 1,
          search: this.data.search
        },
        success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}

          console.log('successUsers----', res)
          var users = res.data.data.list
          if (users.length < this.data.length) {
            this.setData({
              changeTo: []
            })
          }
          users.forEach((item) => {
            if (this.data.to.some((toItem) => toItem.userId == item.userId)) {
              item.checked = true
            } else {
              item.checked = false
            }
          })

          this.setData({
            users: users
          })
        },
        fail: (res) => {
          console.log("httpRequestFailUsers----", res)
          var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});
        },
        complete: () => {
          dd.hideLoading()
        }
      })
    },

    showSelect() {

    },
    handleSearch(e) {
      this.setData({
        search: e.detail.value
      })
      // this.allUsers()
    },
    clearSearch() {
      this.setData({
        search: '',
        active: false,
      })
      this.allUsers()
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
      this.allUsers()
      dd.hideKeyboard()
    },

    back() {
      this.props.onShowFilter()
    },
    onReset(e) {
      console.log(e)
      this.setData({
        to: []
      })
      this.props.onTo(this.data.to)
    },
    onSubmit(e) {
      console.log('submitTo', e.detail.value.to)

      this.props.onTo(this.data.to)

      this.props.onShowFilter()
    },
    onChange(e) {
      // console.log(e.detail.value)

      var change = {}
      
      console.log('e.detail.value', e.detail.value)
      console.log('this.data.changeTo', this.data.changeTo)
      if (e.detail.value.length > this.data.changeTo.length) {
        change = e.detail.value[e.detail.value.length-1]
      }
      else if (e.detail.value.length < this.data.changeTo.length) {
        change = this.data.changeTo.find((item) => {
          return !e.detail.value.some((findItem) => findItem.userId == item.userId)
        })
      }
      else {
        dd.showToast({
          duration: 3000,
          content: '选择失败了，请重新选择',
        })
        dd.navigateBack({
          delta: 1
        })
        return
      }
      
      this.setData({
        changeTo: e.detail.value
      })

      // console.log('change', change)

      var to = this.data.to
      
      if (to.some((item) => item.userId == change.userId)) {
        var index = to.findIndex((findItem) => findItem.userId == change.userId)
        to.splice(index, 1)
      } else {
        to.push(change)
      }
      console.log('to', to)
      this.setData({
        to: to
      })
    }
  }
})