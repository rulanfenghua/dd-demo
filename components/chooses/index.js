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
    changeTo: []
  },

  didMount() {
    this.allUsers()
    this.setData({
      to: [],
      changeTo: []
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
          users.forEach((item) => {
            if (this.data.to.some((toItem) => toItem.userId == item.userId)) {
              item.checked = true
            }
          })

          console.log(users)

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
      console.log('changeTo', this.data.changeTo)
      var to = this.data.to
      this.data.changeTo.forEach((item) => {
        if (this.data.to.some((toItem) => toItem.userId == item.userId)) {
          var index = to.findIndex((findItem) => findItem.userId == item.userId)
          to.splice(index, 1)
        } else {
          to.push(item)
        }
      })
      console.log('to', this.data.to)
      this.setData({
        to: to
      })

      this.props.onTo(to)

      this.props.onShowFilter()
    },
    onChange(e) {
      console.log(e.detail.value)
      // var changeTo = []
      // e.detail.value.forEach((item) => {
      //   if (this.data.to.some((toItem) => toItem.userId == item.userId)) {
      //     changeTo.splice(changeTo.indexOf(item), 1)
      //   } else {
      //     changeTo.push(item)
      //   }
      // })

      // console.log('changeTo', changeTo)

      this.setData({
        changeTo: e.detail.value
      })
    }
  }
})