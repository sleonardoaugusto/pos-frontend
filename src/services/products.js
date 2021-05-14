class Products {
  constructor(http) {
    this.http = http
  }
  async getAll() {
    return await this.http.get('/products/').then(response => response.data)
  }
  async getById(productId) {
    return this.http
      .get(`/products/${productId}/`)
      .then(response => response.data)
  }
  async create({ name } = {}) {
    return await this.http.post('/products/', { name })
  }
}

const factory = httpClient => new Products(httpClient)

export default factory
