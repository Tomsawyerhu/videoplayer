<template>
  <canvas v-on:startpaint="startPaint" id="canvas" style="height:400px;width:700px"></canvas>
</template>

<script>
import { getByteFrequencyData } from "../utils/audioPlayer"
import vue from "../utils/bus"
export default {
  name: "MyAudioCanvas",
  data() {
    return {
      paintProcess:false
    };
  },
  mounted() {
    var that=this
    vue.$on("startpaint", function() {
      that.startPaint();
    });
    vue.$on("stoppaint", function() {
      that.stopPaint();
    });
  },
  methods: {
    draw() {
      let canvas = document.getElementById("canvas");
      var frequency = getByteFrequencyData();
      const ctx = canvas.getContext("2d");

      for (var i = 0; i < 100; i++) {
        ctx.clearRect(3 * i, 0, 2, 400);
        let color = "#" + this.tenToSixteen(1000 * frequency[i]);
        console.log(color);
        ctx.fillStyle = color;
        ctx.fillRect(3 * i, 0, 2, frequency[i] / 5);
        ctx.fillRect(3 * i, 100 - frequency[i] / 5, 2, frequency[i] / 5);
      }
    },
    startPaint() {
      this.paintProcess = setInterval(this.draw, 50);
    },
    stopPaint() {
      clearInterval(this.paintProcess);
    },
    tenToSixteen(number) {
      let x = number.toString(16);
      if (x.length >= 6) return "can't convert";
      else {
        for (var i = 0; i < 7 - x.length; i++) {
          x = "0" + x;
        }
      }
      return x;
    }
  }
};
</script>

<style scoped>
</style>