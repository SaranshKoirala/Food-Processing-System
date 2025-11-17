import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { FiCornerDownRight } from 'react-icons/fi';

export default function Hero() {
  const [offersProduct, setOffersProduct] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(0);
  console.log(offersProduct);

  function handleDecreament() {
    setCurrentOrder((order) =>
      order === 0 ? offersProduct.length - 1 : order - 1
    );
  }

  function handleIncreament() {
    setCurrentOrder((order) =>
      order === offersProduct.length - 1 ? 0 : order + 1
    );
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/products');
        const data = res.data;
        const onlyOffers = data.filter(
          (item) => item.offers && item.offers.length > 0
        );
        setOffersProduct(onlyOffers);
      } catch (e) {
        console.log("Couldn't fetch the offers product");
      }
    }
    fetchProduct();
  }, []);
  return (
    <div className='relative w-screen h-screen overflow-hidden text-white'>
      <img
        src='/hero-dish.jpg'
        className='brightness-50 w-full h-full object-center object-cover'
        alt='background'
      />
      {/* kind of navbar */}
      <div className='top-4 right-8 absolute flex gap-4'>
        <Link to={'/kitchen'}>
          <div className='font-semibold cursor-pointer'>Kitchen</div>
        </Link>
        <Link to={'/admin/dashboard'}>
          <div className='font-semibold cursor-pointer'>Admin</div>
        </Link>
      </div>

      {/* buttons to change the products */}
      <div
        className='top-1/2 left-4 absolute text-white text-4xl'
        onClick={handleDecreament}>
        <FaChevronLeft />
      </div>
      <div>
        <FaChevronRight
          className='top-1/2 right-4 absolute text-white text-4xl'
          onClick={handleIncreament}
        />
      </div>

      <div className='top-40 left-40 absolute flex flex-col items-start gap-4 text-2xl'>
        <h2 className='font-extrabold text-9xl'>
          {offersProduct[currentOrder]?.name}
        </h2>
        <p className='w-[650px] font-extralight'>
          {offersProduct[currentOrder]?.description} A delicious blend of rich
          flavors, freshly prepared to satisfy your cravings. Perfectly cooked
          with premium ingredients for an unforgettable taste.
        </p>
        {offersProduct[currentOrder]?.offers[0].offer_kind === 'percentage' ? (
          <>
            <p className='font-semibold text-amber-500 text-2xl'>
              Save{' '}
              {Number(offersProduct[currentOrder]?.offers[0].value)?.toFixed(0)}
              % on this delicious {offersProduct[currentOrder]?.name}
            </p>
            <div className='flex justify-center items-end gap-8'>
              <p className='font-bold text-5xl'>
                Rs{' '}
                {(
                  Number(offersProduct[currentOrder]?.price) -
                  (Number(offersProduct[currentOrder]?.price) *
                    Number(offersProduct[currentOrder]?.offers[0]?.value)) /
                    100
                ).toFixed(2)}
              </p>
              <p className='text-white/60 text-3xl line-through'>
                Rs {Number(offersProduct[currentOrder]?.price).toFixed(2)}
              </p>
            </div>
          </>
        ) : (
          <>
            <p className='font-semibold text-amber-500 text-2xl'>
              Order {offersProduct[currentOrder]?.offers[0].buy_quantity}{' '}
              {offersProduct[currentOrder]?.offers[0].buy_quantity} and get
              another absolutely free!
            </p>
            <p className='font-bold text-5xl'>
              Rs {Number(offersProduct[currentOrder]?.price)}
            </p>
          </>
        )}
        {}
        <div className='flex justify-center items-center'>
          <Link to={`/menu/${offersProduct[currentOrder]?.id}`}>
            <button className='flex justify-center items-center gap-2 bg-amber-500 mr-4 px-4 py-2 rounded-2xl text-white text-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
              <span>Order Now </span>
              <FiCornerDownRight />
            </button>
          </Link>
          <Link to={'/menu'}>
            <button className='bg-amber-500 px-4 py-2 rounded-2xl text-white text-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
              Explore Menu{' '}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
