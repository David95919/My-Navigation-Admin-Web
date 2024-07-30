<script setup lang="ts">
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import { dayjs } from 'element-plus'
import type { NowWeather } from '@/types/Weather'
import { getNowWeather } from '@/service/user/WeatherService'
import { useUserStore } from '@/stores/userStore'
import { useI18n } from 'vue-i18n'

const isDark = ref(useDark())
const { t } = useI18n()

const weather = ref<NowWeather>()
const time = ref<{
  hours: string
  minutes: string
  seconds: string
}>({
  hours: '00',
  minutes: '00',
  seconds: '00'
})

const date = dayjs()

setInterval(() => {
  const now = new Date()
  time.value.hours = now.getHours().toString()
  time.value.minutes = now.getMinutes().toString()
  time.value.seconds = now.getSeconds().toString()
}, 1000)

const getWeather = async () => {
  weather.value = await getNowWeather(useUserStore().weatherId)
}

getWeather()
</script>
<template>
  <el-card class="time-card" shadow="always" body-class="time-card-body">
    <div class="date">
      <div class="date">{{ date.date() }}</div>
      <div class="day">{{ `${$t('date_time.day')} ${date.day()}` }}</div>
      <div class="year-month">
        {{ `${date.year()}${$t('date_time.year')} ${date.month() + 1}${$t('date_time.month')}` }}
      </div>
    </div>
    <div class="time">{{ `${time.hours}:${time.minutes}:${time.seconds}` }}</div>
    <a
      v-if="weather != null"
      class="weather"
      :href="weather?.fxLink"
      target="_blank"
      :title="t('home.weather_services')"
    >
      <div class="left">
        <span class="feelsLike">{{ weather?.now.feelsLike }}°</span>
        <span class="temp">{{ weather?.now.temp }}°</span>
      </div>
      <div class="right">
        <i class="icon" :class="[`qi-${weather?.now.icon}`]"></i>
        <span class="text">{{ weather?.now.text }}</span>
      </div>
    </a>
    <div class="weather" v-else>{{ $t('home.weather_is_not_enabled') }}</div>
  </el-card>
</template>
<style scoped lang="less">
.time-card {
  width: 34vw;
  margin: 0 auto;

  :deep(.time-card-body) {
    display: flex;
    height: 100px;
    padding: 10px;
  }

  .date {
    width: 10vw;
    font-size: 0.9em;
    text-align: center;

    .date {
      font-size: 1.8em;
    }
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
    margin-left: 10px;
    display: flex;
    width: 10vw;
    justify-content: space-around;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .temp {
        font-size: 1.3em;
      }

      .feelsLike {
        font-size: 2em;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .icon {
        font-size: 2em;
      }
    }
  }
}
</style>
