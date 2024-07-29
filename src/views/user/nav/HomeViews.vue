<script setup lang="ts">
import TimeDateCardComponent from '@/components/user/TimeDateCardComponent.vue'
import SearchComponent from '@/components/user/SearchComponent.vue'
import NavComponent from '@/components/user/NavComponent.vue'
</script>
<template>
  <div class="home">
    <div class="top">
      <TimeDateCardComponent></TimeDateCardComponent>
    </div>
    <div class="search">
      <SearchComponent></SearchComponent>
    </div>
    <div class="nav">
      <NavComponent></NavComponent>
    </div>
  </div>
</template>
<style scoped lang="less">
.home {
  width: 100vw;
  height: 100vh;

  .top {
    padding: 25px 0;
  }

  .search {
    margin: 0 auto;
  }

  .nav {
    margin: 10px auto 0;
    width: 85vw;
  }
}
</style>
