<script setup lang="ts">
import { ref } from 'vue'
import { useDark } from '@vueuse/core'

const isDark = ref(useDark())
const time = ref<{
  hours: string
  minutes: string
  seconds: string
}>({
  hours: '00',
  minutes: '00',
  seconds: '00'
})

setInterval(() => {
  const now = new Date()
  time.value.hours = now.getHours().toString()
  time.value.minutes = now.getMinutes().toString()
  time.value.seconds = now.getSeconds().toString()
}, 1000)
</script>
<template>
  <el-card class="time-card" shadow="always" body-class="time-card-body">
    <div class="date">date</div>
    <div class="time">{{ `${time.hours}:${time.minutes}:${time.seconds}` }}</div>
    <div class="weather">weather</div>
  </el-card>
</template>
<style scoped lang="less">
.time-card {
  width: 34vw;
  margin: 0 auto;

  :deep(.time-card-body) {
    height: 100px;
    display: flex;
    padding: 10px;
  }

  .date {
    width: 10vw;
  }

  .time {
    width: 22vw;
    position: relative;

    text-align: center;
    font-size: 3.8em;

    .separate {
      content: '';
      position: absolute;
      top: 50%;
      width: 2px;
      height: 50%;
      background-color: v-bind("isDark? '#6b6b6b' : '#333'");
      transform: translateY(-50%);
    }

    &:after {
      .separate();
      right: 0;
    }

    &:before {
      .separate();
      left: 0;
    }
  }

  .weather {
    width: 10vw;
  }
}
</style>
