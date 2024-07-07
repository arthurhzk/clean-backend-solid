import { inject, type App } from 'vue'
import { GeoStatisticIBGEProvider } from '@/main/services/web/geo-statistic-ibge-provider'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'
export const registerServices = (app: App) => {
  app.provide('GeoStatisticService', new GeoStatisticIBGEProvider(new AxiosHttpClient()))
}

export const injectSafe = <T>(key: string): T => {
  const service = inject<T>(key)
  if (!service) {
    throw new Error('Service not found')
  }
  return service
}
