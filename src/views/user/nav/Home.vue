<script setup lang="ts">
import TimeDateCard from '@/components/user/TimeDateCard.vue'
</script>
<template>
  <div class="home">
    <div class="top">
      <TimeDateCard></TimeDateCard>
    </div>
    <div class="search">Search</div>
    <div class="choose">Choose</div>
    <div class="nav">Nav</div>
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
    background-color: gold;
  }

  .choose {
    background-color: skyblue;
  }

  .nav {
    background-color: greenyellow;
  }
}
</style>
