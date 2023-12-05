import { Link } from 'react-router-dom';
import Card from '../ui/Card';

const ProductCard = ({ id, title, price, description, image }) => (
  <Link to={`/products/${id}`}>
    <Card className="my-4 mx-auto">
      <div className="h-32 w-full relative">
        <img
          className="bg-orange-100 rounded-t-xl object-cover min-w-full min-h-full max-w-full max-h-full"
          src={image}
          alt=""
        />
      </div>
      <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
        <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">
          Price: {price}$
        </h4>
        <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
        <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Card>
  </Link>
);

export default ProductCard;
