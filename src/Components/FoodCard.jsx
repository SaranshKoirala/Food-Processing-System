import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import { MdOutlineLocalOffer } from 'react-icons/md';

export default function FoodCard({ details }) {
  const { id, name, price, description, category, food_type, stock, offers } =
    details;
  // const [offer, setOffer] = useState(false);
  const food = details;
  const discountedPrice = price - (price * offers[0]?.value) / 100;

  const { addToCart } = useCart();
  return (
    <div className='group relative shadow-xl border border-amber-600/20 rounded-2xl w-[400px] h-[500px] overflow-hidden text-black'>
      <Link to={`/menu/${id}`}>
        <img
          src='/burger.jpg'
          alt='burger'
          className='rounded-t-2xl w-full h-[270px] overflow-hidden group-hover:scale-105 transition-all duration-300'
        />
      </Link>

      <div className='flex flex-col gap-3 p-4 hover:text-amber-500'>
        <p className='font-semibold text-xl'>{name}</p>

        <div className='flex justify-start items-center gap-2 text-white text-sm'>
          <p className='bg-gray-400/50 px-1 py-0.5 border border-gray-300 rounded-xl w-fit'>
            {category.name}
          </p>

          {food_type === 'veg' ? (
            <p className='bg-green-100 px-2 border border-green-400 rounded-xl w-fit font-medium text-green-700'>
              Veg
            </p>
          ) : food_type === 'non-veg' ? (
            <p className='bg-red-100 px-2 border border-red-400 rounded-xl w-fit font-medium text-red-700'>
              Non-Veg
            </p>
          ) : (
            <p className='bg-blue-100 px-2 border border-blue-400 rounded-xl w-fit font-medium text-blue-700'>
              Drinks
            </p>
          )}
        </div>
        <p className='w-full h-10 text-gray-600 text-sm'>{description}</p>

        <div
          className={`flex items-center justify-end gap-2 w-full text-black`}>
          {offers?.length > 0 && offers[0]?.offer_kind === 'percentage' ? (
            <div className='flex flex-col items-center pb-6 w-[40%]'>
              <p className='text-gray-500 text-sm line-through'>Rs {price}</p>
              <p className='font-semibold text-amber-600 text-xl'>
                Rs{' '}
                {(price - (price * Number(offers[0]?.value)) / 100).toFixed(2)}
              </p>
            </div>
          ) : (
            <div className='p-1 rounded-2xl w-[40%] font-semibold text-amber-600 text-xl text-center cursor-pointer'>
              Rs {price}
            </div>
          )}

          <button
            className='bg-amber-500 hover:bg-black/50 rounded-xl w-[60%] text-white text-center transition-all duration-300 cursor-pointer'
            onClick={() => addToCart(food)}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Place for offers in percentage mostly */}
      <div className='top-2 z-200 absolute mx-auto px-2 w-[90%] h-auto'>
        {offers.length >= 1 && (
          <div className='flex justify-between items-center'>
            {offers[0].offer_kind === 'percentage' ? (
              <div className='flex justify-center items-center gap-1 bg-red-500 px-2 py-1 rounded-xl font-medium text-[13px] text-white animate-pulse'>
                <MdOutlineLocalOffer />
                <p>{Number(offers?.[0]?.value).toFixed(0)}% </p>
                <p>OFF</p>
              </div>
            ) : (
              <div>
                <div className='flex justify-center items-center gap-1 bg-red-500 px-2 py-1 rounded-xl font-medium text-[13px] text-white animate-pulse'>
                  <MdOutlineLocalOffer />
                  <p>
                    Buy {offers[0].buy_quantity} Get {offers[0].get_quantity}{' '}
                    Free{' '}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
