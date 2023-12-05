import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsList } from '../../store/products/productsActions';
import { getProductsLoadingStatus } from '../../store/products/productsSelectors';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const productsLoading = useSelector(getProductsLoadingStatus);
  useEffect(() => {
    dispatch(loadProductsList());
  }, []);

  if (!productsLoading) {
    return <>{children}</>;
  }
  return <>loading...</>;
};

export default AppLoader;
