import { FiMinus } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';

export default function FoodCard({ details, handleCartItem }) {
  const { name, image, price, description, category, veg } = details;
  const food = details;
  return (
    <div className='shadow-xl border border-amber-600/20 rounded-2xl w-[400px] h-[475px] text-black hover:scale-105 transition-all duration-300'>
      <img
        src='/burger.jpg'
        alt='burger'
        className='rounded-t-2xl w-full h-[270px]'
      />

      <div className='p-4'>
        <p className='mb-2 font-semibold text-xl'>Classic Burger</p>

        <div className='flex flex-wrap gap-2 text-white text-sm'>
          <p className='bg-gray-400/50 px-1 py-0.5 border border-gray-300 rounded-xl w-fit'>
            Category
          </p>

          {veg ? (
            <p className='bg-gray-400/50 px-2 py-0.5 border border-gray-300 rounded-xl w-fit'>
              Veg
            </p>
          ) : (
            <p className='bg-gray-400/50 px-2 py-0.5 border border-gray-300 rounded-xl w-fit'>
              Non-Veg
            </p>
          )}

          <p className='text-gray-600'>
            Juicy beef patty with fresh lettuce, tomatoes, cheese, and special
            sauce
          </p>

          <div className='flex gap-2 w-full text-black'>
            <div className='flex justify-center items-center gap-4 bg-amber-500/10 p-1 rounded-xl w-fit'>
              <button className='hover:bg-amber-500 px-1 py-1 hover:rounded-md cursor-pointer'>
                <FiMinus className='text-sm' />
              </button>
              <p className='text-sm'>1</p>
              <button className='hover:bg-amber-500 px-1 py-1 hover:rounded-md cursor-pointer'>
                <FiPlus className='text-sm' />
              </button>
            </div>
            <button
              className='flex-1 bg-amber-500 rounded-xl text-center'
              onClick={() => handleCartItem(food)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
