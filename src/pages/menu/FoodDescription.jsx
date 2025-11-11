import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { useCart } from '../../Context/CartContext';

export default function FoodDescription() {
  const { id } = useParams();

  const { addToCart } = useCart();
  const [productDetail, setProductDetail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        const data = res.data;
        setProductDetail(data);
        console.log(data);
      } catch (err) {
        console.error('Failed to fetch the products!', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, []);

  const recommendedProduct = [
    {
      id: 1,
      name: 'Coca Cola',
      price: 80,
      image: '',
    },
    {
      id: 2,
      name: 'Coca Cola',
      price: 80,
      image: '',
    },
    {
      id: 3,
      name: 'Coca Cola',
      price: 80,
      image: '',
    },
    {
      id: 4,
      name: 'Coca Cola',
      price: 80,
      image: '',
    },
  ];

  return (
    <div>
      <Navbar backStatus={true} cartStatus={true} />
      <div className='flex flex-col justify-start items-center gap-20 mx-auto p-5 w-fit'>
        <div className='relative flex justify-center items-center gap-10'>
          <div className='rounded-3xl w-[500px] h-[450px] overflow-hidden'>
            <img
              src='/burger.jpg'
              alt={productDetail?.name}
              className='rounded-2xl w-full h-full hover:rotate-2 hover:scale-110 transition-transform duration-700'
            />
          </div>
          <div className='flex flex-col justify-between gap-3 h-[450px]'>
            <div>
              <h1 className='mb-2 font-bold text-5xl'>{productDetail?.name}</h1>
              <p className='text-amber-500 text-xl'>
                Rs {productDetail?.price}
              </p>
            </div>
            <div>
              <p className='mb-1 font-semibold text-xl'>🍲 About This Dish</p>
              <p className='w-92 font-extralight text-black/40 text-sm'>
                {productDetail?.description} This is one of the delicious food
                you'll ever have. . Nothing beats the taste of this food. It is
                made with specialist so don't fear , your money won't go to
                waste.
              </p>
            </div>
            <div className='flex flex-col justify-center gap-2'>
              <p className='mb-1 font-semibold text-xl'>What's Included</p>
              <ul className='grid grid-cols-2 text-sm list-disc list-inside'>
                <li>Fresh Ingredients</li>
                <li>Chief Special</li>
                <li>Made to Order</li>
                <li>Premium Quality</li>
              </ul>
            </div>
            <button
              className='bg-amber-500 p-2 rounded-2xl hover:text-white transition-all duration-300 cursor-pointer'
              onClick={() => addToCart(productDetail)}>
              Add To Cart
            </button>
          </div>
          <div className='top-4 left-4 absolute bg-white px-2 py-1 rounded-md font-medium text-[13px]'>
            Mains
          </div>
        </div>
        <div className='self-start'>
          <p className='mb-3 text-xl'>You may also like </p>
          <ul className='flex justify-center items-center gap-4 list-none'>
            {recommendedProduct.map((product) => (
              <li key={product.id} className='shadow-2xl rounded-sm h-53'>
                <img
                  src='/burger.jpg'
                  alt={product.name}
                  className='rounded-t-md w-50 h-40'
                />
                <div className='px-2 py-1'>
                  <p className='font-md text-sm'>{product.name}</p>
                  <p className='font-md text-[13px] text-amber-600'>
                    Rs. {product.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
