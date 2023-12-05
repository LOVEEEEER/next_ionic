export const getProductsList = state => {
  return state.products.entities;
};

export const getProductById = (state, productId) => {
  return state.products.entities.find(product => product.id === productId);
};

export const getProductsLoadingStatus = state => state.products.isLoading;
