import { useDispatch, useSelector } from 'react-redux';
import { getProductsList } from '../../store/products/productsSelectors';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import { loadProductsList } from '../../store/products/productsActions';
import { IonText } from '@ionic/react';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProductsList);

  useEffect(() => {
    dispatch(loadProductsList());
  }, []);

  return (
    <>
      {products?.length ? (
        products.map((i, index) => <ProductCard {...i} key={index} />)
      ) : (
        <IonText class="ion-text-center">No items</IonText>
      )}
    </>
  );
};
export default Products;
