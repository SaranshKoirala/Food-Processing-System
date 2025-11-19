import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { FiCornerDownRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

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
    const intervalId = setInterval(() => {
      setCurrentOrder((order) =>
        order === offersProduct.length - 1 ? 0 : order + 1
      );
    }, 4000);

    // Cleanup function - clears interval when component unmounts
    return () => clearInterval(intervalId);
  }, [offersProduct.length]);

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
    <div className='relative bg-black w-screen h-screen overflow-hidden text-white'>
      {/* Background image with animation */}
      <AnimatePresence mode='wait'>
        <motion.img
          key={currentOrder}
          src='/hero-dish.jpg'
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='absolute brightness-50 w-full h-full object-center object-cover'
          alt='background'
        />
      </AnimatePresence>

      {/* Static content overlay */}
      <div className='z-10 relative w-full h-full'>
        {/* kind of navbar */}
        <div className='top-4 right-8 absolute flex gap-4'>
          {/* <Link to={'/kitchen'}>
          <div className='font-semibold cursor-pointer'>Kitchen</div>
          </Link> */}
          <Link to={'/admin/dashboard'}>
            <div className='font-semibold cursor-pointer'>Admin</div>
          </Link>
        </div>

        {/* buttons to change the products */}
        <div
          className='top-1/2 left-4 absolute text-white text-4xl cursor-pointer'
          onClick={handleDecreament}>
          <FaChevronLeft />
        </div>
        <div>
          <FaChevronRight
            className='top-1/2 right-4 absolute text-white text-4xl cursor-pointer'
            onClick={handleIncreament}
          />
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentOrder}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='top-40 left-40 absolute flex flex-col items-start gap-4 text-2xl'>
            <h2 className='overflow-x-visible font-extrabold text-8xl'>
              {offersProduct[currentOrder]?.name}
            </h2>
            <p className='w-[650px] font-extralight text-lg'>
              {offersProduct[currentOrder]?.description} A delicious blend of
              rich flavors, freshly prepared to satisfy your cravings. Perfectly
              cooked with premium ingredients for an unforgettable taste.
            </p>
            {offersProduct[currentOrder]?.offers[0].offer_kind ===
            'percentage' ? (
              <>
                <p className='font-semibold text-amber-500 text-3xl'>
                  Save{' '}
                  {Number(
                    offersProduct[currentOrder]?.offers[0].value
                  )?.toFixed(0)}
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
                <p className='font-semibold text-amber-500 text-3xl'>
                  Order {offersProduct[currentOrder]?.offers[0].buy_quantity}{' '}
                  and get {offersProduct[currentOrder]?.offers[0].get_quantity}{' '}
                  absolutely free!
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
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className='bottom-8 left-1/2 absolute flex gap-3 -translate-x-1/2'>
          {offersProduct.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentOrder(index)}
              className='group relative cursor-pointer'
              aria-label={`Go to slide ${index + 1}`}>
              {/* Background glow effect */}
              {currentOrder === index && (
                <motion.div
                  layoutId='activeGlow'
                  className='absolute inset-0 bg-amber-500/30 blur-md rounded-full'
                  transition={{ duration: 0.3 }}
                />
              )}
              {/* Dot */}
              <motion.div
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  currentOrder === index
                    ? 'bg-amber-500 scale-100'
                    : 'bg-white/40 group-hover:bg-white/60 scale-75'
                }`}
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
              />
              {/* Active indicator bar */}
              {/* {currentOrder === index && (
                <motion.div
                  layoutId='activeBar'
                  className='-bottom-2 left-1/2 absolute bg-amber-500 rounded-full w-8 h-0.5 -translate-x-1/2'
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                />
              )} */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
