export type NowWeather = {
  code: number
  updateTime: string
  fxLink: string
  now: Weather
  refer: Refer
}

export type Weather = {
  obsTime: string
  temp: number
  feelsLike: number
  icon: number
  text: string
  wind360: number
  windDir: string
  windScale: number
  windSpeed: number
  humidity: number
  precip: number
  pressure: number
  vis: number
  cloud?: number
  dew?: number
}

export type Refer = {
  sources?: string[]
  license?: string[]
}
