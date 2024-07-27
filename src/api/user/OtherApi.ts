import axios from '@/config/axios_other'
import type { IpInfo } from '@/types/Other'

export async function getIpInfoApi() {
  return (await axios.get<IpInfo>('https://ip.useragentinfo.com/json')).data
}
