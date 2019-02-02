import * as echarts from '../ec-canvas/echarts';
import config from '../../config/config.js'
Component({
  properties: {
    chartId:{
      type:String,
      value: 'mychart'
    },
    title:{
      type:String,
      value: ''
    },
    height:{
      type:String,
      value: '300px'
    },
    width:{
      type: String,
      value: '100%'
    },
    chartData:{
      type: Array,
      value: []
    },
    chartName:{
      type: String,
      value: ''
    },
    subtext: {
      type: String,
      value: ''
    },
  },
  data: {
    ec: {},
  },
  methods: {
    renderData: function (data) {  
      //如果没有传递参数过来默认使用properties中的chartData数据，否则使用传递过来的data作为渲染数据
      var renderdata = []
      if(data) renderdata = data
      else renderdata = this.data.chartData
      this.ecComponent = this.selectComponent('#'+this.data.chartId)
      this.ecComponent.init((canvas, width, height) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        const option = {
          color: config.color.lineColor,  //读取配置文件中的配色方案
          backgroundColor: '#fff',
          title: {
            text: this.data.title,
            textStyle:{
              fontSize: '16'
            },
            left:'center',
            subtext:this.data.subtext
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'time',
            spiltLine: {
              show: false  //想要不显示网格线，改为false
            }
          },
          yAxis: {
            type: 'value',
            spiltLine: {
              show: false  //想要不显示网格线，改为false
            }
          },
          series: [
            {
              name: this.data.chartName,
              type: 'line',
              data: renderdata
            }
          ]
        }
        chart.setOption(option);
        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        this.chart = chart;
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    }
  }
})
