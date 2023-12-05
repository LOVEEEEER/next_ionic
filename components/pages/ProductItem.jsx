import { Redirect, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productsService from '../../services/products.service';
import { toast } from 'react-toastify';
import QRCode from 'react-qr-code';
import axios from 'axios';

const ProductItem = () => {
  const [product, setProduct] = useState();
  const [productLoading, setProductLoading] = useState(true);
  const params = useParams();
  const { listId } = params;

  const fetchProductById = async () => {
    try {
      const { data } = await axios.get(
        `https://products-c6e24-default-rtdb.firebaseio.com/products/${listId}.json`
      );
      setProduct(data);
      setProductLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  if (!productLoading && !product) {
    return <Redirect to="/products" />;
  }

  return (
    <>
      {product && (
        <>
          <img className='bg-orange-100' src={product.image} alt="" />
          <div className="m-4">
            <QRCode
              value={`Title: ${product.title}, \nDescription: ${
                product.description
              } \nPrice: ${product.price.toString()}`}
              size={150}
            />
            <h1>Title: {product.title}</h1>
            <h2>Price: {product.price}$</h2>
            <p>Description: {product.description}</p>
          </div>
        </>
      )}
    </>
  );
};

export default ProductItem;
