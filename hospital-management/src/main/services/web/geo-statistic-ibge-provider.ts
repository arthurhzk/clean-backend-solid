import { HttpRequestMethod, type HttpClient } from '@/data/protocols/http/http-client'
import type { GeoStatisticService } from '@/data/usecases/geo-statistic-service'
import type { CityModel, IBGECityDTO } from '@/domain/city-model'

export class GeoStatisticIBGEProvider implements GeoStatisticService {
  constructor(private readonly httpClient: HttpClient) {}
  async getCitiesByState(state: string): Promise<CityModel[]> {
    const auth = await this.httpClient
      .request({
        url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
        method: HttpRequestMethod.GET
      })
      .then((response) => {
        const states = response.data.map((city: IBGECityDTO) => ({
          name: city.nome,
          id: city.id
        }))
        return states
      })
    return auth
  }
}
