export type Result<T> = {
  code: number
  msg: string
  data: T
}

export type ResultPage<T> = {
  code: number
  msg: string
  total: number
  records: T
}
