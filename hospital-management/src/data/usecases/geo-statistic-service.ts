import type { CityModel } from '@/domain/city-model'

export interface GeoStatisticService {
  getCitiesByState(state: string): Promise<CityModel[]>
}
