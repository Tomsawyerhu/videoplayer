<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content bg-purple" id="progress">
          <div style="width:80%">
            <el-slider v-model="progress" :show-tooltip="false" style="margin-left:12px"></el-slider>
          </div>
          <div>{{current}}s/{{length}}s &nbsp;</div>
        </div>
      </el-col>
      <el-col :span="6">
        <el-button-group class="grid-content bg-purple">
          <el-button></el-button>
          <el-button @click="startPlayOrPause"></el-button>
          <el-button></el-button>
          <el-button @click="setLocalRepo"></el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  setSource,
  playMusic,
  pauseMusic,
  getByteFrequencyData,
  getDefaultPlayer,
  isOn,
  dropContext,
  getCurrent,
  getLength
} from "../utils/audioPlayer";
import vue from "../utils/bus";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "myAudio",
  components: {},
  data() {
    return {
      src: "",
      current: 0,
      progress: 0,
      length:0,
      timeFormat: "00:00"
    };
  },
  mounted() {
    var that=this
    vue.$on("playvideo", function(data) {
      var length=data.length
      var path=data.path
      if (isOn()) {
        pauseMusic();
        dropContext();
        that.isPlay = false;
      }
      getDefaultPlayer();
      that.src = path;
      that.length=length
      setSource(path, length);
      playMusic();
      vue.$emit("startpaint", []);
    });
    
    vue.$on("currentChange", function() {
      that.current = getCurrent();
      that.progress =100*that.current/getLength();
    });
  },

  computed: {},
  watch: {
    current: {
      handler(val,oldVal) {
        //todo 格式化当前时间
        
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions(["setLocalRepository"]),
    startPlayOrPause() {
      return isOn() ? this.pause() : this.play();
    },
    pause() {
      pauseMusic();
      //触发canvas事件
      this.stopDraw();
    },
    play() {
      playMusic();
      //触发canvas事件
      this.startDraw();
    },
    startDraw() {
      vue.$emit("startpaint", []);
    },
    stopDraw() {
      vue.$emit("stoppaint", []);
    },
    setLocalRepo() {
      this.setLocalRepository();
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-top: 10px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  border-radius: 4px;
  height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
#progress {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
</style>