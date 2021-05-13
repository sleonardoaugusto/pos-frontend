import Products from '@/services/products'
import faker from 'faker'

describe('Product service', () => {
  let service
  let httpClient

  beforeEach(() => {
    httpClient = {
      post: jest.fn(),
      put: jest.fn(),
      get: jest.fn(),
      delete: jest.fn()
    }
    service = Products(httpClient)
    jest.clearAllMocks()
  })

  it('Constructor', () => {
    expect(service.http).toBe(httpClient)
  })

  describe('Get product', () => {
    let responseData

    beforeEach(() => {
      responseData = faker.random.uuid()
      httpClient.get.mockResolvedValueOnce({ data: responseData })
    })

    it('Should get product by id', () => {
      const spy = jest.spyOn(httpClient, 'get')

      service.getById(1)
      expect(spy).toHaveBeenCalledWith('/products/1/')
    })

    it('Should return response data', async () => {
      const resp = await service.getById(1)
      expect(resp).toEqual(responseData)
    })
  })

  describe('Get all products', () => {
    let responseData

    beforeEach(() => {
      responseData = [faker.random.uuid(), faker.random.uuid()]
      httpClient.get.mockResolvedValueOnce({ data: responseData })
    })

    it('Should get all products', () => {
      const spy = jest.spyOn(httpClient, 'get')

      service.getAll()
      expect(spy).toHaveBeenCalledWith('/products/')
    })

    it('Should return response data', async () => {
      const resp = await service.getAll()
      expect(resp).toEqual(responseData)
    })
  })
})
