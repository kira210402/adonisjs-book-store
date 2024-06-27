declare module '@adonisjs/core/http' {
  interface HttpContext {
    pagination: {
      perPage: number
      page: number
    }
  }
}
