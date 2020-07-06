<template>
  <my-main-frame>
    <video-list :data-source="get_videolist" slot="aside" id="aside"></video-list>
    <div slot="body">
      <my-audio-canvas></my-audio-canvas>
      <div></div>
    </div>

    <my-audio slot="footer"></my-audio>
  </my-main-frame>
</template>

<script>
import MyMainFrame from "../components/MainFrame";
import MyAudio from "../components/MyAudio";
import MyAudioCanvas from "../components/MyAudioCanvas";
import VideoList from "../components/VideoList";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "main",
  components: { MyMainFrame, MyAudio, MyAudioCanvas, VideoList },
  data() {
    return {};
  },
  mounted() {
    particlesJS.load("aside", "/public/particles.json", function() {
      console.log("callback - particles.js config loaded");
    });
  },
  methods: {
    
  },
  computed: {
    ...mapGetters(["get_videolist"])
  }
};
</script>