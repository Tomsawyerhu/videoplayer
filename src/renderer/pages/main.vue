<template>
  <my-main-frame>
    <video-list :data-source="get_videolist" slot="aside"></video-list>
    <my-audio-canvas slot="body"></my-audio-canvas>
    <my-audio slot="footer"></my-audio>
  </my-main-frame>
</template>

<script>
import MyMainFrame from "../components/MainFrame"
import MyAudio from "../components/MyAudio"
import MyAudioCanvas from "../components/MyAudioCanvas"
import VideoList from "../components/VideoList"
import { mapGetters, mapActions, mapMutations } from "vuex"
export default {
  name: "main",
  components: { MyMainFrame, MyAudio, MyAudioCanvas,VideoList },
  data() {
    return {};
  },
  methods: {
    
  },
  computed:{
    ...mapGetters([
      'get_videolist',
      ])
  }
};
</script>