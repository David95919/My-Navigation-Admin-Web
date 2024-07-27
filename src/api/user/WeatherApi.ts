import axios from '@/config/axios_user'
import type { Address } from '@/types/Other'
import type { Result } from '@/types/Result'
import type { NowWeather } from '@/types/Weather'

export async function getWeatherIdApi(address: Address) {
  return (await axios.get<Result<string>>('/weather/id', { params: address })).data
}

export async function getNowWeatherApi(weatherId: string) {
  return (await axios.get<Result<NowWeather>>('/weather', { params: { weatherId } })).data
}
