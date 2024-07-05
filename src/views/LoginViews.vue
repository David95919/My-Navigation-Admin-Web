<script setup lang="ts">
import DarkComponent from "@/components/DarkComponent.vue";
import {ref} from "vue";

const form = ref({
  username: '',
  password: '',
  keep: false
})
</script>
<template>
  <div class="main">
    <DarkComponent></DarkComponent>
    <el-card class="central">
      <template #header>
        <span class="title">{{ $t(`login.login`) }}</span>
      </template>
      <el-form :model="form" label-width="auto">
        <el-form-item :label="$t(`login.username`)">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`login.password`)">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`login.keep`)">
          <el-switch v-model="form.keep"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button">{{ $t(`login.login`) }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style scoped lang="less">
.central {
  box-sizing: border-box;
  margin: 25vh auto;
  width: 40vw;
  padding: 1vw 5vw;

  .title {
    display: block;
    font-size: 36px;
    text-align: center;
  }

  .login-button {
    margin: 0 auto;
  }
}

.main {
  height: 100vh;
}
</style>
