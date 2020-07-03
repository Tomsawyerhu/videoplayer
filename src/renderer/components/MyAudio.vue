<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button @click="startPlayOrPause"></el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button @click="setLocalRepo"></el-button>
        </div>
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
  isOn
} from "../utils/audioPlayer";
import vue from "../utils/bus";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "myAudio",
  components: {},
  data() {
    return {
      src: "F:/KuGou/流行音悦台 - 6人用阿卡贝拉串烧2018年欧美热曲!.mp3"
    };
  },
  beforeMount() {
    setSource(this.src);
  },
  mounted() {
    vue.$on("playvideo", function(path) {
      console.log(path);
      if (isOn()) {
        pauseMusic()
        this.isPlay = false
      }
      getDefaultPlayer()
      this.src = path
      setSource(this.src)
      playMusic()
      vue.$emit("startpaint", [])
    });
  },

  methods: {
    ...mapActions(["setLocalRepository"]),
    startPlayOrPause() {
      return isOn() ? this.pause() : this.play();
    },
    pause() {
      pauseMusic()
      //触发canvas事件
      this.stopDraw()
    },
    play() {
      playMusic()
      //触发canvas事件
      this.startDraw()
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
</style>