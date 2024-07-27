import { getIpInfoApi } from '@/api/user/OtherApi'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { getWeatherId } from '@/service/user/WeatherService'

export async function checkWeatherService() {
  const ipInfo = await getIpInfoApi()
  const { address, weatherId } = storeToRefs(useUserStore())

  if (ipInfo.area === address.value.area && ipInfo.city === address.value.city) {
    if (weatherId.value.length >= 0) {
      weatherId.value = await getWeatherId(address.value)
    }
  } else {
    address.value.area = ipInfo.area
    address.value.city = ipInfo.city
    weatherId.value = await getWeatherId(address.value)
  }
}
