import httpService from './http.service';

const productsEndpoint = 'products/';

const productsService = {
  async fetchAll() {
    const { data } = await httpService.get(productsEndpoint);
    return data;
  },
  async fetchProductById(id) {
    const { data } = await httpService.get(productsEndpoint + id);
    return data;
  },
  async createProduct(id, product) {
    const { data } = await httpService.put(productsEndpoint + id, product);
    return data;
  },
};

export default productsService;
