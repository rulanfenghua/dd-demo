App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);
    this.globalData.corpId = options.query.corpId;
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    corpId: '',
    level: '',
<<<<<<< HEAD
    domain: 'http://jifen.meisijia.cn:8081'
=======
    domain: 'http://192.168.0.8:8081'
>>>>>>> master
  }
});