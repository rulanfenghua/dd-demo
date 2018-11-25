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
    search: ''
  },

  didMount() {
    this.allUsers()

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
      console.log('onSubmit', e.detail.value.to);

      this.props.onTo(e.detail.value.to)

      this.props.onShowFilter()
    },
    onChange(e) {
    }
  }
})