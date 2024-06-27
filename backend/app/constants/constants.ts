export type Data<T> = {
  data: T[]
  pagination: {
    total: number
    perPage: number
    page: number
  }
}
