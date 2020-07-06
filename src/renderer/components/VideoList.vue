<template>
  <div style="height:95%">
    <el-row id="list-title" style="width:100%;line-height:30px">
      <el-col :span="24">
        <el-dropdown trigger="click" :hide-on-click="false">
          <span class="el-dropdown-link">
            所有歌曲
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:195px;margin-left:5px; overflow: auto;max-height:200px;">
            <el-dropdown-item
              @click.native="playVideo(item.path,item.length)"
              v-for="(item,index) in dataSource"
              :key="index"
              style="display:flex;flex-flow:row;justify-content:space-between"
            >
            <span>{{item.name}}</span>
            <span>{{item.length}}s</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import vue from "../utils/bus";
export default {
  name: "VideoList",
  data() {
    return {
      
    }
  },
  props: ["dataSource"],
  methods: {
    playVideo: function(path,length) {
      vue.$emit("playvideo", {path:path,length:Number(length)});
    }
  }
};
</script>

<style scoped>
.list-title {
  background-color: #99a9bf;
}
.el-row {
  background-color: #e5e9f2;
}
.el-row :hover {
  background-color: #99a9bf;
}
</style>