import { getNowWeatherApi, getWeatherIdApi } from '@/api/user/WeatherApi'
import type { Address } from '@/types/Other'

export async function getWeatherId(address: Address) {
  const result = await getWeatherIdApi(address)

  return result.data
}

export async function getNowWeather(weatherId: string) {
  const result = await getNowWeatherApi(weatherId)

  return result.data
}
