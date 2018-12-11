var app = getApp()

Component({
  props: {
    onLoad: function onTo() {},
    onFilePaths: function onFilePaths() {},
  },
  data: {
    filePaths: [],
    toFilePaths: []
  },

  didMount() {

  },

  methods: {
    chooseImage() {
      dd.chooseImage({
        sourceType: ['camera', 'album'],
        count: 9,
        success: (res) => {
          console.log('chooseImage', res)
          if (res && res.apFilePaths) {
            console.log(res.apFilePaths)
            this.setData({
              filePaths: res.apFilePaths
            })
            console.log(this.data.filePaths)
            // 上传图片到服务器
            let success = 0
            let _this = this
            let toFilePaths = []
            if (this.data.filePaths.length == 0) {
              this.setData({
                toFilePaths: toFilePaths
              })
            }
            for (let index = 0; index < this.data.filePaths.length; index++) {
              dd.uploadFile({
                url: app.globalData.domain + '/upload/uploadFile',
                fileType: 'image',
                fileName: 'file',
                filePath: this.data.filePaths[index],
                success: (res) => {
                  success++
                  console.log('dbImg', res)
                  var regex = /:"(.*)","msg"/
                  var path = res.data.match(regex)[1]
                  toFilePaths.push(path)
                  if (success == _this.data.filePaths.length) {
                    console.log(toFilePaths)
                    _this.setData({
                      toFilePaths: toFilePaths
                    })
                    _this.props.onFilePaths(toFilePaths)
                  }
                },
                fail: function (res) {
                  dd.alert({
                    content: JSON.stringify(res),
                    buttonText: '确定'
                  })
                  _this.props.onLoad()
                },
              })
            }
          }
        },
        fail: () => {
          dd.showToast({
            content: '取消选择', // 文字内容
          })
        }
      })
    },

    delete() {
      
    }
  }
})