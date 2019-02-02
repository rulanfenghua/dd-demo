var app = getApp()

Page({
  data: {
    items: [],
    status: 2,

    users: [],

    tabs: [{
      title: '抢单任务'
    },
    {
      title: '挑战任务'
    },
    {
      title: '日常任务'
    }]
  },
  onShow() {
    this.listShow()
  },
  listShow() {
    dd.showLoading({content: '加载中...'})

    dd.httpRequest({
      url: app.globalData.domain + '/task/allTask',
      method: 'POST',
      dataType: 'json',
      data: {
        pageNum: 1,
        pageSize: 100,
        times: this.data.status, // tab栏审批未审批
      },
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}
        console.log('successBounty----', res)
        res.data.data.list.forEach((item) => {
          // item.sqTime = this.format(item.createTime, 'yyyy-MM-dd hh:mm:ss')
          item.commit = false
        })
        this.setData({
          items: res.data.data.list
        })
      },
      fail: (res) => {
        console.log('httpRequestFailBounty----', res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },

  onItemClick({ index }) {
    console.log('list点击', index)

    var title = this.data.items[index].behaviorTitle
    var content = this.data.items[index].behaviorContent
    var type = this.data.items[index].typeId
    var max = this.data.items[index].zuiDuoIntegral
    var min = this.data.items[index].zuiShaoIntegral
    var id = this.data.items[index].behaviorId
    var url = `./commit/index?title=${title}&content=${content}&type=${type}&max=${max}&min=${min}&id=${id}`

    dd.navigateTo({
      url: url
    })
  },

  handleTabClick({ index }) {
    switch (index) {
      case 0:
        this.setData({
          status: 2
        });
        this.listShow();
        break;
      case 1:
        this.setData({
          status: 3
        });
        this.listShow();
        break;
      case 2:
        this.setData({
          status: 1
        });
        this.listShow();
        break;
    }
  },
  handleTabChange({ index }) {

  },

  change(e) {
    console.log(e.target.dataset.index)

    var index = e.target.dataset.index
    dd.showLoading({content: '申请中...'})
    dd.httpRequest({
      url: app.globalData.domain + '/task/allTask',
      method: 'POST',
      dataType: 'json',
      data: {
        taskId: this.data.items[index].rtId,
        taskStatus: this.data.times[index].status
      },
      success: (res) => {if ((res.data.code != 0 && !res.data.code ) || res.data.code == 1001) { dd.showToast({ content: res.msg, duration: 3000 }); dd.reLaunch({ url: '/page/register/index/index' }); return}
        console.log('successChange----', res)
        dd.showToast({
          content: '申请成功',
          duration: 3000
        })
        var items = this.data.items
        items[index].commit = true
        this.setData({
          items: items
        })
      },
      fail: (res) => {
        console.log('httpRequestFailChange----', res)
        var content = JSON.stringify(res); switch (res.error) {case 13: content = '连接超时'; break; case 12: content = '网络出错'; break; case 19: content = '访问拒绝'; } dd.alert({content: content, buttonText: '确定'});
      },
      complete: () => {
        dd.hideLoading()
      }
    })
  },

  // 时间格式
  format(time, fmt) {
    var date = new Date(time)
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
})