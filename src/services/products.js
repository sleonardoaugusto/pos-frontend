class Products {
  constructor(http) {
    this.http = http
  }
  async getAll(params = {}) {
    return await this.http
      .get('/products/', { params })
      .then(response => response.data)
  }
  async getById(productId) {
    return this.http
      .get(`/products/${productId}/`)
      .then(response => response.data)
  }
}

const factory = httpClient => new Products(httpClient)

export default factory
