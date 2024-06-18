export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  userId: string
  body?: any
  headers?: any
}
