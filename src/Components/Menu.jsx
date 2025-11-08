import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { CiShoppingCart } from 'react-icons/ci';
import FoodCard from './FoodCard';

export default function Menu() {
  const [activeId, setActiveId] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleMenuCategory(id) {
    setActiveId(id);
  }

  function toggleCart() {
    setIsCartOpen((isOpen) => !isOpen);
  }

  const menuCategory = [
    {
      id: 0,
      link: 'All',
    },
    {
      id: 1,
      link: 'Appetizers',
    },
    {
      id: 2,
      link: 'Mains',
    },
    {
      id: 3,
      link: 'Desserts',
    },
    {
      id: 4,
      link: 'Drinks',
    },
  ];

  const foodDetails = [
    {
      id: 1,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 2,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 3,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 15,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 4,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 5,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 6,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 7,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 8,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 9,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 10,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 11,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 12,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 13,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
    {
      id: 14,
      name: 'Pizza',
      image: '',
      price: 300,
      category: 'pizza',
      description:
        'This is the italian pizza replicated with our own magic and perfection.',
      veg: false,
    },
  ];
  return (
    <div>
      <nav className='flex justify-between items-center bg-card/80 shadow-[0_4px_6px_-2px_rgba(0,0,0,0.25)] mb-15 px-7 py-5'>
        <h1 className='font-semibold text-amber-600 text-3xl'>
          Delicious Menu
        </h1>

        {/* Cart */}
        <div
          className='group relative flex justify-center items-center hover:bg-amber-600 border-2 border-amber-600 rounded-full w-10 h-10 cursor-pointer'
          onClick={toggleCart}>
          <CiShoppingCart className='font-semibold group-hover:text-white text-2xl' />
          <p className='-top-3 -right-1 absolute flex justify-center items-center bg-amber-500 rounded-full w-5 h-5 text-white text-sm'>
            1
          </p>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl transition-transform duration-300 z-50
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='relative flex justify-between items-center p-4'>
            <h2 className='font-semibold text-xl'>Your Order</h2>
            <button
              onClick={toggleCart}
              className='-top-1 right-4 absolute p-1 text-2xl'>
              ×
            </button>
          </div>

          {/* Cart Items Here */}
          <div className='flex flex-col justify-center items-center p-4 h-[80%] text-gray-400'>
            {isCartOpen ? (
              <>
                <CiShoppingCart className='font-extrabold text-6xl' />
                <p className='text-sm'>Your cart is empty</p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {isCartOpen && (
          <div
            onClick={toggleCart}
            className='z-40 fixed inset-0 backdrop-blur-sm brightness-50'></div>
        )}
      </nav>
      <div className='relative flex flex-col justify-center items-center gap-18'>
        <IoIosSearch className='top-4 left-95 absolute text-2xl' />
        <input
          type='search'
          className='px-13 py-2 border border-amber-500/40 rounded-xl focus:outline-amber-500 w-[700px] h-14 text-sm'
          placeholder='Search for dishes...'
        />
        <ul className='flex justify-center items-center gap-6'>
          {menuCategory.map((item) => (
            <li
              key={item.id}
              className={
                activeId === item.id
                  ? `group bg-amber-500 px-4 py-2 border border-amber-500/20 rounded-xl font-semibold text-white text-sm cursor-pointer`
                  : ' group hover:scale-105 transition-all duration-300 px-4 py-2 border border-amber-500/20 rounded-xl font-semibold  text-sm cursor-pointer'
              }
              onClick={() => handleMenuCategory(item.id)}>
              {item.link}
            </li>
          ))}
        </ul>
        <div className='gap-6 grid grid-cols-3 grid-flow-row'>
          {foodDetails.map((item) => (
            <FoodCard details={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
