import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FoodCard({ details, handleCartItem }) {
  const { id, name, price, description, category, veg } = details;
  const [offer, setOffer] = useState(false);
  const food = details;
  return (
    <div className='group relative shadow-xl border border-amber-600/20 rounded-2xl w-[400px] h-[475px] overflow-hidden text-black'>
      <Link to={`/menu/${id}`}>
        <img
          src='/burger.jpg'
          alt='burger'
          className='rounded-t-2xl w-full h-[270px] overflow-hidden group-hover:scale-105 transition-all duration-300'
        />
      </Link>

      <div className='flex flex-col gap-2 p-4 hover:text-amber-500'>
        <p className='font-semibold text-xl'>{name}</p>

        <div className='flex justify-start items-center gap-2 text-white text-sm'>
          <p className='bg-gray-400/50 px-1 py-0.5 border border-gray-300 rounded-xl w-fit'>
            {category.name}
          </p>

          {veg ? (
            <p className='bg-gray-400/50border border-gray-300 rounded-xl w-fit'>
              Veg
            </p>
          ) : (
            <p className='bg-gray-400/50 px-2 border border-gray-300 rounded-xl w-fit'>
              Non-Veg
            </p>
          )}
        </div>
        <p className='w-full h-10 text-gray-600 text-sm'>{description}</p>

        <div className='flex justify-evenly gap-2 w-full text-black'>
          <div className='hover:bg-amber-500/20 hover:shadow-2xl p-0.5 hover:p-0.5 rounded-2xl hover:rounded-2xl w-[40%] font-semibold text-amber-600 hover:text-amber-700 text-xl text-center transition-all duration-300 cursor-pointer'>
            Rs {price}
          </div>
          <button
            className='bg-amber-500 hover:bg-black/50 rounded-xl w-[60%] text-white hover:text-white text-center transition-all duration-300 cursor-pointer'
            onClick={() => handleCartItem(food)}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Place for offers in percentage mostly */}
      {offer && (
        <div className='top-2 right-4 z-100 absolute bg-amber-500 rounded-full w-7 h-7'></div>
      )}
    </div>
  );
}
