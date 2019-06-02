// filemlist/filemlist-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filemData: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pullHeight: 0,
    scrollTop: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // touchMove(e){
    //   // 触发父组件的事件，并传递数据
    //   this.triggerEvent('myevent', e)
    // }
  }
})
