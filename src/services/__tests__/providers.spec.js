import Providers from '@/services/providers'
import faker from 'faker'

describe('Providers service', () => {
  let service
  let httpClient

  beforeEach(() => {
    httpClient = {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn()
    }
    service = Providers(httpClient)
    jest.clearAllMocks()
  })

  it('Constructor', () => {
    expect(service.http).toBe(httpClient)
  })

  describe('Get providers', () => {
    let responseData

    beforeEach(() => {
      responseData = [{ id: 1, name: 'Maria Isabel' }]
      httpClient.get.mockResolvedValueOnce({ data: responseData })
    })

    it('Should get all providers', () => {
      const spy = jest.spyOn(httpClient, 'get')

      service.getAll()
      expect(spy).toHaveBeenCalledWith('/providers/')
    })

    it('Should return response data', async () => {
      const resp = await service.getAll()
      expect(resp).toEqual(responseData)
    })
  })

  describe('Create provider', () => {
    it('Should create provider', () => {
      const spy = jest.spyOn(httpClient, 'post')

      const providerName = faker.lorem.word()
      service.create(providerName)
      expect(spy).toHaveBeenCalledWith('/providers/', { name: providerName })
    })
  })
})
