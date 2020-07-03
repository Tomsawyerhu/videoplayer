<template>
  <div>
    <el-row id="list-title" style="width:100%;line-height:40px">歌曲列表</el-row>
    <el-row  :gutter="2" style="width:100%;line-height:30px" v-for="(item,index) in dataSource" :key="index">
      <el-col :span="17">
        <div  v-on:click="playVideo(item.path)">{{item.name}}</div>
      </el-col>
      <el-col :span="6" v-on:click="playVideo(item.path)">
        <div>{{item.length}}</div>
      </el-col>
      
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex"
import vue from "../utils/bus"
export default {
  name: "VideoList",
  data() {
    return {}
  },
  props:['dataSource'],
  methods: {
    playVideo:function(path){
      vue.$emit('playvideo',path)
    }
  }
};
</script>

<style scoped>
.list-title{
    background-color: #99a9bf;
}
.el-row :first-child  {
    background-color: #e5e9f2;
}
.el-row :first-child:hover  {
    background-color:  #99a9bf;
}
</style>