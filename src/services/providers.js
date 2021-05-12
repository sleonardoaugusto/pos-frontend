class Products {
  constructor(http) {
    this.http = http
  }
  async getAll() {
    return await this.http.get('/providers/').then(response => response.data)
  }
  async create(providerName = null) {
    return await this.http.post('/providers/', { name: providerName })
  }
}

const factory = httpClient => new Products(httpClient)

export default factory
