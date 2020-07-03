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
  getByteFrequencyData
} from "../utils/audioPlayer";
import vue from "../utils/bus";
import { mapGetters, mapActions, mapMutations } from "vuex"

export default {
  name: "myAudio",
  components: {},
  data() {
    return {
      src: "static/video/soldout.mp3",
      isPlay: false
    };
  },
  beforeMount() {
    setSource(this.src);
  },

  methods: {
    ...mapActions([
      'setLocalRepository'
    ]),
    onPlay() {
      this.isPlay = true;
    },
    onPause() {
      this.isPlay = false;
    },
    startPlayOrPause() {
      return this.isPlay ? this.pause() : this.play();
    },
    pause() {
      this.onPause();
      pauseMusic();
      //触发canvas事件
      this.stopDraw();
    },
    play() {
      this.onPlay();
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
      this.setLocalRepository()
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