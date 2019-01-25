/**
 * Created by wangyy on 2016/12/26.
 */
'use strict';
class Count {

  constructor(opt) {
    let def = {
      startVal: 0,  //开始时的数字
      duration: 2000, // 动画总时间
      decimals: 2,// 小数点后的位数
      
    }
    this.opt = Object.assign(def, opt);//assign传入配置参数
    this.init();
  }
  init() {
    this.interval = setInterval(() => { this.updateTimer() }, this.opt.refreshTime);
  }
}
export default Count;