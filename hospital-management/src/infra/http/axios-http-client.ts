import type { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols/http/http-client'

import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    const axiosResponse: AxiosResponse = await axios.request({
      url: data.url,
      method: data.method,
      headers: data.headers
    })

    return {
      statusCode: axiosResponse.status,
      data: axiosResponse.data
    }
  }
}
