<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <slot name="aside"></slot>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <slot name="body"></slot>
        </el-main>
        <el-footer>
          <slot name="footer"></slot>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "myMainFrame",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 10vh;
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>