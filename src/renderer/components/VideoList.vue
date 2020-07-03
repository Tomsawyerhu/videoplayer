<template>
  <div>
    <el-row id="list-title" style="width:100%;line-height:40px">歌曲列表</el-row>
    <el-row :gutter="2" style="width:100%;line-height:30px" v-for="(item,index) in dataSource" :key="index">
      <el-col :span="16">
        <div>{{item.name}}</div>
      </el-col>
      <el-col :span="8">
        <div>{{item.length}}</div>
      </el-col>
      
    </el-row>
  </div>
</template>
<script>
export default {
  name: "VideoList",
  data() {
    return {
      tableData: [
        {
          name: "beat it-Micheal Jackson",
          length: "04:11"
        },
        {
          name: "you are not alone-Micheal Jackson",
          length: "04:12"
        },
        {
          name: "you are not alone-Micheal Jackson",
          length: "04:12"
        }
      ]
    };
  },
  props:['dataSource'],
  methods: {}
};
</script>

<style scoped>
.list-title{
    background-color: #99a9bf;
}
.el-row :first-child  {
    background-color: #e5e9f2;
}
</style>