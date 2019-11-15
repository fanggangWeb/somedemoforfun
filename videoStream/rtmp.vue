<template>
  <div :id="id"></div>
</template>
<script>
import "videojs-flash"
import { setTimeout } from 'timers';
let that
export default {
  name: 'rtmp',
  data () {
    return {
      plyer: {}
    }
  },
  props: {
    id: {
      type: String,
      default: 'id_test_video'
    },
    src: {
      type: String,
      default: 'rtmp://58.200.131.2:1935/livetv/hunantv'
    },
    poster: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  created() {

  },
  mounted() {
    that = this
    console.log("rts:"+ this.src)
    this.plyer = new TcPlayer(this.id, {
      //"rtmp": "rtmp://58.200.131.2:1935/livetv/hunantv", //请替换成实际可用的播放地址 // 湖南电视台测试
      "rtmp": this.src,
      "autoplay" : this.autoplay,      //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
      "poster" : { "style": "stretch", "src": this.poster }, //封面图
      'pausePosterEnabled': true,
      "flash": true, //是否优先使用 Flash 播放视频。
      "live": true, //设置视频是否为直播类型,将决定是否渲染时间轴等控件
      //"controls": 'none',
      "width" :  this.width,//视频的显示宽度，请尽量使用视频分辨率宽度
      "height" : this.height,//视频的显示高度，请尽量使用视频分辨率高度
      "listener": function(msg) {
        if(msg.type == 'error'){
          window.setTimeout(function(){
            that.plyer.load(that.src);//进行重连
          },2000);
        }
      },
       //"play": this.testplay(),
       //"pause": this.testpause(),
    });
  },
  methods: {
    //destroy
    testplay() {
       alert(111)
      //this.plyer.load(this.src)
    },
    testpause() {
      alert(22)
    }
  }

}
</script>
<style lang="less">
  .vcp-controls-panel {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .vcp-fullscreen-toggle {
    display: none;
  }
  .vcp-volume-icon {
    display: none;
  }
  .vcp-volume {
    display: none;
  }
  .vcp-timelabel {
    display: none;
  }
</style>