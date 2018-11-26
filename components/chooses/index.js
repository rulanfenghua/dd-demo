var app = getApp()

Component({
  props: {
    onTo: function onTo() {},
    onShowFilter: function onShowFilter() {},
    showFilter: false
  },
  data: {
    height: '',

    active: false,
    search: '',
    to: [],
    changeTo: [],
    users: []
  },

  didMount() {
    this.allUsers()
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
        url: app.globalData.domain + '/work/declareBehaviorDetail/selectAllUser',
        method: 'POST',
        dataType: 'json',
        data: {
          pageSize: 1000,
          pageNum: 1,
          search: this.data.search
        },
        success: (res) => {
          console.log('successUsers----', res)
          var users = res.data.data.list
          if (users.length < this.data.users.length) {
            this.setData({
              changeTo: []
            })
          }
          users.forEach((item) => {
            if (this.data.to.some((toItem) => toItem.userId == item.userId)) {
              item.checked = true
            }
          })

          this.setData({
            users: users
          })
        },
        fail: (res) => {
          console.log("httpRequestFailUsers----", res)
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
      this.props.onTo([])
    },
    onSubmit(e) {
      console.log('submitTo', e.detail.value.to)

      this.props.onTo(this.data.to)

      this.props.onShowFilter()
    },
    onChange(e) {
      console.log(e.detail.value)

      var change = {}
      
      if (e.detail.value.length > this.data.changeTo.length) {
        change = e.detail.value[e.detail.value.length-1]
      }
      if (e.detail.value.length < this.data.changeTo.length) {
        change = this.data.changeTo.find((item) => {
          return !e.detail.value.some((findItem) => findItem.userId == item.userId)
        })
      }
      this.setData({
        changeTo: e.detail.value
      })

      console.log('change', change)

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